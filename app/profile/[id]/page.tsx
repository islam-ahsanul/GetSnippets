'use client';
import { useState, useEffect } from 'react';
import Profile from '@/components/Profile';
import { useSearchParams } from 'next/navigation';

const UserProfile = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get('name') || 'Unknown User';
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/users/${params?.id}/posts`);
        const data = await res.json();
        setUserPosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (params?.id) fetchPosts();
  }, [params?.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page.`}
      data={userPosts}
    />
  );
};

export default UserProfile;
