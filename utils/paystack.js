import axios from 'axios';

export const verifyTrasaction = async (reference) => {
  try {
    const response = await axios.get(
      'https://api.paystack.co/transaction/verify/' + reference,
      {
        headers: {
          Authorization: `Bearer sk_test_538a19e15718563aeb2b7f04d2ef29adc16eb8f5`,
        },
      }
    );
    console.log('Verification response:', response);
    return { success: 'true', data: response };
  } catch (error) {
    console.error('Error verifying transaction:', error);
    return { success: 'false', error: error.message };
  }
};
