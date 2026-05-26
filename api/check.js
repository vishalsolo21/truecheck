export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { mobile } = req.body;

    const response = await fetch(
      "https://www.brevistay.com/cst/app-api/login",
      {
        method: "POST",
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "Authorization": "Bearer null",
          "brevi-channel": "MOBILE_WEB",
          "brevi-channel-version": "41.0.0",
          "User-Agent": "Mozilla/5.0"
        },
        body: JSON.stringify({
          is_otp: 0,
          is_password: 1,
          mobile: mobile,
          password: "isiwisi",
          usr_fcm_token: ""
        })
      }
    );

    const data = await response.json();

    return res.status(200).json({
      success: true,
      registered: data.is_user_registered == "1",
      response: data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
