'use server';

import { Resend } from 'resend';

//   const emails = [
//     'nichole@gatewaype.com',
//     'tungamirai@gmai.com',
//     'angela.machonesa@gmail.com',
//     'hanlahav123@gmail.com',
//     'mkhwanazisbeke@gmail.com',
//     'fhuluste@gmail.com',
//     'mangemaleka@gmail.com',
//     'christianiecarty@getvanda.com',
//   ];

const emails = ['fariraimasocha@gmail.com'];

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail() {
  try {
    const data = await resend.emails.send({
      from: 'farirai@linkgenie.one',
      to: emails,
      subject: 'Test Feedback Email',
      html: '<p>Thank you for your feedback!</p>',
    });

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}
