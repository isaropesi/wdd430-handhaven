import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Product from '@/models/Product';

// GET /api/artisans/[id]
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const artisan = await User.findById(id).select('-password');
    if (!artisan || artisan.role !== 'seller') {
      return NextResponse.json({ error: 'Artisan not found.' }, { status: 404 });
    }
    const products = await Product.find({ sellerId: id });
    return NextResponse.json({ artisan, products });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch artisan.' }, { status: 500 });
  }
}
