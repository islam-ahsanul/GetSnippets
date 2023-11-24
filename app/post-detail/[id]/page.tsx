'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@/components/Form';

export type UserType = {
  _id: string;
  name: string;
  image: string;
};

export type CommentType = {
  user: UserType;
  text: string;
  createdAt: string;
};

export type PostType = {
  _id: string; // Include _id if you need to reference the post's ID
  title: string;
  body: string;
  tag: string;
  likes: string[]; // Array of user IDs
  comments: CommentType[];
};

const PostDetail = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<PostType>({
    _id: '',
    title: '',
    body: '',
    tag: '',
    likes: [],
    comments: [],
  });

  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    const getPostDetails = async () => {
      console.log(params?.id);
      const res = await fetch(`/api/post/${params?.id}`);

      const data = await res.json();

      setPost({
        _id: data._id,
        title: data.title,
        body: data.body,
        tag: data.tag,
        likes: data.likes || [], // Handle undefined case
        comments: data.comments || [], // Handle undefined case
      });
    };

    if (params?.id) getPostDetails();
  }, [params?.id]);

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) return; // Prevent empty comments

    const commentData = {
      text: newComment,
      userId: session?.user.id, // Assuming you have the user's ID in the session
    };
    try {
      setSubmitting(true);
      const response = await fetch(`/api/post/${params?.id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });

      const updatedPost = await response.json();
      if (response.ok) {
        setPost(updatedPost);
        setNewComment(''); // Clear the comment input field
      } else {
        console.error('Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/post/${params?.id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session?.user.id }), // Send user ID
      });

      const updatedPost = await response.json();
      if (response.ok) {
        setPost(updatedPost);
      } else {
        console.error('Failed to update like status');
      }
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Tag: {post.tag}</p>

      {/* Like button */}
      <button onClick={handleLike} disabled={!session}>
        {session?.user.id && post.likes.includes(session?.user.id)
          ? 'Unlike'
          : 'Like'}
      </button>
      <p>Likes: {post.likes.length}</p>

      {/* Comments section */}
      {post.comments.length > 0 ? (
        post.comments.map((comment, index) => (
          <div key={index}>
            <p>
              {comment.user.name}: {comment.text}
            </p>
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}

      {/* Comment submission form */}
      {session ? (
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            disabled={submitting}
          />
          <button type="submit" disabled={submitting}>
            Submit Comment
          </button>
        </form>
      ) : (
        <p>Please log in to comment</p>
      )}
    </div>
  );
};

export default PostDetail;
