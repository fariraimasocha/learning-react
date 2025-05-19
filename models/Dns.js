import { refreshModel } from '@/utils/modelutils';
import { connect } from '@/utils/connect';
import mongoose from 'mongoose';

const dnsSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
    },
    micrositeId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Dns = refreshModel('Dns', dnsSchema);

export default Dns;
