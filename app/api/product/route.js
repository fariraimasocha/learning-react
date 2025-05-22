import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connect } from '@/utils/connect';
import Product from '@/models/Product';

export async function GET(request) {
  await connect();

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  try {
    const products = await Product.find({ userId });

    return NextResponse.json(
      {
        success: true,
        message: 'Products fetched successfully',
        data: products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connect();

  const { userId, name, description, imageUrl, price } = await request.json();

  try {
    const product = Product.create({
      userId,
      name,
      description,
      imageUrl,
      price,
    });

    return NextResponse.json(
      { success: true, message: 'Product created successfully', data: product },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
