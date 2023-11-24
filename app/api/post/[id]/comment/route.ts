import { connectToDB } from '@/utils/database';
import Post from '@/models/post';
// import type { NextRequest } from 'next/server';

// app/api/post/[id]/comment/route.ts

export const POST = async (req: any, route: { params: { id: string } }) => {
  const { text } = await req.json();
  const userId = req.userId; // Extract the user's ID from the request

  try {
    await connectToDB();
    const postId = route.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    const newComment = { user: userId, text };
    post.comments.push(newComment);

    await post.save();
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response('Failed to add comment', { status: 500 });
  }
};
