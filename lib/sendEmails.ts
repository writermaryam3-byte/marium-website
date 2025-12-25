"use server"
import { Email } from '@/app/types/interfaces';
import { Resend } from 'resend';

const resend = new Resend("re_2Lh9S1gM_jFtAs8u8Yev6ofLoB1vssqsm");


const send = async (email: Email)=>{
    try {
        const res = await resend.emails.send({
            from: email.from,
            to: email.to,
            replyTo: email.replyTo,
            subject: email.subject,
            html: email.html
          });
        return {success: true, message: "تم ارسال الرسالة بنجاج"}
    } catch (error : any) {
        console.log(error.message)
        return {failed: true, message: `فشل ارسالة الرسالة بسسبب الخطأ ${error?.message}`}
    }
}


const sendEmail = async (email: Email)=>{
    console.log("sen")
    return await send(email)
}

export default sendEmail