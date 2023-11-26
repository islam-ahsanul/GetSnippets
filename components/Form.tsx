import Link from 'next/link';

import { PostType } from '@/app/create-post/page';

type FormProps = {
  type: string;
  post: PostType;
  setPost: React.Dispatch<React.SetStateAction<PostType>>;
  submitting: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
  return (
    <section className="flex w-full max-w-full flex-col  justify-center  px-20">
      <h1 className="head_text text-left">
        <span className="text-accent-1">{type} Post</span>
      </h1>
      <p className="desc max-w-md text-left">
        {type} and share your code with the world.
      </p>
      <div className="flex w-full max-w-full flex-col  items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex w-full max-w-2xl flex-col justify-center gap-7 rounded-xl bg-secondaryBg px-10 py-10"
        >
          <label>
            <span className="text-base font-semibold text-foreground">
              Your Code Title
            </span>
            <textarea
              value={post.title}
              onChange={(e) =>
                setPost({
                  ...post,
                  title: e.target.value,
                })
              }
              placeholder="Write your code title here..."
              required
              className="mt-2 flex min-h-[100px] w-full rounded-lg bg-background p-3 text-sm text-muted-foreground outline-0"
            ></textarea>
          </label>
          <label>
            <span className="text-base font-semibold text-foreground">
              Your Code
            </span>
            <textarea
              value={post.body}
              onChange={(e) =>
                setPost({
                  ...post,
                  body: e.target.value,
                })
              }
              placeholder="Write your code here..."
              required
              className="mt-2 flex min-h-[200px] w-full rounded-lg bg-background p-3 text-sm text-muted-foreground outline-0"
            ></textarea>
          </label>

          <label>
            <span className="text-base font-semibold text-foreground">
              Field of Post{' '}
              <span className="font-normal">
                (#product, #webdevelopment, #idea, etc.)
              </span>
            </span>
            <input
              value={post.tag}
              onChange={(e) =>
                setPost({
                  ...post,
                  tag: e.target.value,
                })
              }
              type="text"
              placeholder="Write your tags here [ more than 3 tags not recommended ]"
              required
              className="mt-2 flex w-full rounded-lg bg-background p-3 text-sm text-muted-foreground outline-0"
            />
          </label>
          <div className="mx-3 mb-5 flex items-center justify-end gap-4">
            <Link
              href="/"
              className="rounded-full px-5 py-1.5 text-sm text-foreground hover:bg-red-500/30"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-accent-1 px-5 py-1.5 text-sm text-background hover:bg-accent-2"
            >
              {submitting ? `${type}...` : type}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
