import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/layout/page-layout'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';
import baseURL from '../../services/baseURL';
import ProductCard from '../../components/card/product-card';
import Loader from '../../components/loader/loader';

const SearchResult = () => {
    let [searchParams] = useSearchParams();
    let search  = searchParams.get("search");
    console.log(search);
    
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);

    
    const fetchProducts = async () => {
        setLoader(true);
        try {
            let res = await axios.get(`${baseURL}/product/api/search-product?search=${search}`);
            setProducts(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [search])

        useEffect(() => {
            document.title = `SnapBasket - Search Result ${search}`
        }, [])

  return (
    <PageLayout>
        <div className='pl-30 pr-30 max-md:pl-3 max-md:pr-3'>
            <div className='mt-10 mb-10'>
                <h2 className='text-3xl font-medium max-sm:text-xl'>Search Result for <span className='text-green-300'>{search}</span></h2>
                {loader && <Loader/>}
                <div className='flex mt-10 gap-9 flex-wrap max-sm:justify-center'>
                    { 
                    products.length > 0 ?
                        products.map((item) => {                            
                            return <ProductCard id={item._id} prod={item} key={item._id} img={item?.images[0]} name={item?.title} ogPrice={item?.orignalPrice} dsPrice={item.discountedPrice} category={item?.category}></ProductCard>

                        }) : <p>No Product found</p>
                    }
                </div>
            </div>
        </div>
    </PageLayout>
  )
}

export default SearchResult