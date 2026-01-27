import mongoose from 'mongoose';
import { refreshModel } from '@/utils/modelutils';

const FinanceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Finance = refreshModel(FinanceSchema, 'Finance');

export default Finance;
