'use server';

import { Resend } from 'resend';

const emailList = [
  { id: 0, email: 'nichole@gatewaype.com', name: 'Nichole' },
  { id: 1, email: 'tungamirai@gmai.com', name: 'Tungamirai' },
  { id: 2, email: 'angela.machonesa@gmail.com', name: 'Angela' },
  { id: 3, email: 'hanlahav123@gmail.com', name: 'Hannelie' },
  { id: 4, email: 'mkhwanazisbeke@gmail.com', name: 'Sbekezelo' },
  { id: 5, email: 'fhuluste@gmail.com', name: 'Fhulufhelo' },
  { id: 6, email: 'mangemaleka@gmail.com', name: 'Maleka' },
  { id: 7, email: 'christianiecarty@getvanda.com', name: 'Christianie' },
];

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
