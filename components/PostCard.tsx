'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

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

  return (
    <div className="col-span-12 flex h-[250px] flex-col justify-between rounded-xl bg-gray-100 p-4">
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
              <h3 className="flex-gray-900 font-semibold">
                {post.creator.name}
              </h3>
              <code className="text-sm text-gray-500">
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
          <div className="flex h-full w-min flex-row items-center justify-center gap-4 bg-green-300">
            {tags.map((tag: string, index: number) => (
              <code
                key={index}
                className="cursor-pointer rounded-full bg-black px-2 text-sm text-blue-500"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </code>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-foreground md:text-lg lg:text-xl">
            {post.title}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-row items-center justify-center gap-4 ">
        {session?.user.id === post.creator._id && pathName === '/profile' && (
          <div className="flex flex-row">
            <p
              className="cursor-pointer text-sm text-green-500"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="cursor-pointer text-sm text-orange-500"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}

        {/*  */}
        <div className="flex flex-row gap-4">
          <button className=" text-green-500" onClick={handleEdit}>
            Edit
          </button>
          <button className=" text-orange-500" onClick={handleDelete}>
            Delete
          </button>
        </div>
        {/*  */}

        <button onClick={navigateToPostDetails} className=" text-purple-400 ">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PostCard;
