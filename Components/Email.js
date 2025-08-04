import React from 'react';
import { Button } from './ui/button';
import { sendEmail } from '@/utils/email';

export default function Email() {
  const handleSendEmail = async () => {
    const result = await sendEmail();
    if (result.success) {
      alert('Email sent successfully!');
    } else {
      alert('Failed to send email: ' + result.error);
    }
  };

  return (
    <div>
      <Button onClick={handleSendEmail}>Send Mail</Button>
    </div>
  );
}
