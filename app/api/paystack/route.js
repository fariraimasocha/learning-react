import Paystack from '@paystack/paystack-sdk';

const key = process.env.PAYSTACK_SECRET_KEY;

const paystack = new Paystack(key);

export async function POST(request) {
  const { email, amount } = await request.json();

  try {
    const transaction = await paystack.transaction.initialize({
      email,
      amount: amount * 100,
      callback_url: 'http://localhost:3000',
    });

    console.log('Transaction initialized:', transaction);

    return new Response(
      JSON.stringify({ message: 'Transaction initiated', transaction }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Transaction failed', error }),
      { status: 500 }
    );
  }
}
