import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';
import Product from '@/models/Product';

// POST /api/reviews
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const review = await Review.create(body);

    // Recalculate average rating
    const reviews = await Review.find({ productId: body.productId });
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(body.productId, {
      averageRating: Math.round(avg * 10) / 10,
      reviewCount: reviews.length,
    });

    return NextResponse.json(review, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
