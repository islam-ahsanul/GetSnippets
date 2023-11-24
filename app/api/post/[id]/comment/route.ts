import { connectToDB } from '@/utils/database';
import Post from '@/models/post';

export const POST = async (req: any, route: { params: { id: string } }) => {
  const { text, userId } = await req.json();

  try {
    await connectToDB();
    const postId = route.params.id;

    // Find the post and add the new comment
    const post = await Post.findById(postId);
    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    const newComment = { user: userId, text };
    post.comments.push(newComment);

    // Save the post with the new comment
    await post.save();

    // Re-fetch the post to populate user data in comments
    const updatedPost = await Post.findById(postId)
      .populate('creator')
      .populate('comments.user', 'name image'); // Populate user data in comments

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.error('Failed to add comment:', error);
    return new Response('Failed to add comment', { status: 500 });
  }
};
