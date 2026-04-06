import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'buyer',
    });

    return NextResponse.json(
      { message: 'Account created successfully!', userId: user._id },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
