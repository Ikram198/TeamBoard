import transporter from './mail.js';
import mailGenerator from './mailgen.js';
import { Resend } from 'resend';

const sendmail = async (name, email) => {

    const emailbody = {
        name: name,
        intro: 'Welcome to TEAMBOARD! We are very excited to have you on board.',
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.',
    };
    const html = mailGenerator.generate(emailbody);

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'mr.ikrammaliko1@gmail.com',
      subject: 'Hello World',
      html
    }); 
}

export default sendmail;
