'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@/components/Form';

export type UserType = {
  _id: string;
  name: string;
  // include other user-related properties if needed
};

export type CommentType = {
  user: UserType;
  text: string;
  createdAt: string; // or Date, depending on your data format
};

export type PostType = {
  title: string;
  body: string;
  tag: string;
  likes: string[]; // Array of user IDs
  comments: CommentType[];
};

const PostDetail = ({ params }: { params: { id: string } }) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<PostType>({
    title: '',
    body: '',
    tag: '',
    likes: [],
    comments: [],
  });

  useEffect(() => {
    const getPostDetails = async () => {
      console.log(params?.id);
      const res = await fetch(`/api/post/${params?.id}`);

      const data = await res.json();

      setPost({
        title: data.title,
        body: data.body,
        tag: data.tag,
        likes: data.likes || [], // Handle undefined case
        comments: data.comments || [], // Handle undefined case
      });
    };

    if (params?.id) getPostDetails();
  }, [params?.id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement the logic to submit the comment
    // This might include making a POST request to your API
  };

  const handleLike = async () => {
    // Logic to like/unlike the post
    // Make a request to your API to update the likes
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Tag: {post.tag}</p>

      {/* Display likes */}
      <p>Likes: {post.likes.length}</p>

      {/* Display comments */}
      <div>
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
      </div>

      {/* Comment form */}
      {/* Assume you have a state for the new comment text */}
      <form onSubmit={handleCommentSubmit}>
        {/* ... input fields for the new comment ... */}
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default PostDetail;
