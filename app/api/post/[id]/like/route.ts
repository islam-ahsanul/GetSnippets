// app/api/post/[id]/like/route.ts
import { connectToDB } from '@/utils/database';
import Post from '@/models/post';
import User from '@/models/user';
import type { NextRequest } from 'next/server';

// POST app/api/post/[id]/like/route.ts

export const POST = async (req: any, route: { params: { id: string } }) => {
  try {
    await connectToDB();
    const postId = route.params.id;
    const { userId } = await req.json();

    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post || !user) {
      return new Response('Post or user not found', { status: 404 });
    }

    // Check if the user has already liked the post
    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex > -1) {
      // Unlike the post
      post.likes.splice(likeIndex, 1);
      user.likedPosts.pull(postId); // Remove post from user's likedPosts
    } else {
      // Like the post
      post.likes.push(userId);
      user.likedPosts.push(postId); // Add post to user's likedPosts
    }

    await post.save();
    await user.save();

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error('Failed to update like', error);
    return new Response('Failed to update like', { status: 500 });
  }
};
