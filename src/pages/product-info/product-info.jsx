import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/layout/page-layout'
import { Rating } from 'react-simple-star-rating'
import PrimaryBtn from '../../components/button/primary-btn'
import ProductCard from '../../components/card/product-card';
import baseURL from '../../services/baseURL';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import UseShoppingCart from '../../hooks/use-shopping-cart';


const ProductInfo = () => {
  const {addProductIntoCart} = UseShoppingCart();
  const navigate = useNavigate();
  const id = useParams();
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});
  const [img, setImg] = useState();

   const allProductsAPI = async () => {
        try {
            let data = await axios.get(`${baseURL}/product/api/get-products`);
            setProducts(data.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const singleProductAPI = async () => {
      try {
        let data = await axios.get(`${baseURL}/product/api/get-product/${id.id}`);
       setSingleProduct(data.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    const buyNow = () => {
      addProductIntoCart(singleProduct);
      navigate('/cart')
    }

    useEffect(() => {
      if (id.id) {
        allProductsAPI();
        singleProductAPI();
      }
    }, [id.id])
    useEffect(() => {
        if (singleProduct?.images?.length > 0) {
          setImg(singleProduct?.images[0])
        }
    }, [singleProduct])
    

    const handleAddToCart = () => {
      if (singleProduct) {
       return {p: singleProduct, quantity: 1}
        
      }
    }

        useEffect(() => {
          if (singleProduct) {
            console.log(singleProduct);
            document.title = `${singleProduct?.title}`
          }
          
        }, [singleProduct])


  return (
    <PageLayout>
      <div className='pl-30 pr-30 max-lg:pl-3 max-lg:pr-3 pt-10 pb-20 w-full'>
        <p>Home / Products / {singleProduct.category} / <span className='text-green-400'>{singleProduct.title}</span></p>
        <div className='flex gap-20 mt-5 w-full max-md:flex-col max-md:mt-10'>
          <div className='flex gap-3 w-1/2 max-xl:w-3/5 max-md:w-full max-md:justify-center'>
            <div className='flex flex-col gap-5 max-w-24 max-sm:max-w-15'>
              {
                singleProduct?.images?.map((item) => {
                  return <img className='border-1 border-gray-500/30 rounded-sm cursor-pointer max-w-24' src={item} onClick={() => setImg(item)} />
                })
              }
            </div>
            <div className='max-w-100'>
              <img className='border-1 border-gray-500/30 rounded-sm cursor-pointer' src={img} alt="" />
            </div>
          </div>
          <div className='w-1/2 max-xl:w-2/5 max-md:w-full'>
            <h1 className='text-3xl font-medium'>{singleProduct.title}</h1>
            <Rating
              initialValue={4}
              readonly={true}
              allowFraction={true}
              size={20}
              className="inline-rating"
              fillClassName="text-green-100"
            />
                       <div className='mt-5'>
              <h3 className='line-through text-gray-500 font-medium'>MRP: ${singleProduct.discountedPrice}</h3>
              <h3 className='text-2xl font-medium'>MRP: ${singleProduct.orignalPrice}</h3>
              <p className='text-gray-500/70'>(inclusive of all taxes)</p>
            </div>
            <div className='mt-5'>

              <p>
                {singleProduct.description}
              </p>
            </div>
            <div className='flex mt-10 gap-5 w-full'>
              <PrimaryBtn className='bg-gray-100 w-full pl-5 pr-5 rounded-none h-12 text-black hover:bg-gray-200 transition cursor-pointer' txt={"Add to Cart"} onClick={() => addProductIntoCart(handleAddToCart())}></PrimaryBtn>
              <PrimaryBtn className='text-white w-full rounded-none h-12 bg-green-500 cursor-pointer' txt={"Buy Now"} link={'/cart'} onClick={() => addProductIntoCart(handleAddToCart())}></PrimaryBtn>

            </div>

          </div>
        </div>
    <div className='text-center mt-20'>
                <h2 className="text-2xl font-semibold uppercase text-gray-800">
                    ORGANIC <span className="relative inline-block">
                        VEGGIES
                        <span className="absolute left-0 -bottom-2 w-full h-1 bg-green-400 rounded-full"></span>
                    </span>
                </h2>
                <div className='flex mt-10 gap-9 flex-wrap justify-center'>
                  {
                        products.slice(0, 5).map((item) => {
                            return <ProductCard id={item._id} prod={item} key={item._id} img={item?.images[0]} name={item?.title} ogPrice={item?.orignalPrice} dsPrice={item.discountedPrice} category={item?.category}></ProductCard>

                        })
                    }
                </div>
                <div className='flex justify-center mt-10'>
                  <PrimaryBtn className='text-green-400 border-1 border-green-400 rounded-sm' txt={"See More"} onClick={() => navigate('/all-products')}></PrimaryBtn>
                </div>
            </div>
      </div>
    </PageLayout>
  )
}

export default ProductInfo