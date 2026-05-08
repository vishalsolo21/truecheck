export default async function handler(req, res){

    try{

        const number = req.body.number;

        const payload = {
            type:"swiggy",
            numbers:[number],
            timestamp:Math.floor(Date.now()/1000)
        };

        const response = await fetch(
            "https://storelex.store/?api=1",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json",
                    "X-App-Signature":"7c48338586535ff421e1d18b0857006e9b5bfa1ef286a7dd79cb969e719c7f98",
                    "User-Agent":"Mozilla/5.0",
                    "Referer":"https://storelex.store/#swiggy"
                },

                body:JSON.stringify(payload)
            }
        );

        const data = await response.json();

        const registered =
            data?.results?.[number]?.registered || false;

        res.status(200).json({
            registered
        });

    }catch(err){

        res.status(500).json({
            error:true,
            message:err.message
        });

    }

}
