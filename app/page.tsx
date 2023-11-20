import Feed from '@/components/feed';

const homepage = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center">
      <h1 className="head_text text-center text-foreground">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </h1>
      <p className="desc muted-foreground text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa doloribus
        error quae quod eligendi nemo veritatis nam delectus accusamus labore
        tenetur fugiat, libero cupiditate asperiores explicabo minus odio est
        eos?
      </p>
      <Feed />
    </section>
  );
};

export default homepage;
