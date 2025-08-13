import React, { useEffect, useState } from 'react';
import OrderSummary from '../../components/card/order-summary-card';
import PageLayout from '../../components/layout/page-layout';
import ProductCardCart from '../../components/card/card-product-card';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UseShoppingCart from '../../hooks/use-shopping-cart';

const Cart = () => {
  const {cartTotal, removeProductFromCart} = UseShoppingCart();
  const cartItems = useSelector(state => state.cart.cartProducts);
  console.log(cartItems);
  useEffect(() => {
  console.log("Cart updated:", cartItems);
}, [cartItems]);

    useEffect(() => {
        document.title = 'SnapBasket - Cart'
    }, [])
  
  return (
   <PageLayout>
     <div className="flex flex-col lg:flex-row gap-10 p-6 justify-between pl-30 pr-30 max-lg:flex-col max-lg:pl-3 max-lg:pr-3">
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-6">
  Shopping Cart <span className="text-green-500">{cartItems.length} Items</span>
</h2>

<div className="grid grid-cols-3 font-semibold text-gray-500 mb-4 px-2">
  <span className="text-left">Product Details</span>
  <span className="text-end">Subtotal</span>
  <span className="text-right pr-4">Action</span>
</div>


{cartItems.map(product => (
  <ProductCardCart key={product?.p?._id} p={product?.p} {...product?.p} quantity={product?.quantity} image={product?.p?.images[0]} onRemove={() => removeProductFromCart(product)} />
))}

        <NavLink to='/all-products'><button className="text-green-500 text-sm mt-4">&larr; Continue Shopping</button></NavLink>
      </div>

      <div className='w-80 max-sm:w-full'>
      <OrderSummary products={cartItems} price={+cartTotal()} />
      </div>
    </div>
   </PageLayout>
  );
};

export default Cart;
