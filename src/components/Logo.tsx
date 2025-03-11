import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="relative inline-block animate-pulse-subtle">
      <div className="text-4xl font-bold tracking-tighter text-gradient">
        AETERNUM
        <span className="absolute top-0 left-0 w-full h-full opacity-50 blur-sm text-gradient">
          AETERNUM
        </span>
      </div>
    </div>
  );
};

export default Logo;
