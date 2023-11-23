import { type } from 'os';
import React from 'react';

type ProfileProps = {
  name: string;
  desc: string;
  data: any;
  handleEdit: any;
  handleDelete: any;
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
      <h1> {name} Profile</h1>
    </section>
  );
};

export default Profile;
