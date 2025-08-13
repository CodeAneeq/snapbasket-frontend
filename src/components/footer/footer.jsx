import React from 'react'
import logo from '../../assets/logoNavbar1.png'

const Footer = () => {
  return (
    <div className='w-full bg-green-100 pl-30 pr-30 pt-20 pb-20 flex justify-between max-lg:pl-15 max-lg:pr-15 max-md:flex-col'>
        <div className='w-1/2 max-md:w-full max-md:mb-10'>
            <figure>
                <img src={logo} alt="" />
            </figure>
            <p className='w-3/4 mt-5 text-gray-700/70'>
                We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.
            </p>
        </div>
        <div className='flex gap-10 text-gray-700/70 flex-wrap'>
            <ul className='text-sm flex flex-col gap-2'>
                <li className='text-black font-medium mb-4'>Quick Links</li>
                <li>Home</li>
                <li>Best Sellers</li>
                <li>Offers & Deals</li>
                <li>Contact Us</li>
                <li>FAQ's</li>
            </ul>
            <ul className='text-sm flex flex-col gap-2'>
                <li className='text-black font-medium mb-4'> Need Help?</li>
                <li>Delivery Infomation</li>
                <li>Return & Refund Policy</li>
                <li>Payment Methods</li>
                <li>Track Your Order</li>
                <li>Contact Us</li>
            </ul>
            <ul className='text-sm flex flex-col gap-2'>
                <li className='text-black font-medium mb-4'>Follow Us</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Facebook</li>
                <li>Youtube</li>
            </ul>
        </div>
    </div>
  )
}

export default Footer