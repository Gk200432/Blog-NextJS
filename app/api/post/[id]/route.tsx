import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../../utils/connectMongo';
import PostModel from '../../../../models/postModel';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const postData = await PostModel.findOne({ _id: params.id });
    return NextResponse.json(postData);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message });
  }
}
