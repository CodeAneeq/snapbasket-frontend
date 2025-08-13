import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/layout/page-layout';
import banner from '../../assets/add_address_image.svg'
import AddressInput from '../../components/input/address-input';
import PrimaryBtn from '../../components/button/primary-btn';
import axios from 'axios';
import baseURL from '../../services/baseURL';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddAddress = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [street, setStreet] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");    
    const navigate = useNavigate();
    
    const addressAPI = async () => {
        try {
            let payload = {firstName, lastName, email, street, country, zipCode, city, state, phoneNumber};
            const token = localStorage.getItem("token");
            let res = await axios.post(`${baseURL}/address/api/add-address`, payload, {
                 headers: {
    Authorization: `Bearer ${token}`
    }
    
}); 
    if (res.data.status == 'success') {
        navigate("/cart")
    }
        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }

    useEffect(() => {
        document.title = 'SnapBasket - Add Address'
    }, [])
    
  return (
    <PageLayout>
        <div className='pl-30 pr-30 max-md:pl-3 max-md:pr-3'>
                <h2 className='mt-10 mb-5 text-3xl font-medium text-gray-500 max-sm:text-2xl'>Add Shipping <span className='text-green-500'>Address</span></h2>
            <div className='flex justify-between max-md:flex-col-reverse max-md:items-center '>
                <div className='w-1/2 mt-10 mb-20 max-md:w-full max-md:pl-10 max-md:pr-10 max-md:mt-15 max-sm:pr-0 max-sm:pl-0'>
                    <div className='flex gap-4'>
                    <AddressInput type={"text"} placeholder={"First Name"} value={firstName} onChange={(e) => setFirstName(e.target.value)}></AddressInput>
                    <AddressInput type={"text"} placeholder={"Last Name"} value={lastName} onChange={(e) => setLastName(e.target.value)}></AddressInput>
                    </div>
                    <div className='mt-3'>
                    <AddressInput type={"email"} placeholder={"Email"} value={email} onChange={(e) => setEmail(e.target.value)}></AddressInput>

                    </div>
                    <div className='mt-3'>
                    <AddressInput type={"text"} placeholder={"Street"} value={street} onChange={(e) => setStreet(e.target.value)}></AddressInput>

                    </div>
                     <div className='flex gap-4 mt-3'>
                    <AddressInput type={"text"} placeholder={"City"} value={city} onChange={(e) => setCity(e.target.value)}></AddressInput>
                    <AddressInput type={"text"} placeholder={"State"} value={state} onChange={(e) => setState(e.target.value)}></AddressInput>
                    </div>
                     <div className='flex gap-4 mt-3'>
                    <AddressInput type={"number"} placeholder={"Zip Code"} value={zipCode} onChange={(e) => setZipCode(e.target.value)}></AddressInput>
                    <AddressInput type={"text"} placeholder={"Country"} value={country} onChange={(e) => setCountry(e.target.value)}></AddressInput>
                    </div>
                       <div className='mt-3'>
                    <AddressInput type={"text"} placeholder={"Phone Number"} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></AddressInput>

                    </div>
                    <div className='mt-10'>
                        <PrimaryBtn className="bg-green-500 w-full rounded-none text-white cursor-pointer" txt={"Save Address"} onClick={() => addressAPI()}></PrimaryBtn>
                    </div>
                </div>
                <div className='w-1/2 flex justify-center items-center max-md:w-full'>
                    <img className='w-3/4 h-3/4' src={banner} alt="" />
                </div>
            </div>
        </div>
    </PageLayout>
  )
}

export default AddAddress