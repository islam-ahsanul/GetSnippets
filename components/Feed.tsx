'use client';
import { useState, useEffect } from 'react';
import PostCard from './PostCard';

type PostCardListProps = {
  data: any;
  handleTagClick: (tag: string) => void;
};

const PostCardList = ({ data, handleTagClick }: PostCardListProps) => {
  return (
    <div className="post_layout mt-16">
      {data.map((post: any) => (
        <PostCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative flex w-full items-center justify-center">
        <input
          type="text"
          placeholder="search for codes"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PostCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
