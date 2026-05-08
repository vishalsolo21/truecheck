export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false
        });
    }

    try {

        const { mobile } = req.body;

        const response = await fetch(
            "https://www.swiggy.com/mapi/auth/signin-check",
            {
                method: "POST",

                headers: {
                    "accept": "*/*",
                    "content-type": "application/json",
                    "origin": "https://www.swiggy.com",
                    "referer": "https://www.swiggy.com/",
                    "user-agent":
                        "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/124.0.0.0 Mobile Safari/537.36"
                },

                body: JSON.stringify({
                    mobile: mobile,
                    countryCode: "+91"
                })
            }
        );

        const text = await response.text();

        console.log(text);

        let data;

        try {
            data = JSON.parse(text);
        } catch {
            return res.status(500).json({
                success: false,
                message: "Invalid Response",
                raw: text
            });
        }

        return res.status(200).json(data);

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }
}
