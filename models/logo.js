import { refreshModel } from '@/utils/modelutils';
import mongoose from 'mongoose';

const logoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Logo = mongoose.models.Logo || mongoose.model('Logo', logoSchema);
export default Logo;
