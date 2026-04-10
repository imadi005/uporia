import { NextResponse } from 'next/server';
import connectDB from '../connectMongo'
import Campaign from '../Campaign';

export async function GET() {
  try {
    await connectDB();
    const campaigns = await Campaign.find({ status: 'sent' }).sort({ sentAt: -1 });
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Failed to fetch sent campaigns:', error);
    return new NextResponse('Failed to fetch sent campaigns', { status: 500 });
  }
}
