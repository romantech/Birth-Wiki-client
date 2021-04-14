import React from 'react';

const Arrow = <T extends { path: string; className: string }>({ path, className }: T) => {
  return (
    <svg
      width='24'
      height='24'
      className={className}
      version='1.1'
      viewBox='0 0 32 32'
      aria-hidden='false'
      fill='gray'
    >
      <path d={path} />
    </svg>
  );
};

export const ArrowLeft = Arrow({
  path: 'M20.6667 24.6666l-2 2L8 16 18.6667 5.3333l2 2L12 16l8.6667 8.6666z',
  className: 'arrow-prev',
});
export const ArrowRight = Arrow({
  path: 'M11.3333 7.3333l2-2L24 16 13.3333 26.6666l-2-2L20 16l-8.6667-8.6667z',
  className: 'arrow-next',
});
