import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layout/admin-layout'
import AdminProductCard from '../../../components/card/admin-product-card';
import axios from 'axios';
import baseURL from '../../../services/baseURL';
import Loader from '../../../components/loader/loader';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);
    

    const getProductsAPI = async () => {
      setLoader(true);
      try {
        let res = await axios.get(`${baseURL}/product/api/get-products`);
        setProducts(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }

    useEffect(() => {
      getProductsAPI()
    }, [])

        useEffect(() => {
            document.title = 'SnapBasket - Products List'
        }, [])
  
  return (
    <AdminLayout>
       <div className="p-10 w-full max-md:p-5">
        <h2 className='font-medium text-gray-700 text-2xl mb-8'>Products List</h2>
        {loader && <Loader/>}
      <table className="w-full border-1 border-gray-300 bg-white shadow rounded-lg overflow-hidden">
        <thead>
          <tr className="border-b-1 border-b-gray-300 text-left ">
            <th className="py-3 px-4 max-sm:px-1">Product</th>
            <th className="py-3 px-4 max-sm:px-1 max-sm:text-center">Category</th>
            <th className="py-3 px-4 max-sm:hidden">Selling Price</th>
            <th className="py-3 px-4 max-sm:px-1">In Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <AdminProductCard key={item.id} product={item} />
          ))}
        </tbody>
      </table>
    </div>
    </AdminLayout>
  )
}

export default ProductList

