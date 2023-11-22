'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

type PostCardProps = {
  post: any;
  handleTagClick: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
};
const PostCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PostCardProps) => {
  const [copied, setCopied] = useState('');
  return (
    <div className="post_card ">
      <div className="flex items-start justify-between gap-5">
        <div className="flex flex-1 cursor-pointer items-center justify-start gap-3">
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
        <div className="copy_btn" onClick={() => {}}>
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
    </div>
  );
};

export default PostCard;
