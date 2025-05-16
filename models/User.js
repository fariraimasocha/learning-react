import mongoose from 'mongoose';
import { refreshModel } from '@/utils/modelutils';

const micrositeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    socialLinks: [
      {
        platform: {
          type: String,
          required: true,
          enum: ['facebook', 'twitter'],
        },
        url: {
          type: String,
          required: true,
        },
        displayName: {
          type: String,
          default: '',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Microsite = refreshModel('Microsite', micrositeSchema);

export default Microsite;
