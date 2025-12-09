// /api/getCurrencies.js

export default async function handler(req, res) {
  try {
    const API_KEY = process.env.CURRENCY_API_KEY;

    if (!API_KEY) {
      return res
        .status(500)
        .json({ error: "API key not set in environment variables" });
    }

    const response = await fetch(
      `https://api.currencybeacon.com/v1/latest?api_key=${API_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();

    const currencies = Object.keys(data.rates);

    res.status(200).json(currencies);
  } catch (error) {
    console.error("Error fetching currencies:", error);
    res.status(500).json({ error: "Failed to fetch currencies" });
  }
}
