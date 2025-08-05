'use server';
import { Resend } from 'resend';
import { getEmailHTML } from './getEmailTemplate';

// const emailList = [
//   { id: 0, email: 'nichole@gatewaype.com', name: 'Nichole' },
//   { id: 1, email: 'tungamirai@gmai.com', name: 'Tungamirai' },
//   { id: 2, email: 'angela.machonesa@gmail.com', name: 'Angela' },
//   { id: 3, email: 'hanlahav123@gmail.com', name: 'Hannelie' },
//   { id: 4, email: 'mkhwanazisbeke@gmail.com', name: 'Sbekezelo' },
//   { id: 5, email: 'fhuluste@gmail.com', name: 'Fhulufhelo' },
//   { id: 6, email: 'mangemaleka@gmail.com', name: 'Maleka' },
//   { id: 7, email: 'christianiecarty@getvanda.com', name: 'Christianie' },
//   { id: 8, email: 'josephcbertrand@gmail.com', name: 'Joseph' },
// ];

const emails = [
    {email: 'fariraimasocha@gmail.com', name: 'Farirai'},
    {email: 'tinodiwanashenguruve23@gmail.com', name: 'Tino'},
];

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail() {
  try {

    const results = [];
    
    for (const recipient of emails) {
      const emailData = await resend.emails.send({
        from: 'farirai@linkgenie.one',
        to: [recipient.email],
        subject: 'Feedback for using Linkgenie 💚 got 2 mins?',
        html: getEmailHTML(recipient.name),
      });
      
      results.push({
        email: recipient.email,
        name: recipient.name,
        result: emailData
      });
    }
    
    console.log('Emails sent successfully:', results);
    return { success: true, data: results };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}