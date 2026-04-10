import { NextResponse } from 'next/server';
import connectMongo from '@/lib/connectMongo';
import Template from '@/models/Template';

export async function GET(req: Request) {
  try {
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const popular = searchParams.get('popular');
    const category = searchParams.get('category');

    let query: any = {};
    if (popular) query.isPopular = popular === 'true';
    if (category) query.category = category;

    const templates = await Template.find(query);
    return NextResponse.json({ templates });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}
