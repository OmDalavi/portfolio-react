const express = require('express');
const app=express();
const email="omdalvi2002@gmail.com";
const pass="IITBOMBAY";
const bp=require('body-parser');
const path = require("path");
const port = process.env.PORT || 8080;
app.use(bp.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "client", "public")));
const nodemailer = require('nodemailer');
require("dotenv").config();

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: pass
    }
});

app.post("/contactMe",(req,res)=>{
    var name=req.query.name;
    var email=req.query.email;
    var message=req.query.message;
    let mailDetails = {
        from: 'omdalvi2002@gmail.com',
        to: 'omdalvi184@gmail.com',
        subject: 'Communication From Server',
        html: `<h3 style="color:green">Hello  Mr. Om Dalavi ,</h3><p> Name : ${name}</p><p> Email : ${email}</p><p>Message : ${message}</p>`
    };
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
            res.send("Not Sent");
        } else {
            console.log('Email sent successfully');
            res.send("Success");
        }
    });
    
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port,()=>{
    console.log("Server started on "+port);
})
