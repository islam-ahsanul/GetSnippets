// app/api/post/[id]/like/route.ts
import { connectToDB } from '@/utils/database';
import Post from '@/models/post';
import type { NextRequest } from 'next/server';

// POST app/api/post/[id]/like/route.ts

export const POST = async (req: any, route: { params: { id: string } }) => {
  try {
    await connectToDB();
    const postId = route.params.id;
    const userId = req.body.userId; // Get the user ID from the request body

    const post = await Post.findById(postId);
    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    // Toggle like status
    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1); // User already liked the post, so unlike it
    } else {
      post.likes.push(userId); // Like the post
    }

    await post.save();
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error('Failed to update like', error);
    return new Response('Failed to update like', { status: 500 });
  }
};
