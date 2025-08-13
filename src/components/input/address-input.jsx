import React from 'react'

const AddressInput = ({type, placeholder, style, value, onChange, id}) => {
  return (
    <input id={id} className='w-full border-1  border-gray-300 rounded-sm px-3 py-2' type={type} placeholder={placeholder} style={style} value={value} onChange={onChange} />
  )
}

export default AddressInput