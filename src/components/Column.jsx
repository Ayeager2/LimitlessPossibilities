import React from 'react';

const Column = ({ children, className }) => {
  return (
    <div className={`column ${className}`}>
      {children}
    </div>
  );
};

export default Column;