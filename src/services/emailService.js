import { userActivationEmailTemplate, userAccountVerfiedNotificationTemplate, passwordResetOTPsendTemplate } from "./emailTemplates.js";
import { emailTransporter } from "./transport.js";
import nodemailer from "nodemailer";

export const userActivationEmail = async (obj) => {
    //get the transporter


    //get the template
     
    const transport = emailTransporter();

    const info = await transport.sendMail(userActivationEmailTemplate(obj));
    console.log(info.messageId);
      console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    return info.messageId;
                               
}

export const  userAccountVerfiedNotification = async (obj)=> {
    const transport = emailTransporter();
    const info = await transport.sendMail(userAccountVerfiedNotificationTemplate(obj));
    return info.messageId;
}

export const passwordResetOTPSendEmail = async (obj) => {
  const transport = emailTransporter();
  const info = await transport.sendMail(passwordResetOTPsendTemplate(obj));
  return info.messageId;

}