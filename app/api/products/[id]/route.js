import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Review from '@/models/Review';

// GET /api/products/[id]
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    const reviews = await Review.find({ productId: id }).sort({ createdAt: -1 });
    return NextResponse.json({ product, reviews });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch product.' }, { status: 500 });
  }
}
