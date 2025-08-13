import React from 'react';
import { FaAngleDown, FaTimesCircle } from 'react-icons/fa';
import UseShoppingCart from '../../hooks/use-shopping-cart';

const ProductCardCart = ({ title, discountedPrice, quantity, image, onRemove, onChangeQuantity, p }) => {
  const {changeQuantityInCart} = UseShoppingCart()
  return (
    <div className="grid grid-cols-3 items-center w-full border-b pb-4 mb-4 px-2">
      {/* Product Details */}
      <div className="flex items-center gap-4 w-full">
        <img src={image} alt={title} className="w-20 h-20 object-cover rounded" />
        <div>
          <p className="font-semibold text-gray-500 text-sm">{title}</p>
          <p className="text-sm text-gray-500">Weight: N/A</p>
          <p className="text-sm text-gray-500 flex items-center gap-2">
  Qty:
  <div className="relative">
   <select 
  className="appearance-none border border-gray-300 rounded px-2 py-1 pr-6 text-sm text-gray-600"
  value={quantity} 
  onChange={(e) => changeQuantityInCart(p, Number(e.target.value))}
>
  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
    <option key={num} value={num}>
      {num}
    </option>
  ))}
</select>

    {/* Upside-down > icon */}
    <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs rotate-180">
      <FaAngleDown />
    </span>
  </div>
</p>

        </div>
      </div>

      {/* Subtotal */}
      <div className="text-end font-semibold text-gray-500">
        ${discountedPrice}
      </div>

      {/* Action */}
      <div className="text-right pr-4">
        <button onClick={onRemove} className="text-red-500 hover:text-red-700 text-xl text-center">
          <FaTimesCircle />
        </button>
      </div>
    </div>
  );
};

export default ProductCardCart;
