import mongoose from 'mongoose';

const micrositeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timeseries: true,
  }
);

const Microsite = mongoose.model('Microsite', micrositeSchema);
export default Microsite;
