import React, { useState } from 'react'
import CartIcon from '../../assets/cart_icon.svg';
import UseShoppingCart from '../../hooks/use-shopping-cart';
import Toster from '../toster/toster';


const CardBtn = (p) => {
  const {addProductIntoCart} = UseShoppingCart();
  const [txt, setTxt] = useState("");
  const [showToast, setShowToast] = useState(false);

  const addToCartToast = () => {
    setShowToast(true);
    setTxt("Added To Cart");
  }

  return (
    <>
    {showToast && <Toster txt={txt} show={showToast} setShow={setShowToast}/>}
    <div className='w-20 h-8 bg-lime-100 rounded-sm border-1 border-green-900 flex justify-center items-center gap-2 text-green-400' onClick={() => {addProductIntoCart(p), addToCartToast()}}>
        <span><img src={CartIcon} alt="" /></span>
        <p>Add</p>
    </div>
    </>
  )
}

export default CardBtn