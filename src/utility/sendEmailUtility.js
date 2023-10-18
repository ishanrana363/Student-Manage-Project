const nodemailer = require("nodemailer");
const smtpTransporter = require("nodemailer-smtp-transport")
require("dotenv").config()
const sentEmailUtility = async (emailTo,emailSub,emailText)=>{
    let transporter = nodemailer.createTransport(
        smtpTransporter({
            service : "Gmail",
            auth : {
                user : "ishanrana094@gmail.com",
                pass : process.env.SMTP_PASS
            }
        })
    );
    let mailOptions = {
        from: "ishanrana094@gmail.com",
        to : emailTo,
        subject : emailSub,
        text : emailText
    }
    return await transporter.sendMail(mailOptions)
}

module.exports = sentEmailUtility















