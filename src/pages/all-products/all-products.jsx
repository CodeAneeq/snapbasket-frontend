import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/layout/page-layout'
import ProductCard from '../../components/card/product-card'
import axios from 'axios'
import baseURL from '../../services/baseURL'
import Loader from '../../components/loader/loader'

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);
    

    const productsAPI = async () => {
        setLoader(true);
        try {
            let data = await axios.get(`${baseURL}/product/api/get-products`);
            let exactData = data.data.data;
            let stock = exactData.filter((item) => item.status === 'stock');            
            setProducts(stock);
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        productsAPI();
    }, [])

        useEffect(() => {
            document.title = 'SnapBasket - All Products'
        }, [])

  return (
    <PageLayout>
         <div className='mt-20 pl-30 pr-30 mb-20 max-md:pl-3 max-md:pr-3'>
                <h2 className='text-3xl font-medium'>Best Sellers</h2>
                {
                    loader && <Loader/>
                }
                <div className='flex mt-10 gap-9 flex-wrap max-sm:justify-center'>
                    {
                        products.map((item) => {
                            return <ProductCard prod={item} id={item._id} key={item._id} img={item?.images[0]} name={item?.title} ogPrice={item?.orignalPrice} dsPrice={item.discountedPrice} category={item?.category}></ProductCard>

                        })
                    }
                </div>
            </div>
    </PageLayout>
  )
}

export default AllProducts