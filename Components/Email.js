import React from 'react';
import { Button } from './ui/button';
import { sendEmail } from '@/utils/email';
import { toast } from 'sonner';

export default function Email() {
  const handleSendEmail = async () => {
    const result = await sendEmail();
    if (result.success) {
      toast.success('Email sent successfully!');
      console.log('Email data:', result.data);
    } else {
      toast.error(`Error sending email: ${result.error}`);
      console.error('Email error:', result.error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Button
        className="bg-gray-900 text-white hover:bg-gray-800 transition-all"
        onClick={handleSendEmail}
      >
        Send Mail
      </Button>
    </div>
  );
}
