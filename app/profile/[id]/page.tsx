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
        setUserPosts(data.reverse());
      } catch (err) {
        console.log(err);
      }
    };
    if (params?.id) fetchPosts();
  }, [params?.id]);

  return (
    <div className="w-full px-10">
      <Profile
        name={userName}
        desc={`Welcome to ${userName}'s personalized profile page.`}
        data={userPosts}
      />
    </div>
  );
};

export default UserProfile;
