const express = require ("express");
const bodyParser = require ("body-parser");
const request = require ("request");
const https = require ("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    
    const url = "https://us18.api.mailchimp.com/3.0/lists/1084b181a";

    const options = {
        method: "POST",
        auth: "Pranjal29:263e9e1f63710d38d2bf32f801ef9d0a-us18",
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        }else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})



app.listen(3000, function(){

    console.log("Server is up and running at port 3000");
});




// 263e9e1f63710d38d2bf32f801ef9d0a-us18 mailchimp api key

// 1084b181ad auidience key list key

