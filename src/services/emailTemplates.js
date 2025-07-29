import nodemailer from 'nodemailer';

export const userActivationEmailTemplate = ({email, name, url}) => {
       return {
        from: `'Local library <${process.env.SMTP_EMAIL}>'`, //sender address
        to: `${email}`, //list of receivers
        subject: 'Activate your new account', // subject line
        text: `'Hello ${name} click the link to activate your account!'`, //plain text
        html: `
         <p>Hello ${name} </p>  
         <br />
         <p>Your account has been created. Click the link to activate your account.</p>
         <br />
         <a href="${url}">
         <button>Activate your account</button>
         </a>
        
        ` //html body
    };
}

export const userAccountVerfiedNotificationTemplate = ({email ,name}) => {
           return {
        from: `'Local library <${process.env.SMTP_EMAIL}>'`, //sender address
        to: `${email}`, //list of receivers
        subject: 'Activate your new account', // subject line
        text: `'Hello ${name} Your account is verified and ready to use.'`, //plain text
        html: `
         <p>Hello ${name} </p>  
         <br />
         <p>Your account has been created and verified. You can log in now..</p>
         <br />
   
        
        ` //html body
    };

}

export const passwordResetOTPsendTemplate = ({email, name, otp}) => {
    return {
           from: `'Local library <${process.env.SMTP_EMAIL}>'`, //sender address
        to: `${email}`, //list of receivers
        subject: 'Reset your password', // subject line
        text: `'Hello ${name}, here is your OTP to reset the password. This will expire in 5 min ${otp}.'`, //plain text
        html: `
         <p>Dear ${name} </p>  
         <br />
         <p>Here is your OTP to reset the password. This will expire in 5 min.
         <br />

         <br/>
         OTP is ${otp}.</p>
         <br />

         Thank you
   
        
        ` 
    }
}