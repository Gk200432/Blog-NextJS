import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../utils/connectMongo';
import PostModel from '../../../models/postModel';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('name');

  try {
    await connectMongo();
    let postData;
    if (query) {
      postData = await PostModel.find({
        $or: [
          { title: new RegExp(query, 'i') },
          { description: new RegExp(query, 'i') },
        ],
      });
    } else {
      postData = await PostModel.find({});
    }
    return NextResponse.json(postData);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message });
  }
}
