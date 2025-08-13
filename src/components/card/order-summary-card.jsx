import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseURL from "../../services/baseURL";
import { useSelector } from 'react-redux'
import UseShoppingCart from "../../hooks/use-shopping-cart";
import PrimaryBtn from "../button/primary-btn";

const OrderSummary = ({ price, taxRate = 0.02, shippingFee = 0, products }) => {
  const {removeAllFromCart} = UseShoppingCart()
  const isLogin = useSelector(state => state.user.isLogin);
  const tax = +(price * taxRate).toFixed(2);
  const total = +(price + tax + shippingFee).toFixed(2);

  const [showChangeAddress, setShowChangeAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!isLogin) {
      return alert("Please Login First")
    } else {
      setShowChangeAddress(!showChangeAddress)
    }
  }

  const addressAPI = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found in localStorage");
        setLoading(false);
        return;
      }

      const res = await axios.get(`${baseURL}/address/api/get-addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.data?.length > 0) {
        setAddresses(res.data.data);
        // setSelectedAddress(res.data.data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    addressAPI();

     const savedAddress = localStorage.getItem("selectedAddress");
  if (savedAddress) {
    setSelectedAddress(JSON.parse(savedAddress));
  }
  }, []);

  const createOrder = async () => {
    let token = localStorage.getItem('token');
    try {
      // console.log(products);
      
      let payload = {products: products.map((item) => ({
        id: item.p._id,
        price: item.p.discountedPrice,
        quantity: item.quantity,
        title: item.p.title,
        images: item.p.images,
        category: item.p.category
      })), paymentMethod, addressId: selectedAddress._id, totalAmount: total};
      let res = await axios.post(`${baseURL}/order/api/create-order`, payload, {
        headers: {
    Authorization: `Bearer ${token}`
    }
      });
      if (res.data.status === 'success') {
        if (res.data.checkoutURL) {
          window.location.href = res.data.checkoutURL
        } else {
          navigate('/my-orders')
        }
        removeAllFromCart();
      } else {
        
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
  };

  return (
    <div className="bg-gray-100 p-6 rounded shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      {/* Delivery Address */}
      <div className="border-t border-gray-300 pt-4 relative">
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="text-gray-600 font-medium">DELIVERY ADDRESS</span>
          <span
            className="text-green-500 cursor-pointer"
            onClick={() => handleLogin()}
          >
            Change
          </span>
        </div>

        {/* Selected address */}
        <p className="text-sm text-gray-700 mb-2">
          {selectedAddress ? formatAddress(selectedAddress) : "No address selected"}
        </p>

        {/* Address dropdown */}
        {showChangeAddress && (
          <div className="w-full absolute bg-white p-2 shadow-md z-10">
            {addresses.length > 0 ? (
              addresses.map((address, index) => (
                <p
                  key={address._id || index}
                  className="mb-1 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
  setSelectedAddress(address);
  localStorage.setItem("selectedAddress", JSON.stringify(address)); // save to localStorage
  setShowChangeAddress(false);
}}
                >
                  {formatAddress(address)}
                </p>
              ))
            ) : (
              <p className="text-sm text-gray-500 mb-4">No address found</p>
            )}
            <p
              className="text-green-500 text-center mt-3 cursor-pointer"
              onClick={() => navigate("/add-address")}
            >
              Add Address
            </p>
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div className="mb-4 mt-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          PAYMENT METHOD
        </label>
        <select className="w-full border border-gray-300 rounded px-2 py-1" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="Cash On Delivery">Cash On Delivery</option>
          <option value="card">Stripe</option>
        </select>
      </div>

      {/* Price Details */}
      <div className="text-sm text-gray-700 space-y-2">
        <div className="flex justify-between">
          <span>Price</span>
          <span>${price}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span className="text-green-500">Free</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (2%)</span>
          <span>${tax}</span>
        </div>
        <div className="flex justify-between font-semibold text-base border-t pt-2">
          <span>Total Amount:</span>
          <span>${total}</span>
        </div>
      </div>

      {/* Place Order */}
      <PrimaryBtn txt={"Place Order"} loading={loading} className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-sm" onClick={createOrder}>
        
      </PrimaryBtn>
    </div>
  );
};

export default OrderSummary;
