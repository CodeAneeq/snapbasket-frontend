import React, { useEffect, useState } from 'react'
import PrimaryBtn from '../../components/button/primary-btn'
import arrow from '../../assets/black_arrow_icon.svg'
import organicVegiesImg from '../../assets/organic_vegitable_image.png' 
import fruitsImg from '../../assets/fresh_fruits_image.png' 
import bottles_image from '../../assets/bottles_image.png' 
import maggi_image from '../../assets/maggi_image.png' 
import dairy_product_image from '../../assets/dairy_product_image.png' 
import bakery_image from '../../assets/bakery_image.png' 
import grain_image from '../../assets/grain_image.png' 
import CategoryCard from '../../components/card/category-card'
import ProductCard from '../../components/card/product-card'
import potato_image_1 from '../../assets/potato_image_1.png'
import HomeBottomCard from '../../components/card/home-bottom-card'
import delivery_truck_icon from "../../assets/delivery_truck_icon.svg"
import leaf_icon from "../../assets/leaf_icon.svg"
import coin_icon from "../../assets/coin_icon.svg"
import trust_icon from "../../assets/trust_icon.svg"
import PageLayout from '../../components/layout/page-layout'
import axios from 'axios'
import baseURL from '../../services/baseURL'


const categories = [
  { img: organicVegiesImg, name: "Vegetables", bg: "bg-amber-100" },
  { img: fruitsImg, name: "Fruits", bg: "bg-pink-100" },
  { img: bottles_image, name: "Drinks", bg: "bg-lime-100" },
  { img: maggi_image, name: "Instant", bg: "bg-green-100" },
  { img: dairy_product_image, name: "Dairy", bg: "bg-orange-100" },
  { img: bakery_image, name: "Bakery", bg: "bg-blue-100" },
  { img: grain_image, name: "Grains", bg: "bg-purple-100" },
];

const bottomData = [
    {img: delivery_truck_icon, heading: "Fastest Delivery", para: "Groceries delivered in under 30 minutes."},
    {img: leaf_icon, heading: "Freshness Guaranteed", para: "Fresh produce straight from the source."},
    {img: coin_icon, heading: "Affordable Prices", para: "Quality groceries at unbeatable prices."},
    {img: trust_icon, heading: "Trusted by Thousands", para: "Loved by 10,000+ happy customers."},
]


const Home = () => {
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);

    const productsAPI = async () => {
        setLoader(true);
        try {
            let data = await axios.get(`${baseURL}/product/api/get-products`);
            setProducts(data.data.data);
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
            document.title = 'SnapBasket - Home'
        }, [])


    
  return (
    <div className='w-full'>
       <PageLayout>
        <div className='pl-30 pr-30 max-md:pl-3 max-md:pr-3'>

        <div className='mt-12 text-gray-700'>
            <div className='home_main_banner w-full h-80 pl-16 text-5xl pt-10 max-sm:text-3xl max-sm:pl-3 max-sm:pr-3 max-sm:items-center'>
                <div className='w-full font-bold'>
                    <h1 className='text-gray-700'>Freshness You Can <br /> Trust, Savings You <br />will Love!</h1>
                </div>
                <div className='mt-7 flex gap-10 items-center max-sm:gap-5'>
                    <PrimaryBtn link={'/all-products'} txt={"Shop Now"} className={`bg-green-500 text-sm rounded-sm text-white`}/>
                    <span className=' text-sm flex gap-3 items-center text-gray-700 max-sm:text-xs max-sm:gap-2'>Explore Products <img src={arrow} alt="" /></span>
                </div>
            </div>
            <div className='mt-20'>
                <h2 className='text-3xl font-medium'>Categories</h2>
                <div className='flex w-full mt-10 flex-wrap gap-5'>
                    {
                        categories.map((item) => {
                            return <CategoryCard img={item.img} categ={item.name} bg={item.bg}></CategoryCard>
                        })
                    }
                </div>
            </div>
            <div className='mt-20'>
                <h2 className='text-3xl font-medium'>Best Sellers</h2>
                <div className='flex mt-10 gap-9 flex-wrap max-sm:justify-center'>
                    {
                        products.slice(0, 5).map((item) => {
                            // console.log(item);
                            
                            return <ProductCard id={item._id} prod={item} key={item._id} img={item?.images[0]} name={item?.title} ogPrice={item?.orignalPrice} dsPrice={item.discountedPrice} category={item?.category}></ProductCard>

                        })
                    }
                </div>
            </div>
            <div className="mt-10 md:mt-20 w-full mb-20 px-4 md:px-16 lg:px-24 py-10 flex flex-col items-end justify-start home_second_banner bg-cover bg-center">
                   <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-green-500 mb-6 mr-0 md:mr-12 text-end md:text-right">
Why We Are the Best?</h3>
                    <div className='flex flex-col items-start gap-2'>
                        {
                           bottomData.map((item) => {
                            return <HomeBottomCard img={item.img} para={item.para} heading={item.heading}></HomeBottomCard>
                           })
                        }
                    </div>
            </div>
            <div className='mt-24 flex flex-col items-center mb-24 text-center'>
                <h2 className='text-4xl font-medium mb-2'>Never Miss a Deal!</h2>
                <p className='text-gray-500/80 text-lg'>Subscribe to get the latest offers, new arrivals, and exclusive discounts</p>
                <div className='w-2/3 border-1 mt-10 border-gray-100 flex justify-between rounded-md max-md:w-full'>
                    <input className='p-3 pl-2' type="text" placeholder='Enter your email ID'/>
                    <PrimaryBtn className=' text-white rounded-none h-12 rounded-tr-md rounded-br-md bg-green-500' txt={"Subscribe"}></PrimaryBtn>
                </div>
            </div>
        </div>
        </div>
        </PageLayout>
            </div>
  )
}

export default Home