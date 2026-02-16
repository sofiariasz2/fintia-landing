import { auth } from '@/lib/auth';
import { google } from 'googleapis';
import { parseBancolombiaMessage } from '@/lib/bancolombia-parser';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
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

    // Fetch each message and parse it
    for (const msg of messages) {
      try {
        const fullMessage = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
          format: 'full',
        });

        // Get the message body
        const payload = fullMessage.data.payload;
        let body = '';

        // Try to get the snippet first (usually contains the SMS text)
        body = fullMessage.data.snippet || '';

        // If snippet is empty, try to decode the body
        if (!body && payload.body?.data) {
          body = Buffer.from(payload.body.data, 'base64').toString('utf-8');
        }

        // Check parts if body is still empty
        if (!body && payload.parts) {
          for (const part of payload.parts) {
            if (part.mimeType === 'text/plain' && part.body?.data) {
              body = Buffer.from(part.body.data, 'base64').toString('utf-8');
              break;
            }
          }
        }

        const transaction = parseBancolombiaMessage(body);
        if (transaction) {
          transaction.emailId = msg.id;
          transactions.push(transaction);
        }
      } catch (err) {
        console.error(`Error processing message ${msg.id}:`, err);
      }
    }

    // Sort by date, most recent first
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    return Response.json({
      transactions,
      total: transactions.length,
    });
  } catch (error) {
    console.error('Gmail API error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
