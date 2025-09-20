'use server';
import { Resend } from 'resend';
import { getEmailHTML } from './getEmailTemplate';
import { getFreeCreditExhaustedHTML } from './getEmailTemplate';
import { getLinkedInLiveHTML } from './getEmailTemplate';
import { allUsers } from './allUsers';

const emails = [
  { id: 1, email: 'gnthigah@gmail.com', name: 'Geraldine' },
  { id: 2, email: 'mactradingking@gmail.com', name: 'Brandon Dotson' },
  { id: 3, email: 'business.devinbrown@gmail.com', name: 'Devin Brown' },
  { id: 4, email: 'panamuche@gmail.com', name: 'Panashe Muchengetwa' },
  { id: 5, email: 'agbosamsonite@gmail.com', name: 'Samson Agbo' },
  { id: 6, email: 'brillnkomo@gmail.com', name: 'Brilliant Nkomo' },
  { id: 7, email: 'pridemudondo1@gmail.com', name: 'Pride Mudondo' },
  { id: 8, email: 'angelynndlovu@gmail.com', name: 'Musawenkosi Ndlovu' },
  { id: 9, email: 'teejaysoarz@gmail.com', name: 'Daniel Bokantero' },
  { id: 10, email: 'walkiet79@gmail.com', name: 'Winnie Cooper' },
  { id: 11, email: 'josephcbertrand@gmail.com', name: 'joseph bertrand' },
  { id: 12, email: 'tungamirai@gmai.com', name: 'Tungamirai Zuva' },
  { id: 13, email: 'angela.machonesa@gmail.com', name: 'Angela Machonesa' },
  { id: 14, email: 'mkhwanazisbeke@gmail.com', name: 'Sbekezelo' },
  { id: 15, email: 'fhuluste@gmail.com', name: 'fhulufhelo Pharamela' },
  { id: 16, email: 'mangemaleka@gmail.com', name: 'll Maleka' },
  {
    id: 17,
    email: 'christianiecarty@getvanda.com',
    name: 'Christianie Victor Carty',
  },
  { id: 18, email: 'fariraimasocha@gmail.com', name: 'Fari' },
  { id: 19, email: 'tnguruve22@gmail.com', name: 'Tino' },
];

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail() {
  try {
    const results = [];

    for (const recipient of allUsers) {
      const emailData = await resend.emails.send({
        from: 'fari@linkgenie.one',
        to: [recipient.email],
        subject: 'Tomorrow: Writing posts that get read on LinkedIn Live event',
        html: getLinkedInLiveHTML(recipient.username),
      });

      results.push({
        email: recipient.email,
        name: recipient.username,
        result: emailData,
      });
    }

    console.log('Emails sent successfully:', results);
    return { success: true, data: results };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}
