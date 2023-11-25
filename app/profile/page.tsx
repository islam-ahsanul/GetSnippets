'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@/components/Profile';
import PostCard from '@/components/PostCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resAll = await fetch(`/api/users/${session?.user.id}/posts`);
        const dataAll = await resAll.json();
        setPosts(dataAll.reverse());
      } catch (err) {
        console.log(err);
      }
    };

    const fetchLikedPosts = async () => {
      try {
        const response = await fetch(
          `/api/users/${session?.user.id}/likedPosts`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch liked posts');
        }
        const data = await response.json();
        setLikedPosts(data);
      } catch (error) {
        console.error('Error fetching liked posts:', error);
      }
    };
    if (session?.user.id) fetchPosts();
    if (session?.user.id) fetchLikedPosts();
  }, []);

  const handleEdit = (post: any) => {
    router.push(`/update-post?id=${post._id}`);
  };

  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm('Are you sure you want to delete this post?');

    if (hasConfirmed) {
      try {
        // console.log(`/api/post/${post._id.toString()}`);
        await fetch(`/api/post/${post._id.toString()}`, { method: 'DELETE' });

        const filteredPosts = posts.filter((p: any) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full px-10">
      <div>
        <h1 className="mt-3 text-left text-2xl font-extrabold leading-[1.15] text-foreground sm:text-5xl">
          {' '}
          <span className="text-accent-1">My Profile</span>{' '}
        </h1>
        <p className="text-md mt-5 max-w-[900px] text-left text-muted-foreground">
          Your Personalized Profile Page
        </p>
      </div>

      <Tabs defaultValue="All Posts" className="mt-32">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="All Posts">Account</TabsTrigger>
          <TabsTrigger value="Liked Posts">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="All Posts">
          <p className="mt-20 text-center text-xl font-bold uppercase tracking-widest text-foreground">
            All Posts
          </p>
          <Profile
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </TabsContent>
        <TabsContent value="Liked Posts">
          <section className="mx-10 mb-20">
            <p className="mt-20 text-center text-xl font-bold uppercase tracking-widest text-foreground">
              Liked Posts
            </p>
            <div className="grid grid-cols-6 gap-8 pt-10 lg:grid-cols-12">
              {likedPosts.length > 0 ? (
                likedPosts.map((post: any) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    handleEdit={() => handleEdit && handleEdit(post)}
                    handleDelete={() => handleDelete && handleDelete(post)}
                  />
                ))
              ) : (
                <div className="flex w-full flex-col items-center justify-center">
                  <p>You have not liked any posts yet.</p>
                </div>
              )}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
