import React from 'react'
import { NavLink } from 'react-router-dom';

const StyledListItem = ({redirect, title, icon}) => {
  return (
    <div className=' w-full'>
        <NavLink to={redirect} className={({ isActive }) =>
      `block w-full px-5 py-3 max-md:px-2 ${isActive ? " bg-green-100 border-r-6 border-r-green-950" : "hover:bg-gray-100"}`
    }>
            <p className='flex gap-2 max-md:justify-center'><img src={icon} alt="" /> <span className='max-md:hidden'>{title}</span></p>
        </NavLink>
    </div>
  )
}

export default StyledListItem