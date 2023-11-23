import { connectToDB } from '@/utils/database';
import Post from '@/models/post';
import type { NextRequest } from 'next/server';

// GET

export const GET = async (
  req: NextRequest,
  route: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const id: string = route.params.id;
    // console.log('📌🌳', id);

    const post = await Post.findById(id).populate('creator');

    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch posts', { status: 500 });
  }
};

// PATCH

export const PATCH = async (req: any, route: { params: { id: string } }) => {
  const { title, body, tag } = await req.json();

  try {
    await connectToDB();
    const id: string = route.params.id;

    const existingPost = await Post.findById(id);

    if (!existingPost) {
      return new Response('Post not found', { status: 404 });
    }

    existingPost.title = title;
    existingPost.body = body;
    existingPost.tag = tag;

    await existingPost.save();
    return new Response(JSON.stringify(existingPost), { status: 200 });
  } catch (error) {
    return new Response('Failed to update post', { status: 500 });
  }
};

// DELETE

export const DELETE = async (req: any, route: { params: { id: string } }) => {
  try {
    console.log('💡💡💡');
    await connectToDB();
    const id: string = route.params.id;
    await Post.findByIdAndDelete(id);
    return new Response('Post deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete post', { status: 500 });
  }
};
