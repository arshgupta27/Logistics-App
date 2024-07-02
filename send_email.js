import nodemailer from 'nodemailer';

export const sendMail = (to, packageID, packgCost) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'arshdhriti27@gmail.com',
      pass: process.env.EMAIL_PASS
    }
  });
  
  var mailOptions = {
    from: "arshdhriti27@gmail.com",
    to: to,
    subject: 'TRACKING ID',
    text: `Your Tracking ID is ${packageID}.`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
