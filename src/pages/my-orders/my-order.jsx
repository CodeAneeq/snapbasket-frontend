import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/layout/page-layout';
import MyOrderCard from '../../components/card/my-order-card';
import axios from 'axios';
import baseURL from '../../services/baseURL';
import Loader from '../../components/loader/loader';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);
  

  const myOrdersAPI = async () => {
    let token = localStorage.getItem("token");
    setLoader(true);
    try {
      let res = await axios.get(`${baseURL}/order/api/get-my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data.data);
      
      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    myOrdersAPI()
  }, [])

      useEffect(() => {
          document.title = 'SnapBasket - My Orders'
      }, [])
  return (
    <PageLayout>
        <div className='pl-30 pr-30 max-md:pl-3 max-md:pr-3 my-10'>

          <h2 className="text-2xl font-semibold mb-10 border-b-2 inline-block border-green-500">
        MY ORDERS
      </h2>
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
      {/* <MyOrderCard></MyOrderCard> */}
        </div>
    </PageLayout>
  );
};

export default MyOrder;
