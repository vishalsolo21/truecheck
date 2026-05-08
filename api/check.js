export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {

        const { mobile } = req.body;

        const response = await fetch(
            "https://www.swiggy.com/mapi/auth/signin-check",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "user-agent": "Mozilla/5.0"
                },
                body: JSON.stringify({
                    mobile,
                    countryCode: "+91"
                })
            }
        );

        const data = await response.json();

        return res.status(200).json(data);

    } catch (err) {

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }
}    const response = await fetch(
      "https://storelex.store/?api=1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-App-Signature": signature
        },
        body: JSON.stringify(payload)
      }
    );

    const text = await response.text();

    let parsed = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        raw: text
      };
    }

    const result = parsed?.results?.[phone];

    if (!result) {
      return res.json({
        registered: null,
        debugMessage: "No result returned from API",
        rawResponse: parsed
      });
    }

    return res.json({
      registered: result.registered,
      debugMessage: `Service: ${result.service || "Unknown"}`,
      rawResponse: parsed
    });

  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      debugMessage: error.message
    });
  }
}
