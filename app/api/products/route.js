import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

// GET /api/products?category=pottery&minPrice=0&maxPrice=100
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');

    const query = {};
    if (category && category !== 'all') query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) query.title = { $regex: search, $options: 'i' };

    const products = await Product.find(query).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch products.' }, { status: 500 });
  }
}

// POST /api/products
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
