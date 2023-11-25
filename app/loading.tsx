const LoadingSpinner = () => {
  return (
    <div className="bg-steel-blue-5/80 fixed left-0 top-0 z-50 flex h-screen w-screen items-center  justify-center">
      <p className="text-xl font-semibold uppercase tracking-widest text-muted-foreground">
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner;
