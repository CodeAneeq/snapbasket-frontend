import React from 'react'
import delivery_truck_icon from '../../assets/delivery_truck_icon.svg'

const HomeBottomCard = ({img, heading, para}) => {
  return (
    <div className='flex gap-5'>
        <img src={img} alt="" />
        <div>
        <h3 className='text-gray-700 font-bold text-xl'>{heading}</h3>
        <p className='text-gray-500'>{para}</p>
        </div>
    </div>
  )
}

export default HomeBottomCard