import mongoose from 'mongoose';

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
  },
  {
    timestamps: true,
  }
);

const Microsite =
  mongoose.models.Microsite || mongoose.model('Microsite', micrositeSchema);
export default Microsite;
