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
    <section className="mx-10">
      <h1 className="mt-3 text-left text-2xl font-extrabold leading-[1.15] text-foreground sm:text-5xl">
        {' '}
        <span className="text-accent-1">{name} Profile</span>{' '}
      </h1>
      <p className="text-md mt-5 max-w-[900px] text-left text-muted-foreground">
        {' '}
        {desc}
      </p>
      <p className="mt-20 text-center text-xl font-bold uppercase tracking-widest text-foreground">
        Your Posts
      </p>
      <div className="grid grid-cols-6 gap-8 pt-10 lg:grid-cols-12">
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
