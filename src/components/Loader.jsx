import React from 'react';

const Loader = ({ title, width, height }) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={`${width ? width : 'w-16'} ${height ? height : 'h-16'} border-4 border-dashed rounded-full animate-spin border-blue-500`}
      ></div>
      <p>{title}</p>
    </div>
  );
};

export default Loader;
