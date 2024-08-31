const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(8081, () => {
  console.log("The server started on port 8081 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({   
    service:"gmail", 
    port: 465,
    secure: true, // true for 465, false for other ports
    logger:true,
    debug:true,
    secureConnection: false,
    auth: {
      user: details.email,
      pass: details.password
    },
    tls:{
      rejectUnauthorized :true
    }
  });

  let mailOptions = {
    from: 'This is from Akshaj Cold Press Oil', // sender address
    to: user.email, // list of receivers
    subject: "subject : " + user.subject,// Subject line
    html: `<h4>Hi ${user.name}</h4><br>
    <h4>Email :  ${user.email}</h4><br>

    <h4>${user.body}</h4>
    <h4>Thanks for joining us</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

// main().catch(console.error);
