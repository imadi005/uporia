import mongoose from 'mongoose';
import dotenv from 'dotenv';

// 👇 Load .env.local explicitly
dotenv.config({ path: '.env.local' });

export default async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('❌ MONGODB_URI is not defined in .env.local');

  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
  }
}
