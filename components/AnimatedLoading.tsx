import React from 'react';

const AnimatedLoading = () => {
  return (
    <div className="bg-steel-blue-5/80 fixed left-0 top-0 z-50 flex h-screen w-screen items-center  justify-center">
      <div className="waviy text-lg  dark:text-muted-foreground">
        <span>L</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>.</span>
      </div>
    </div>
  );
};

export default AnimatedLoading;
