import Link from 'next/link';

import { PostType } from '@/app/create-post/page';

type FormProps = {
  type: string;
  post: PostType;
  setPost: React.Dispatch<React.SetStateAction<PostType>>;
  submitting: boolean;
  // handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
  return (
    <section className="flex-start flex w-full max-w-full flex-col items-start justify-start">
      <h1 className="head_text text-left">
        <span className="text-blue-500">{type} Post</span>
      </h1>
      <p className="desc max-w-md text-left">
        {type} and share your code with the world.
      </p>
      <form
        onSubmit={handleSubmit}
        className="glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7"
      >
        <label>
          <span className="text-base font-semibold text-red-500">
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
            className="form_textarea"
          ></textarea>
        </label>
        <label>
          <span className="text-base font-semibold text-red-500">
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
            className="form_textarea"
          ></textarea>
        </label>

        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700">
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
            placeholder="#Tag"
            required
            className="form_input"
          />
        </label>
        <div className="mx-3 mb-5 flex items-center justify-end gap-4">
          <Link href="/" className="text-sm text-gray-500">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-yellow-500 px-5 py-1.5 text-sm text-white"
          >
            {submitting ? `'${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
