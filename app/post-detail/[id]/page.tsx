'use client';
import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import Form from '@/components/Form';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  coldarkDark,
  coldarkCold,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  const { theme } = useTheme();
  const tags = post.tag.split(' ');

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
    <div className="max-w-[1400px] px-10">
      <div className="border-b-[1px] border-muted-foreground ">
        <h1 className=" mb-2 text-3xl font-semibold tracking-wide lg:text-4xl">
          {post.title}
        </h1>
      </div>

      <div className="mb-10 mt-2 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-center gap-2">
          {tags.map((tag: string, index: number) => (
            <code
              key={index}
              className="text-md cursor-pointer rounded-full bg-accent-2 px-2 text-background hover:bg-accent-2"
            >
              {tag}
            </code>
          ))}
        </div>
        <div className="mr-4 flex flex-row justify-around gap-8">
          <div className="flex flex-row items-center justify-center gap-2">
            <code className="text-xl font-normal">
              Likes: {post.likes.length}
            </code>
            <button onClick={handleLike} disabled={!session}>
              {session?.user.id && post.likes.includes(session?.user.id) ? (
                <Image
                  src="/icons/like_filled.svg"
                  alt="unlike"
                  height={24}
                  width={24}
                />
              ) : (
                <Image
                  src="/icons/like_outlined.svg"
                  alt="unlike"
                  height={24}
                  width={24}
                />
              )}
            </button>
          </div>
          <div
            // onClick={navigateToPostDetails}
            className="flex cursor-pointer items-center justify-center gap-1 rounded-md px-2 text-accent-2"
          >
            {theme === 'dark' ? (
              <Image
                src="/icons/share_dark.svg"
                alt="share"
                height={20}
                width={20}
              />
            ) : (
              <Image
                src="/icons/share_light.svg"
                alt="share"
                height={20}
                width={20}
              />
            )}

            <code className="text-xl font-normal">Share</code>
          </div>
        </div>
      </div>

      {theme === 'dark' ? (
        <SyntaxHighlighter
          style={coldarkDark}
          showLineNumbers
          wrapLines={true}
          wrapLongLines
          language="javascript"
        >
          {post.body}
        </SyntaxHighlighter>
      ) : (
        <SyntaxHighlighter
          style={coldarkCold}
          showLineNumbers
          wrapLines={true}
          wrapLongLines
          language="javascript"
        >
          {post.body}
        </SyntaxHighlighter>
      )}

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
