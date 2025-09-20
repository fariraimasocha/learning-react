import { verifyTrasaction } from '@/utils/paystack';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Read the request body as text first
    const body = await request.text();
    console.log('Raw webhook body:', body);

    // Parse the JSON data
    const data = JSON.parse(body);
    console.log('Parsed webhook data:', data);

    // You can also get headers for verification
    const signature = request.headers.get('x-paystack-signature');
    console.log('Paystack signature:', signature);

    // Here you would typically verify the webhook signature
    // and process the webhook data based on the event type
    if (data.event) {
      console.log('Webhook event type:', data.event);

      // Handle different webhook events
      switch (data.event) {
        case 'charge.success':
          console.log('Payment successful:', data.data);
          // Process successful payment
          break;
        case 'charge.failed':
          console.log('Payment failed:', data.data);
          // Handle failed payment
          break;
        // Add other event types as needed
        default:
          console.log('Unhandled webhook event:', data.event);
      }
    }

    return NextResponse.json(
      { message: 'Webhook processed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
