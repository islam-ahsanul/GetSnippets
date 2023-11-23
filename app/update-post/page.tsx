'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@/components/Form';

export type PostType = {
  title: string;
  body: string;
  tag: string;
};

const UpdatePost = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<PostType>({
    title: '',
    body: '',
    tag: '',
  });

  useEffect(() => {
    const getPostDetails = async () => {
      console.log(postId);
      const res = await fetch(`/api/post/${postId}`);

      const data = await res.json();

      setPost({
        title: data.title,
        body: data.body,
        tag: data.tag,
      });
    };

    if (postId) getPostDetails();
  }, [postId]);

  const updateThePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) return alert('Post ID not found');

    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: post.title,
          body: post.body,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateThePost}
    />
  );
};

export default UpdatePost;
