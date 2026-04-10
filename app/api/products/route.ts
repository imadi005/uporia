import { NextResponse } from 'next/server';
import connectMongo from '@/lib/connectMongo';
import Product from '@/models/Product';
import { IncomingForm, Files, Fields } from 'formidable';
import path from 'path';
import { Readable } from 'stream';
import type { NextApiRequest } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

// ✅ Convert Fetch API Request into Node.js-style readable stream
async function toNodeRequest(req: Request): Promise<NextApiRequest> {
  const chunks: Uint8Array[] = [];
  const reader = req.body?.getReader();

  if (!reader) throw new Error('Missing request body reader');

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  const buffer = Buffer.concat(chunks);
  const readable = new Readable();
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);

  const nodeReq = Object.assign(readable, {
    headers: Object.fromEntries(req.headers.entries()),
    method: req.method,
    url: '',
  });

  return nodeReq as unknown as NextApiRequest;
}

// ✅ Formidable parser
function formParse(req: NextApiRequest): Promise<{ fields: Fields; files: Files }> {
  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), 'public/uploads'),
    keepExtensions: true,
    multiples: false,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

// ✅ POST: Add new product
export async function POST(req: Request) {
  try {
    await connectMongo();
    const nodeReq = await toNodeRequest(req);
    const { fields, files } = await formParse(nodeReq);

    const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
    const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
    const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
    const priceStr = Array.isArray(fields.price) ? fields.price[0] : fields.price;
    const price = parseFloat(priceStr || '0');

    const image = files.image;
    const imageFile = Array.isArray(image) ? image[0] : image;
    const imageUrl = imageFile?.filepath ? `/uploads/${path.basename(imageFile.filepath)}` : '';

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      imageUrl,
    });

    await newProduct.save();

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('❌ Upload Error:', err);
    return NextResponse.json({ error: 'Failed to upload product' }, { status: 500 });
  }
}

// ✅ GET: Fetch all products
export async function GET() {
  try {
    await connectMongo();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    console.error('❌ Fetch Error:', err);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
