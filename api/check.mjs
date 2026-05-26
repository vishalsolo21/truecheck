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
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "Authorization": "Bearer null",
          "brevi-channel": "MOBILE_WEB",
          "brevi-channel-version": "41.0.0"
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

    const data = await response.json();

    const registered =
      data?.msg === "Wrong Password";

    return res.status(200).json({
      success: true,
      registered: registered,
      response: data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: String(error)
    });
  }
}
