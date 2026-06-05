export default async function handler(req, res) {
  try {
    const { number } = req.query;

    const response = await fetch(
      `https://ye-lo-mojkro.noob73613.workers.dev/?api_key=@noob11001&number=${number}`
    );

    const data = await response.json();

    return res.status(200).json(
      data.first_match || {
        error: "No data found"
      }
    );

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
