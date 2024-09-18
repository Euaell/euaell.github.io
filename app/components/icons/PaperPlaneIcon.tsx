// components/icons/PaperPlaneIcon.tsx

import React from 'react';

const PaperPlaneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
  </svg>
);

export default PaperPlaneIcon;
