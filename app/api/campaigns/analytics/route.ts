import { NextResponse } from 'next/server';
import connectDB from '../connectMongo'
import Campaign from '../Campaign';

export async function GET() {
  try {
    await connectDB();

    const total = await Campaign.countDocuments();
    const sent = await Campaign.countDocuments({ status: 'sent' });
    const scheduled = await Campaign.countDocuments({ status: 'scheduled' });
    const draft = await Campaign.countDocuments({ status: 'draft' });

    // Group by date (past 7 days)
    const recent = await Campaign.aggregate([
      {
        $match: {
          status: 'sent',
          sentAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 6)),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$sentAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return NextResponse.json({ total, sent, scheduled, draft, recent });
  } catch (error) {
    console.error('❌ Analytics Error:', error);
    return new NextResponse('Error generating analytics', { status: 500 });
  }
}
