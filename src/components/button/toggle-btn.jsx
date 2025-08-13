import React from "react";

const ToggleButton = ({ status, onChange}) => {

  return (
    <label className={`inline-flex items-center cursor-pointer `}>
      <input type="checkbox" className="sr-only" checked={status === 'stock'} onChange={onChange} />
      <div
        className={`w-10 h-5 rounded-full p-1 transition-colors duration-300 ${
          status === "stock" ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-3 rounded-full shadow-md transform transition-transform duration-300  ${
            status === "stock" ? "translate-x-4" : ""
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleButton;
