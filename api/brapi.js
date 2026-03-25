export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { ticker, range = '6mo', interval = '1wk' } = req.query;
  if (!ticker) { res.status(400).json({ error: 'ticker requerido' }); return; }

  const BTOKEN = 'i4juBiXM1YNfbfnYuk1Sns';
  const url = `https://brapi.dev/api/quote/${ticker}?token=${BTOKEN}&fundamental=true&dividends=true&range=${range}&interval=${interval}&history=true`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
