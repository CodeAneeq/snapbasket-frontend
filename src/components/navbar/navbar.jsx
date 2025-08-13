import React, { useEffect, useState } from 'react';
import logo from '../../assets/logoNavbar.png';
import searchIcon from '../../assets/search_icon.svg';
import PrimaryBtn from '../button/primary-btn';
import CartIcon from '../cart-icon/cart-icon';
import { NavLink, useNavigate } from 'react-router-dom';
import Login from '../auth/login';
import SignUp from '../auth/signup';
import profile_icon from '../../assets/profile_icon.png'
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../redux/features/user-slice';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ NEW
  const [isHoverOptionOpen, setIsHoverOptionOpen] = useState(false);
  const [search, setSearch] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector(state => state.user.isLogin);
  const role = useSelector(state => state.user.role);


useEffect(() => {
  if (isLogin) {
    setIsLoginOpen(false);
    setIsSignUpOpen(false);
  }
}, [isLogin]);



  return (isLogin && role == "admin") ? (
     <><div className='w-full px-5 py-2 flex justify-between items-center border-b-2 border-gray-100 relative max-md:px-3'>
      {/* Logo */}
      <figure>
        <img className='h-10' src={logo} alt="Logo" />
      </figure>

      <PrimaryBtn className="border-1 border-gray-500/70 rounded-2xl" txt={"Logout"} onClick={() =>{ dispatch(removeUser()), navigate('/')}}></PrimaryBtn>
    </div></>
    
    
  ) : ( <><div className='w-full px-30 py-5 flex justify-between items-center border-b-2 border-gray-100 relative max-md:px-3'>
      {/* Logo */}
      <figure>
        <img className='h-10' src={logo} alt="Logo" />
      </figure>

      {/* Hamburger Menu for Mobile */}
      <button
        className="flex flex-col gap-1.5 w-8 h-6 justify-center items-center group md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="w-full h-0.5 bg-gray-800 group-hover:bg-green-600 transition-all"></span>
        <span className="w-full h-0.5 bg-gray-800 group-hover:bg-green-600 transition-all"></span>
        <span className="w-full h-0.5 bg-gray-800 group-hover:bg-green-600 transition-all"></span>
      </button>

      {/* Navigation (responsive with conditional class) */}
      <div
        className={`flex-col gap-6 bg-white absolute top-20 left-0 w-full px-6 py-4 md:flex md:flex-row md:static md:p-0 md:w-auto md:bg-transparent md:items-center ${
          isMenuOpen ? 'flex' : 'hidden'
        }`}
      >
        <ul className='flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center'>
          <NavLink to={'/'}>Home</NavLink>
          <NavLink to={'/all-products'}>All Product</NavLink>
        </ul>

        <div className='flex justify-between items-center border border-gray-300 rounded-2xl p-1 px-3 h-8 max-lg:hidden md:ml-6'>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Products' className="outline-none text-sm" />
          <span className='p-1'>
            <img src={searchIcon} alt="Search" onClick={() => navigate(`/search-result?search=${search}`)}/>
          </span>
        </div>

          
        {isLogin ? <div className ='relative flex gap-4 items-center '>
          <CartIcon />
          <img className=' relative w-12 h-12' src={profile_icon} alt=""  onMouseEnter={() => setIsHoverOptionOpen(true)}
    onClick={() => setIsHoverOptionOpen((prev) => !prev)} />
            {isHoverOptionOpen && (
    <div
      onMouseLeave={() => setIsHoverOptionOpen(false)} // Close on mouse leave (desktop)
      className='absolute w-26 h-18 top-13 rounded-sm bg-white border border-gray-500/70 right-0 p-2 text-sm max-md:left-0 z-50 shadow-md'
    >
      <NavLink to={'/my-orders'}><p className='hover:bg-green-200 mb-2 cursor-pointer'>My Orders</p></NavLink>
      <p className='hover:bg-green-200 cursor-pointer' onClick={() =>{ dispatch(removeUser()), navigate('/')}}>Logout</p>
    </div>
  )}
        </div> :  <div className='flex gap-4 items-center mt-4 md:mt-0'>
          <CartIcon />
          <PrimaryBtn
            className="bg-green-500 text-white"
            txt={"Login"}
            onClick={() => {
              setIsLoginOpen(true);
              setIsMenuOpen(false);
            }}
          />
        </div>}
       
      </div>

      {!isLogin && isLoginOpen && (
  <Login
    onClose={() => setIsLoginOpen(false)}
    openSignUp={() => {
      setIsLoginOpen(false);
      setIsSignUpOpen(true);
    }}
  />
)}

{!isLogin && isSignUpOpen && (
  <SignUp
    onClose={() => setIsSignUpOpen(false)}
    openLogin={() => {
      setIsSignUpOpen(false);
      setIsLoginOpen(true);
    }}
  />
)}

   
    </div></>);
};

export default Navbar;
