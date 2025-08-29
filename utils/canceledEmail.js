'use server';
import { Resend } from 'resend';
import { getPaymentFollowUpHTML } from './getEmailTemplate';

const emails = [
    {email: 'nichole@gatewaype.com', name: 'Nichole' },
];

const resend = new Resend(process.env.RESEND_API_KEY);

export async function checkEmail() {
  try {

    const results = [];
    
    for (const recipient of emails) {
      const emailData = await resend.emails.send({
        from: 'farirai@linkgenie.one',
        to: [recipient.email],
        subject: 'Feedback for using Linkgenie got 2 mins?',
        html: getPaymentFollowUpHTML(recipient.name),
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