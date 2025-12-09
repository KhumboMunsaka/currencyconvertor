export default async function handler(req, res) {
  const API_KEY = process.env.CURRENCY_API_KEY;
  const { from, to, amount } = req.query;

  const response = await fetch(
    `https://api.currencybeacon.com/v1/convert?from=${from}&to=${to}&amount=${amount}&api_key=${API_KEY}`
  );

  const data = await response.json();
  res.status(200).json(data);
}
