import mongoose from 'mongoose';
import { refreshModel } from '@/utils/modelutils';

const crudSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default refreshModel('Crud', crudSchema);
