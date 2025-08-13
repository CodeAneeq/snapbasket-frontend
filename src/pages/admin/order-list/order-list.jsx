import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layout/admin-layout'
import MyOrderCard from '../../../components/card/my-order-card';
import baseURL from '../../../services/baseURL';
import axios from 'axios';
import Loader from '../../../components/loader/loader';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);

    const myOrdersAPI = async () => {
    let token = localStorage.getItem("token");
    setLoader(true)
    try {
      let res = await axios.get(`${baseURL}/order/api/get-all-orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data.data);
      
      setOrders(res.data.data);
     
    } catch (error) {
      console.log(error);
    } finally {
       setLoader(false)
    }
  }

  useEffect(() => {
    myOrdersAPI()
  }, [])

      useEffect(() => {
          document.title = 'SnapBasket - Orders List'
      }, [])
  return (
    <AdminLayout>

    <div className="p-10 w-full max-md:p-5">
      <div>
        <h2 className='font-medium text-gray-700 text-2xl mb-10'>Orders List</h2>
      </div>
      {loader && <Loader/>}
     {
     orders.map(order => (
  <MyOrderCard
    key={order._id}
    orderId={order._id}
    paymentMethod={order.paymentMethod}
    totalAmount={order.totalAmount}
    products={order.products}   // pass whole products array
    status={order.status}
    date={order.createdAt.slice(0, 10)}
  />
))
}
    </div>
    </AdminLayout>
  )
}

export default OrderList