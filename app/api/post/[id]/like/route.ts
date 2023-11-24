// app/api/post/[id]/like/route.ts
import { connectToDB } from '@/utils/database';
import Post from '@/models/post';
import type { NextRequest } from 'next/server';

// PATCH app/api/post/[id]/like/route.ts

export const PATCH = async (req: any, route: { params: { id: string } }) => {
  try {
    await connectToDB();
    const id = route.params.id;
    const userId = req.userId; // Extract the user's ID from the request

    const post = await Post.findById(id);

    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1); // Unlike
    } else {
      post.likes.push(userId); // Like
    }

    await post.save();
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to update like', { status: 500 });
  }
};
