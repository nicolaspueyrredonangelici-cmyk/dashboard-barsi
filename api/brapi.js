export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const ticker   = searchParams.get('ticker');
  const range    = searchParams.get('range')    || '6mo';
  const interval = searchParams.get('interval') || '1wk';

  if (!ticker) {
    return new Response(JSON.stringify({ error: 'ticker requerido' }), { status: 400 });
  }

  const BTOKEN = 'i4juBiXM1YNfbfnYuk1Sns';
  const url = `https://brapi.dev/api/quote/${ticker}?token=${BTOKEN}&fundamental=true&dividends=true&range=${range}&interval=${interval}&history=true`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
