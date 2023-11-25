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
  _id: string;
  title: string;
  body: string;
  tag: string;
  likes: string[];
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
        likes: data.likes || [],
        comments: data.comments || [],
      });
    };

    if (params?.id) getPostDetails();
  }, [params?.id]);

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      text: newComment,
      userId: session?.user.id,
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
        setNewComment('');
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
        body: JSON.stringify({ userId: session?.user.id }),
      });

      const updatedPost = await response.json();
      if (response.ok) {
        setPost(updatedPost); // This updates the post with the new likes
      } else {
        console.error('Failed to update like status');
      }
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  return (
    <div className="max-w-[1024px] px-10">
      <div className="mb-10 border-b-[1px] border-muted-foreground ">
        <h1 className=" mb-2 text-3xl lg:text-4xl">{post.title}</h1>
      </div>
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
