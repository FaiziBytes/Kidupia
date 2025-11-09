import nodemailer from "nodemailer";
import "dotenv/config";
import fs from "fs";
import path from "path";
import handlebars  from "handlebars";
import { fileURLToPath } from "url";
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const emailTempleteSource = fs.readFileSync(
      path.join(__dirName,"templete.hbs"),
      "utf-8"
);
const templete = handlebars.compile(emailTempleteSource);

const verifyEmail = async (token,email,name)=>{
      const htmlToSend = templete({token:encodeURIComponent(token)})
      const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                  user:process.env.EMAIL_USER,
                  pass:process.env.EMAIL_PASS
            }
      })
      const mailConfiguration= {
            from:process.env.EMAIL_USER,
            to:email,
            subject:"Verifying the gmail address",
            html:htmlToSend,
      }
      transporter.sendMail(mailConfiguration,function(error,info){
            if(error){
                  throw new Error(error)
            }
            console.log("Email sent successfully");
            console.log(info);
      })

}
export default verifyEmail;