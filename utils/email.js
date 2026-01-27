'use server';
import { Resend } from 'resend';
import { getEmailHTML } from './getEmailTemplate';
import { getFreeCreditExhaustedHTML } from './getEmailTemplate';
import { getLinkedInLiveHTML } from './getEmailTemplate';
import { failedPayment } from './getEmailTemplate';
import { getServiceOutageHTML } from './getEmailTemplate';
import { getChromeExtensionFeatureHTML } from './getEmailTemplate';
import { getAnalyticsFeatureHTML } from './getEmailTemplate';
import { allUsers } from './allUsers';
import { GET } from '@/app/api/uploadthing/route';

const emails = [
  { id: 1, email: 'learnxul@gmail.com', name: 'Mr P.G Marapira' },
  { id: 2, email: 'ferrerapromos@gmail.com', name: 'Kati DesRochers' },
  {
    id: 3,
    email: 'anormeinkumsah@gmail.com',
    name: 'Anorme Ato Kwamina Inkumsah',
  },
  { id: 4, email: 'mactradingking@gmail.com', name: 'Brandon Dotson' },
  { id: 5, email: 'porthungwe@gmail.com', name: 'Portia Hungwe' },
  { id: 6, email: 'theophilusmunashe694@gmail.com', name: 'Tatenda Chakwesha' },
  {
    id: 7,
    email: 'oyedejifiyinfoluwa@gmail.com',
    name: 'fiyinfoluwa elizabeth',
  },
  { id: 8, email: 'fola3lek@gmail.com', name: 'Fola Aibinuola' },
  { id: 9, email: 'gregkawere@gmail.com', name: 'Greg Kawere' },
  { id: 10, email: 'faramatsi2@gmail.com', name: 'Nyasha Hope Chimowa' },
  { id: 11, email: 'teejaysoarz@gmail.com', name: 'Daniel Bokantero' },
  {
    id: 12,
    email: 'christianiecarty@getvanda.com',
    name: 'Christianie Victor Carty',
  },
  { id: 13, email: 'fariraimasocha@gmail.com', name: 'Fari' },
  { id: 14, email: 'tnguruve22@gmail.com', name: 'Tino' },
];

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail() {
  try {
    const results = [];

    for (const recipient of emails) {
      const emailData = await resend.emails.send({
        from: 'fari@linkgenie.one',
        to: [recipient.email],
        subject: 'New Feature: Linkgenie Analytics',
        html: getAnalyticsFeatureHTML(recipient.name),
      });

      results.push({
        email: recipient.email,
        name: recipient.name,
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
