export default async function handler(req, res) {
  try {

    const number = req.query.number;

    const api =
      `https://ye-lo-mojkro.noob73613.workers.dev/?api_key=@noob11001&number=${number}`;

    const response = await fetch(api);

    const text = await response.text();

    res.setHeader("Content-Type", "application/json");

    return res.status(200).send(text);

  } catch (err) {

    return res.status(500).json({
      error: err.message
    });

  }
}
