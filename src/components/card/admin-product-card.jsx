import React, { useState } from "react";
import ToggleButton from "../button/toggle-btn";
import baseURL from "../../services/baseURL";
import axios from "axios";

const AdminProductCard = ({ product }) => {
    const [status, setStatus] = useState(product.status);


       const changeStock = async (id, newStatus) => {
      const token = localStorage.getItem("token");
      try {
        setStatus(newStatus);
        let res = await axios.patch(`${baseURL}/product/api/change-stock-status/${id}`, {status: newStatus}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <tr className="border-b-1 border-b-gray-300">
      {/* Product Image & Name */}
      <td className="flex items-center gap-3 py-3 px-4">
        <img
          src={product?.images[0]}
          alt={product.name}
          className="w-12 h-12 rounded object-cover"
        />
        <span className="font-medium max-sm:hidden">{product.title}</span>
      </td>

      {/* Category */}
      <td className="px-4 text-gray-600 max-sm:px-1">{product.category}</td>

      {/* Price */}
      <td className="px-4 font-medium max-sm:hidden">${product.discountedPrice}</td>

      {/* In Stock Toggle */}
      <td className="px-4 ">
        <ToggleButton status={status} onChange={() => changeStock(product._id, status === 'stock' ? "out of stock" : "stock")}/>
      </td>
    </tr>
  );
};

export default AdminProductCard;
