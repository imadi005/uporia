import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    status: { type: String, enum: ['draft', 'scheduled', 'sent'], required: true },
    sentAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema);
