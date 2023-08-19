

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function name(request, response) {
    response.sendFile(__dirname + "/singup.html")
});

app.post("/", function (Request, Response) {
    const firstName = Request.body.fname;
    const lastName = Request.body.lname;
    const email = Request.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/c2315df3c1";

    const options = {
        method: "POST",
        auth: "adnan1:594ab2d181c95080b14fbf0c4421437c-us14"
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            Response.sendFile(__dirname + "/success.html");
        } else{
            Response.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure" , function (req , res) {
    res.redirect("/")
})

app.listen(process.env.PORT||1000, function (request, response) {
    console.log("Server is running on port 1000");

});


// 594ab2d181c95080b14fbf0c4421437c-us14
// c2315df3c1.