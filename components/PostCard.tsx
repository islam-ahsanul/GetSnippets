import React from 'react';

interface PostCardProps {
  post: any;
  handleClick: (id: string) => void;
}
const PostCard = ({ post, handleClick }: PostCardProps) => {
  return <div>PostCard</div>;
};

export default PostCard;
