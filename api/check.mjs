export default async function handler(req, res) {

  try {

    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method Not Allowed"
      });
    }

    const { mobile } = req.body;

    const response = await fetch(
      "https://www.brevistay.com/cst/app-api/login",
      {
        method: "POST",

        headers: {
          "accept": "application/json, text/plain, */*",
          "content-type": "application/json",
          "authorization": "Bearer null",
          "brevi-channel": "MOBILE_WEB",
          "brevi-channel-version": "41.0.0",

          "origin": "https://www.brevistay.com",
          "referer": "https://www.brevistay.com/",

          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36"
        },

        body: JSON.stringify({
          is_otp: 0,
          is_password: 1,
          mobile: mobile,
          password: "isisyy",
          usr_fcm_token: ""
        })
      }
    );

    const text = await response.text();

    let data;

    try {

      data = JSON.parse(text);

    } catch {

      return res.status(500).json({
        success: false,
        error: "Non-JSON Response",
        raw: text.slice(0, 500)
      });
    }

    const registered =
      data?.msg === "Wrong Password";

    return res.status(200).json({
      success: true,
      registered,
      response: data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: String(error)
    });
  }
}
