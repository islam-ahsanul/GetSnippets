import { connectToDB } from '@/utils/database';
import User from '@/models/user';
import type { NextRequest } from 'next/server';

// app/api/users/[id]/likedPosts/route.ts

export const GET = async (
  req: NextRequest,
  route: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const userId = route.params.id;

    const user = await User.findById(userId).populate({
      path: 'likedPosts',
      select: 'title body tag creator createdAt',
      populate: {
        path: 'creator',
        model: 'User',
        select: 'name email image',
      },
    });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify(user.likedPosts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch liked posts', { status: 500 });
  }
};
