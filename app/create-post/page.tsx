'use client';
import React from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@/components/Form';

export type PostType = {
  title: string;
  body: string;
};

const CreatePost = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<PostType>({
    title: '',
    body: '',
  });
  const createThePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/post/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session?.user.id,
          title: post.title,
          body: post.body,
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
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createThePost}
    />
  );
};

export default CreatePost;
