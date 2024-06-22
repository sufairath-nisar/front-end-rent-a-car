import React from 'react';

const Button = ({ text,  onClick,  className }) => {
  return (
    <button
      className={`px-4 py-2 rounded-none text-white  bg-red-700 hover:bg-opacity-75 ${className}`}
      onClick={onClick}  
    >
      {text}
    </button>
  );
};

export default Button;