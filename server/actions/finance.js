'use server';

import { connect } from '@/utils/connect';
import Finance from '@/models/Finance';

export async function createFinanceEntry({
  title,
  description,
  amount,
  category,
}) {
  await connect();

  try {
    const financialentry = await Finance.create({
      title,
      description,
      amount,
      category,
    });
    return JSON.parse(JSON.stringify(financialentry));
  } catch (error) {
    console.error(error);
    throw error;
  }
}
