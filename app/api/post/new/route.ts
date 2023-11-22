import { connectToDB } from '@/utils/database';
import Post from '@/models/post';

export const POST = async (req: any, res: any) => {
  const { userId, title, body } = await req.json();

  try {
    await connectToDB();

    const newPost = new Post({
      creator: userId,
      title: title,
      body: body,
    });

    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to create new post', { status: 500 });
  }
};
