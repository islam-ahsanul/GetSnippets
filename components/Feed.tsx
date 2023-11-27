'use client';
import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import FeedSkeleton from './FeedSkeleton';
type PostCardListProps = {
  data: any;
  handleTagClick: any;
};

const PostCardList = ({ data, handleTagClick }: PostCardListProps) => {
  return (
    <div className="grid w-full grid-cols-6 gap-8 pt-20">
      {data.map((post: any) => (
        <PostCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<number | undefined>(
    undefined
  );
  const [searchedResults, setSearchedResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/post');
        const data = await res.json();
        setAllPosts(data.reverse());
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: any) => {
    const regex = new RegExp(searchtext, 'i'); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item: any) =>
        regex.test(item?.creator.email) ||
        regex.test(item?.tag) ||
        regex.test(item?.title)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500) as unknown as number
    );
  };

  const handleTagClick = (tagName: any) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className=" mb-10 mt-16 flex max-w-[1024px] flex-col items-center justify-center">
      <form className="relative flex w-full items-center justify-center lg:max-w-[600px]">
        <input
          type="text"
          placeholder="Search for title, author, or tag"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="peer block w-full rounded-xl border border-muted bg-secondaryBg py-2.5 pl-5 pr-12 text-sm font-medium shadow-lg focus:border-muted-foreground focus:outline-none focus:ring-0"
        />
      </form>

      {isLoading ? (
        <div className="grid w-full grid-cols-6 gap-8 pt-20">
          <FeedSkeleton />
          <FeedSkeleton />
          <FeedSkeleton />
        </div>
      ) : searchText ? (
        <PostCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <PostCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
