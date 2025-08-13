import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, changeQuantity, removeAll, removeFromCart } from '../redux/features/cart-slice';

const UseShoppingCart = () => {
  const cartItems = useSelector(state => state.cart.cartProducts);
  const dispatch = useDispatch();

  const addProductIntoCart = (p) => {
     if (!p) return 
     dispatch(addToCart(p));
  }

  const removeProductFromCart = (p) => {
    dispatch(removeFromCart(p));
  }

  const removeAllFromCart = () => {
    dispatch(removeAll());
  }

  const cartTotal = () => {
    return cartItems.reduce((accum, prod) => {
        return accum + prod?.p?.discountedPrice * prod?.quantity;
    }, 0);
  }

  const cartLength = () => {
    return cartItems?.length || 0;
  }

  const changeQuantityInCart = (p, quantity) => {
    dispatch(changeQuantity({p, quantity}))
  }

  return {
    addProductIntoCart,
    removeProductFromCart,
    removeAllFromCart,
    cartTotal,
    cartLength,
    changeQuantityInCart
  }
}

export default UseShoppingCart