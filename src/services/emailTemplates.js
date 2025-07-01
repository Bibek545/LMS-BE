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
         <a href = ${url}>
         <button>Activate your account</button>
         </a>
        
        ` //html body
    };
}