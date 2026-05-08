async function checkNumber(){

    const number = document.getElementById("number").value.trim();

    const resultBox = document.getElementById("result");

    if(number.length !== 10){

        resultBox.style.display = "block";
        resultBox.className = "result error";
        resultBox.innerHTML = "⚠ Enter Valid 10 Digit Number";

        return;
    }

    resultBox.style.display = "block";
    resultBox.className = "result loading";
    resultBox.innerHTML = "⏳ Checking Number...";

    try{

        const response = await fetch(
            `https://acczone.xyz/checker/swiggy.php?number=${number}`
        );

        const data = await response.text();

        console.log(data);

        resultBox.style.display = "block";

        const responseText = data.toLowerCase();

        if(
            responseText.includes("registered") ||
            responseText.includes("exists") ||
            responseText.includes("found") ||
            responseText.includes("yes")
        ){

            resultBox.className = "result success";
            resultBox.innerHTML = "✅ Registered On Swiggy";

        }else{

            resultBox.className = "result error";
            resultBox.innerHTML = "❌ Not Registered";

        }

    }catch(err){

        console.log(err);

        resultBox.className = "result error";
        resultBox.innerHTML = "⚠ Server Error";

    }

}
