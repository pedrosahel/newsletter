const express = require("express");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();
const port = 3000;

const listId = "49294ee8cb";

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

mailchimp.setConfig({
    apiKey: "0a761467c55640ceb5efe01368bc671d-us12",
    server: "us12"
});

app.listen(process.env.PORT || port, () => {
    console.log("Server is running at port 3000");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/signup.html");
});

app.post("/", function (req,res) {
    const firstName = req.body.fName;
    const secondName = req.body.lName;
    const email = req.body.email;

    const subscribingUser = {
        firstName: firstName,
        lastName: secondName,
        email: email
    };

    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastNameb
            }
        });

        res.sendFile(__dirname + "/public/success.html")
        console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
    }

    run().catch(e => res.sendFile(__dirname + "/public/failure.html"));
});


// apikey
// // 0a761467c55640ceb5efe01368bc671d-us12
// listId
// // 49294ee8cb