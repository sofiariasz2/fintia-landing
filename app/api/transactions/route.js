import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const type = searchParams.get('type'); // 'income' or 'expense'

    if (!userId) {
      return Response.json({ error: 'User ID required' }, { status: 400 });
    }

    let query = supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(limit);

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    // Calculate summary
    const summary = {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0,
    };

    data.forEach(tx => {
      if (tx.type === 'income') {
        summary.totalIncome += parseFloat(tx.amount);
      } else {
        summary.totalExpenses += parseFloat(tx.amount);
      }
    });

    summary.balance = summary.totalIncome - summary.totalExpenses;

    return Response.json({
      transactions: data,
      summary,
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
