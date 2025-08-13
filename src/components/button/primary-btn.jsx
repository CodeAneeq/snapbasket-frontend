import React from 'react';
import { NavLink } from 'react-router-dom';

const PrimaryBtn = ({ className, txt, link, onClick, disabled, loading, children }) => {
  return (
    <button
      className={`flex justify-center cursor-pointer items-center h-10 rounded-3xl w-28 ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
          Loading...
        </span>
      ) : (
        link ? <NavLink to={link}>{txt || children}</NavLink> : (txt || children)
      )}
    </button>
  );
};

export default PrimaryBtn;
