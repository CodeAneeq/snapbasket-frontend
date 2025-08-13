import React from 'react'
import grain_image from '../../assets/grain_image.png' 
import { useNavigate } from 'react-router-dom'

const CategoryCard = ({bg, img, categ}) => {
  const naviage = useNavigate();

  return (
    <div className={`w-32 h-48 ${bg} flex items-center justify-center flex-col rounded-md cursor-pointer`} onClick={() => naviage(`/filter-by-category/${categ}`)}>
        <img className='w-24 hover:scale-105 transition-all' src={img} alt="" />
        <p className='text-sm font-medium'>{categ}</p>
    </div>
  )
}

export default CategoryCard