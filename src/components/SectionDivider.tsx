import React from 'react';

/** A printed track line between bands, with one applied index at the content edge. */
export const SectionDivider: React.FC = () => (
  <div className="pointer-events-none relative mx-auto w-full max-w-[1280px] px-5 sm:px-8" aria-hidden="true">
    <div className="relative h-2">
      <div className="absolute inset-x-0 top-0 h-px bg-line" />
      <div className="absolute inset-x-0 top-px h-1.5 bg-[repeating-linear-gradient(90deg,rgb(242_239_232/0.12)_0_1px,transparent_1px_24px)] [mask-image:linear-gradient(90deg,#000,transparent_70%)]" />
      <span className="index-bar absolute -top-px left-0" />
    </div>
  </div>
);
