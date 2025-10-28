    import nodemailer  from "nodemailer"
    
    import { IEmailArguments } from "../../../common";

    export const sendEmail=async({to,cc,subject,content,attachments=[]}:IEmailArguments)=>{
    const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 465,
    secure: true, // true for 465, false for other ports
    service:"gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
    });
    (async () => {
    const info = await transporter.sendMail({
        from:`No-reply <${process.env.USER_EMAIL}>`,
        to,
        cc,
        subject,
        html: content,
        attachments
        
    });

   
    })();
    }

import { EventEmitter } from "node:events";
export const localEmmiter=new EventEmitter()
localEmmiter.on('sendEmail',(args:IEmailArguments)=>{
console.log("sending Email event is starting");
sendEmail(args)
})