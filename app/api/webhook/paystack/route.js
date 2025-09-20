import { verifyTrasaction } from '@/utils/paystack';

export async function POST(request) {
  console.log('Received Paystack webhook request', request);
}
