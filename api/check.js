export default async function handler(req, res) {

    try {

        const response = await fetch(
            "https://www.swiggy.com/mapi/auth/signin-check",
            {
                method:"POST",

                headers:{
                    "accept":"*/*",
                    "content-type":"application/json",
                    "origin":"https://www.swiggy.com",
                    "referer":"https://www.swiggy.com/",
                    "user-agent":"Mozilla/5.0"
                },

                body:JSON.stringify(req.body)
            }
        );

        const data = await response.json();

        return res.status(200).json(data);

    } catch(err){

        return res.status(500).json({
            error:true,
            message:err.message
        });

    }

}
