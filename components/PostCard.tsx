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
  return (
    <div className="post_card ">
      <div className="flex items-start justify-between gap-5">
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
          <div className="flex flex-col ">
            <h3 className="flex-gray-900 font-semibold">{post.creator.name}</h3>
            <p className="text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.body ? '/icons/tick.svg' : '/icons/copy.svg'}
            width={12}
            height={12}
            alt="copy_icon"
          />
        </div>
      </div>
      <p className="my-4 text-sm text-gray-700">{post.title}</p>
      <p className="my-4 text-sm text-gray-700">{post.body}</p>
      <p
        className="cursor-pointer text-sm text-blue-500"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex items-center justify-center gap-4 border-t border-gray-100 pt-3">
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
    </div>
  );
};

export default PostCard;
