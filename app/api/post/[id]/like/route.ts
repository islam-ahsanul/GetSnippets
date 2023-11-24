// app/api/post/[id]/like/route.ts
import { connectToDB } from '@/utils/database';
import Post from '@/models/post';
import type { NextRequest } from 'next/server';

export const POST = async (req: any, route: { params: { id: string } }) => {
  try {
    await connectToDB();
    const postId = route.params.id;
    const userId = req.userId; // Extract the user's ID from the request

    const post = await Post.findById(postId);

    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      // Unlike the post
      post.likes.pull(userId);
    } else {
      // Like the post
      post.likes.push(userId);
    }

    await post.save();
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response('Failed to update like', { status: 500 });
  }
};
