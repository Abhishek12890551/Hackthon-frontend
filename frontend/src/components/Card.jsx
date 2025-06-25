import React from 'react';

const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <div
      className={`card rounded-xl p-6 ${hover ? 'hover:border-purple-500/30' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
