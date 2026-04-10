import { NextResponse } from 'next/server';
import connectDB from '../connectMongo'
import Campaign from '../Campaign';

export async function GET() {
  try {
    await connectDB();
    const campaigns = await Campaign.find({ status: 'scheduled' }).sort({ sentAt: 1 }); // Upcoming
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('❌ Failed to fetch scheduled campaigns:', error);
    return new NextResponse('Failed to fetch scheduled campaigns', { status: 500 });
  }
}
