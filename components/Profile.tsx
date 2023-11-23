import { type } from 'os';
import React from 'react';
import PostCard from './PostCard';

type ProfileProps = {
  name: string;
  desc: string;
  data: any;
  handleEdit?: any;
  handleDelete?: any;
};
const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        {' '}
        <span className="text-blue-500">{name} Profile</span>{' '}
      </h1>
      <p className="desc text-left"> {desc}</p>

      <div className="post_layout mt-10">
        {data.map((post: any) => (
          <PostCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
