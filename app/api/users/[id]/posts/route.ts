import { connectToDB } from '@/utils/database';
import Post from '@/models/post';
// import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextRequest } from 'next/server';
export const GET = async (
  req: NextRequest,
  route: { params: { id: string } }
) => {
  try {
    await connectToDB();

    // const id = req.nextUrl.pathname;

    const id: string = route.params.id;
    console.log('📌🌳', id);

    const posts = await Post.find({ creator: id }).populate('creator');

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch posts', { status: 500 });
  }
};
