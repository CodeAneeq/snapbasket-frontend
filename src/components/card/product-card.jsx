import React from 'react'
import potato from '../../assets/potato_image_1.png'
import { Rating } from 'react-simple-star-rating'
import CardBtn from '../button/card-btn'
import { useNavigate } from 'react-router-dom'
import UseShoppingCart from '../../hooks/use-shopping-cart'


const ProductCard = ({category, name, dsPrice, ogPrice, img, prod, id}) => {
  const navigate = useNavigate();

  return (
    <div className='w-44 h-80 border border-gray-500/20 rounded-sm pt-2 pb-2 px-4 cursor-pointer'>
      <img className='hover:scale-105 transition-all' src={img} alt="Product img" onClick={() => navigate(`/product-info/${id}`)}/>
      <p className='text-gray-500/60 text-sm'>{category}</p>
      <h3 className='text-lg text-gray-700 font-medium'>
        {name?.split("")?.slice(0, 12)?.join("")}
        {name?.length > 14 && '...'}
      </h3>
        <Rating
          initialValue={4}
          readonly={true}
          allowFraction={true}
          size={20}
          className="inline-rating"
          fillClassName="text-green-100"
        />
        <div className='mt-3 flex justify-between'>
            <div>

        <h3 className='text-xl text-green-600 font-medium'>${dsPrice}</h3>
        <h3 className='line-through text-gray-500 font-medium'>${ogPrice}</h3>
            </div>
            <div className='flex items-end'>
                <CardBtn p={prod}/>
            </div>
        </div>
    </div>
  )
}

export default ProductCard
