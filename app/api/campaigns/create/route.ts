import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '../connectMongo'
import Campaign from '../Campaign';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subject, fromName, fromEmail, body: content, audience, schedule, status } = body;

    if (!subject || !fromName || !fromEmail || !content || !audience || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    // Only send email immediately if status is "sent"
    if (status === 'sent') {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: 'aditya94727@gmail.com', // Replace with real audience logic
        subject,
        html: `<div style="font-family:sans-serif; font-size:16px;">${content}</div>`,
      });
    }

    const newCampaign = new Campaign({
      title: subject,
      subject,
      body: content,
      fromName,
      fromEmail,
      audience,
      status,
      sentAt: status === 'sent' ? new Date() : undefined,
      schedule: status === 'scheduled' ? new Date(schedule) : undefined,
    });

    await newCampaign.save();

    return NextResponse.json({ success: true, message: 'Campaign saved successfully!' });
  } catch (error: any) {
    console.error('❌ Campaign Create Error:', error.message || error);
    return NextResponse.json({ error: 'Failed to process campaign', details: error.message }, { status: 500 });
  }
}
