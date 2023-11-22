import { connectToDB } from '@/utils/database';
import Post from '@/models/post';

export const GET = async (req: any, res: any) => {
  try {
    await connectToDB();

    const posts = await Post.find({}).populate('creator');

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch posts', { status: 500 });
  }
};
