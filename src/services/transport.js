import nodemailer from  'nodemailer';

export const emailTransporter = () => {
       // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: +process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS,
        }
    });
    
    // we dont need this


    transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP login failed:", err.message);
  } else {
    console.log("✅ SMTP connection verified");
  }
});
    return transporter;
}