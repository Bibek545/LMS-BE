import { userActivationEmailTemplate } from "./emailTemplates";
import { emailTransporter } from "./transport.js";

export const userActivationEmail = async (obj) => {
    //get the transporter


    //get the template
     
    const transport = emailTransporter();

    const info = await transport.sendMail(userActivationEmailTemplate(obj));
    console.log(info.messageId);
    return info.messageId;
                               
}