'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

type PostCardProps = {
  post: any;
  handleTagClick?: any;
  handleEdit?: any;
  handleDelete?: any;
};
const PostCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PostCardProps) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState('');
  const handleCopy = () => {
    setCopied(post.body);
    navigator.clipboard.writeText(post.body);

    setTimeout(() => setCopied(''), 3000);
  };

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push('/profile');

    router.push(`/profile/${post.creator._id}?name=${post.creator.name}`);
  };

  const navigateToPostDetails = () => {
    router.push(`/post-detail/${post._id}`); // Navigate to PostDetails page
  };

  // const formatDate = (dateString: string) => {
  //   return new Date(dateString).toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  //   });
  // };

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

  const tags = post.tag.split(' ');
  const { theme } = useTheme();

  return (
    <div className="bg-secondaryBg border-borderColor col-span-6 my-2 flex flex-col justify-between rounded-xl border-[2px] p-4">
      <div>
        <div className="flex w-full items-start justify-between gap-5">
          <div
            className="flex flex-1 cursor-pointer items-center justify-start gap-3"
            onClick={handleProfileClick}
          >
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <div className="flex cursor-pointer items-center justify-center gap-4 ">
              <h3 className="flex tracking-wider text-foreground">
                {post.creator.name}
              </h3>
              <code className="text-sm text-muted-foreground">
                {timeAgo(post.createdAt)}
              </code>
            </div>
          </div>
          {/* <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.body ? '/icons/tick.svg' : '/icons/copy.svg'}
            width={12}
            height={12}
            alt="copy_icon"
          />
        </div> */}
          <div className="flex h-full w-min flex-row items-center justify-center gap-4">
            {tags.map((tag: string, index: number) => (
              <code
                key={index}
                className="bg-accent-1 hover:bg-accent-2 cursor-pointer rounded-full px-2 text-sm text-background"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </code>
            ))}
          </div>
        </div>
        <div className="mx-12 mt-4 pb-10">
          <p className="text-md font-semibold text-foreground md:text-lg lg:text-xl">
            {post.title}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-row items-center justify-end gap-4 ">
        {session?.user.id === post.creator._id && pathName === '/profile' && (
          <div className="flex flex-row gap-4">
            <button
              className="flex gap-1 rounded-md bg-muted px-2 text-green-500"
              onClick={handleEdit}
            >
              <Image
                src="/icons/edit.svg"
                alt="edit"
                height={20}
                width={20}
              />
              <p>Edit</p>
            </button>
            <button
              className="flex gap-1 rounded-md bg-muted px-2 text-red-500"
              onClick={handleDelete}
            >
              <Image
                src="/icons/trash.svg"
                alt="delete"
                height={20}
                width={20}
              />
              <p>Delete</p>
            </button>
          </div>
        )}

        <button
          onClick={navigateToPostDetails}
          className="text-accent-1 flex gap-1 rounded-md bg-muted px-2"
        >
          {theme === 'dark' ? (
            <Image
              src="/icons/open-white.svg"
              alt="delete"
              height={20}
              width={20}
            />
          ) : (
            <Image src="/icons/open.svg" alt="delete" height={20} width={20} />
          )}

          <p>View</p>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
