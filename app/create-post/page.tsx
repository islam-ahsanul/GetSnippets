'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Form from '@/components/Form';

export type PostType = {
  title: string;
  body: string;
  timestamp: string;
};

const CreatePost = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<PostType>({
    title: '',
    body: '',
    timestamp: '',
  });
  const createThePost = (): void => {
    // Add your code here
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
