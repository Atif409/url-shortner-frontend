import React from 'react';

const Loader = ({ title }) => {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      <p>{title}</p>
    </div>
  );
};

export default Loader;
