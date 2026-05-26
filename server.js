const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/check", async (req, res) => {

  try {

    const response = await fetch("https://www.brevistay.com/cst/app-api/login", {
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
        mobile: req.body.mobile,
        password: "isiwisi",
        usr_fcm_token: ""
      })
    });

    const data = await response.json();

    res.json({
      registered: data.is_user_registered == "1",
      response: data
    });

  } catch (e) {

    res.status(500).json({
      error: true,
      message: "Server Error"
    });
  }
});

app.listen(3000, () => {
  console.log("Server Running On http://localhost:3000");
});
