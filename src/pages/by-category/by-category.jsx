import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/layout/page-layout'
import ProductCard from '../../components/card/product-card';
import baseURL from '../../services/baseURL';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../../components/loader/loader';

const ByCategory = () => {
    const {category} = useParams()
    
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);
    

    const productsAPI = async () => {
        setLoader(true);
        try {
            let data = await axios.get(`${baseURL}/product/api/get-products`);
            let productsData = data.data.data;
            console.log(productsData);
            
            let filteredData = productsData.filter(
  item => item.category === category && item.status == "stock"
);

            console.log(filteredData);
                       
            setProducts(filteredData)
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
            document.title = `SnapBasket - ${category}`
        }, [])
    return (
        <PageLayout>
            <div className='mt-20 pl-30 pr-30 mb-20 max-md:pl-3 max-md:pr-3'>
                <h2 className="text-2xl font-semibold uppercase text-gray-800">
                     <span className="relative inline-block">
                        {category}
                        <span className="absolute left-0 -bottom-2 w-full h-1 bg-green-400 rounded-full"></span>
                    </span>
                </h2>
                {loader && <Loader/>}
                <div className='flex mt-10 gap-9 flex-wrap max-sm:justify-center'>
                    { 
                        products.length >= 1 ?
                        products.map((item) => {
                            return <ProductCard key={item._id} id={item._id} prod={item} img={item?.images[0]} name={item?.title} ogPrice={item?.orignalPrice} dsPrice={item.discountedPrice} category={item?.category}></ProductCard>

                        }) : <p>No Product To Show</p>
                    }
                </div>
            </div>
        </PageLayout>
    )
}

export default ByCategory