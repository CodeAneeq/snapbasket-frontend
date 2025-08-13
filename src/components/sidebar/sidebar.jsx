import React from 'react'
import addIcon from '../../assets/add_icon.svg';
import productIcon from '../../assets/product_list_icon.svg';
import orderIcon from '../../assets/order_icon.svg';
import StyledListItem from '../li/styled-list-item'

const Sidebar = () => {
  return (
    <div className='w-3xs border-r-1 border-r-gray-300 h-auto max-md:w-80 max-md:overflow-x-hidden'>
        <div className='mt-2'>
        <StyledListItem redirect={'/'} title={"Add Product"} icon={addIcon}/>
        <StyledListItem redirect={'/seller/product-list'} title={"Products List"} icon={productIcon}/>
        <StyledListItem redirect={'/seller/order-list'} title={"Orders"} icon={orderIcon}/>

        </div>
    </div>
  )
}

export default Sidebar