import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  imageUrl: String,
  category: String,
  isPopular: Boolean,
  features: [String],
  goodFor: [String]
});

const Template = mongoose.models.Template || mongoose.model('Template', TemplateSchema);
export default Template;
