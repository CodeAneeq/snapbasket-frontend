import React from 'react'
import cartIcon from '../../assets/nav_cart_icon.svg';
import { NavLink } from 'react-router-dom';
import UseShoppingCart from '../../hooks/use-shopping-cart';

const CartIcon = () => {
  const {cartLength} = UseShoppingCart();
  return (
    <div>
        <span className='flex relative gap-6'>
          <NavLink to='/cart'><img className='w-6' src={cartIcon} alt="" /></NavLink>
          <span className='w-1/2 rounded-full bg-green-300 absolute -right-2 -top-1 h-1/2 text-xs flex justify-center items-center p-2 text-white'>{cartLength()}</span>
          </span>
    </div>
  )
}

export default CartIcon