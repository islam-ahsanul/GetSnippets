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
  const { theme, setTheme } = useTheme();
  const tags = post.tag.split(' ');
  const [isMounted, setIsMounted] = useState(false);

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

  useEffect(() => {
    setIsMounted(true);
    const savedTheme =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    setTheme(savedTheme);
  }, [setTheme]);

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

  function timeAgo(createdAt: string): string {
    const createdAtDate = new Date(createdAt);
    const now = new Date();
    const difference = now.getTime() - createdAtDate.getTime();

    const seconds = difference / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const months = days / 30;
    const years = days / 365;

    if (seconds < 60) {
      return `${Math.floor(seconds)} seconds ago`;
    } else if (minutes < 60) {
      if (minutes < 2) return `${Math.floor(minutes)} minute ago`;
      return `${Math.floor(minutes)} minutes ago`;
    } else if (hours < 24) {
      if (hours < 2) return `${Math.floor(hours)} hour ago`;
      return `${Math.floor(hours)} hours ago`;
    } else if (days < 30) {
      if (days < 2) return `${Math.floor(days)} day ago`;
      return `${Math.floor(days)} days ago`;
    } else if (months < 12) {
      return `${Math.floor(months)} months ago`;
    } else {
      return `${Math.floor(years)} years ago`;
    }
  }

  return (
    <div className="mb-10 w-full max-w-[1400px] px-10">
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
            {isMounted && theme === 'dark' ? (
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

      {isMounted && theme === 'dark' ? (
        <SyntaxHighlighter
          style={coldarkDark}
          showLineNumbers
          wrapLines={true}
          wrapLongLines
          // language="javascript"
        >
          {post.body}
        </SyntaxHighlighter>
      ) : (
        <SyntaxHighlighter
          style={coldarkCold}
          showLineNumbers
          wrapLines={true}
          wrapLongLines
          // language="javascript"
        >
          {post.body}
        </SyntaxHighlighter>
      )}

      <p className="mb-6 mt-10 text-lg font-semibold tracking-widest">
        Comments:
      </p>

      {/* Comments section */}
      {post.comments.length > 0 ? (
        post.comments.map((comment, index) => (
          <div key={index} className="py-2">
            <div
              className="flex flex-1 cursor-pointer items-center justify-start gap-3"
              // onClick={handleProfileClick}
            >
              <Image
                src={comment.user.image}
                alt="user_image"
                width={40}
                height={40}
                className="rounded-full object-contain"
              />
              <div className="flex cursor-pointer items-center justify-center gap-4 ">
                <h3 className="flex text-sm tracking-wider text-foreground">
                  {comment.user.name}
                </h3>
                <code className="text-sm text-muted-foreground">
                  {timeAgo(comment.createdAt)}
                </code>
              </div>
            </div>
            <p className="ml-12 mr-12">{comment.text}</p>
          </div>
        ))
      ) : (
        <code className="ml-12 mr-12">No comments yet</code>
      )}

      {/* Comment submission form */}
      {session ? (
        <form
          onSubmit={handleCommentSubmit}
          className="mt-5 flex flex-col gap-3 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800"
        >
          <textarea
            className="w-full resize-none rounded-xl border border-muted-foreground bg-gray-100 p-2 text-gray-700 focus:border-muted-foreground focus:outline-none focus:ring focus:ring-muted-foreground dark:bg-gray-700 dark:text-gray-300"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            disabled={submitting}
          />
          <button
            type="submit"
            disabled={submitting}
            className="self-end rounded-lg bg-accent-1 px-4 py-2 text-background transition duration-300 ease-in-out hover:bg-accent-2 "
          >
            Submit Comment
          </button>
        </form>
      ) : (
        <p className="my-10 text-center tracking-wide text-muted-foreground">
          Please log in to comment
        </p>
      )}
    </div>
  );
};

export default PostDetail;
