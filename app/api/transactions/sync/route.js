import { auth } from '@/lib/auth';
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';
import { parseBancolombiaMessage } from '@/lib/bancolombia-parser';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      return Response.json({ error: 'Not authenticated with Google' }, { status: 401 });
    }

    // Get user from request body (Supabase user ID)
    const { userId } = await request.json();

    if (!userId) {
      return Response.json({ error: 'User ID required' }, { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      access_token: session.accessToken,
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Search for Bancolombia emails
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'from:bancolombia OR subject:bancolombia',
      maxResults: 100,
    });

    const messages = response.data.messages || [];
    const transactions = [];
    let synced = 0;
    let skipped = 0;

    for (const msg of messages) {
      try {
        const fullMessage = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
          format: 'full',
        });

        let body = fullMessage.data.snippet || '';

        if (!body && fullMessage.data.payload?.body?.data) {
          body = Buffer.from(fullMessage.data.payload.body.data, 'base64').toString('utf-8');
        }

        if (!body && fullMessage.data.payload?.parts) {
          for (const part of fullMessage.data.payload.parts) {
            if (part.mimeType === 'text/plain' && part.body?.data) {
              body = Buffer.from(part.body.data, 'base64').toString('utf-8');
              break;
            }
          }
        }

        const transaction = parseBancolombiaMessage(body);
        if (transaction) {
          // Try to insert, skip if email_id already exists
          const { data, error } = await supabase
            .from('transactions')
            .upsert({
              user_id: userId,
              email_id: msg.id,
              type: transaction.type,
              category: transaction.category,
              amount: transaction.amount,
              description: transaction.description,
              account: transaction.account,
              date: transaction.date,
              raw_message: transaction.raw,
            }, {
              onConflict: 'email_id',
              ignoreDuplicates: true,
            });

          if (error) {
            console.error('Supabase insert error:', error);
            skipped++;
          } else {
            synced++;
            transactions.push(transaction);
          }
        }
      } catch (err) {
        console.error(`Error processing message ${msg.id}:`, err);
        skipped++;
      }
    }

    return Response.json({
      success: true,
      synced,
      skipped,
      total: messages.length,
    });
  } catch (error) {
    console.error('Sync error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
