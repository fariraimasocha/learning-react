import { NextResponse } from 'next/server';
import Crud from '@/models/Crud';
import { connect } from '@/utils/connect';

export async function GET() {
  await connect();
  try {
    const cruds = await Crud.find({});
    return NextResponse.json(
      { cruds },
      { status: 200 },
      { message: 'Cruds fetched successfully' }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cruds' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connect();

  const { title, description } = await request.json();

  if (!title || !description) {
    return NextResponse.json(
      { error: 'Title and description are required' },
      { status: 400 }
    );
  }

  try {
    const newCrud = await Crud.create({ title, description });
    return NextResponse.json(
      { crud: newCrud },
      { status: 201 },
      { message: 'Crud created successfully' }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create crud' },
      { status: 500 },
      { message: 'An error occurred while creating the crud', error }
    );
  }
}
