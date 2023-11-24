import Feed from '@/components/Feed';

const homepage = () => {
  return (
    <section className="mx-10 flex flex-col items-center justify-center">
      <h1 className="mt-3 text-center text-2xl font-extrabold leading-[1.15] text-foreground sm:text-5xl">
        Share, Innovate, Inspire with GetSnippets
      </h1>
      <p className="mt-5 max-w-[900px] text-center text-lg text-muted-foreground sm:text-xl">
        Join a passionate community of developers driving innovation through
        shared snippets. Explore, collaborate, and grow together in an ecosystem
        fueled by collective knowledge.
      </p>
      <Feed />
    </section>
  );
};

export default homepage;
