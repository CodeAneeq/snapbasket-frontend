import React, { useState } from 'react';
import PrimaryBtn from '../button/primary-btn';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import baseURL from '../../services/baseURL';
import { addUser } from '../../redux/features/user-slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Toster from '../toster/toster';
import { emailRegex, passwordRegex } from '../../services/helper';
import GoogleLoginButton from '../button/google-login-btn';

// Regex patterns
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [txt, setTxt] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateFields = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } 

    return valid;
  };

  const loginAPI = async () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      let payload = { email, password };
      let response = await axios.post(`${baseURL}/auth/api/login`, payload);

      if (response.data.status === 'success') {
        localStorage.setItem("token", response.data.data.token);
        dispatch(addUser(response?.data));
        navigate('/');
        props.onClose();
        setTxt("Login Successfully");
        setShowToast(true);
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong";

      if (msg.toLowerCase().includes("email")) {
        setEmailError(msg);
      } else if (msg.toLowerCase().includes("password")) {
        setPasswordError(msg);
      } else {
        setTxt(msg);
        setShowToast(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50'>
      {showToast && <Toster txt={txt} show={showToast} setShow={setShowToast}/>}

      <div className='w-80 h-105 bg-white rounded shadow p-6 max-sm:w-75'>
        <div>
          <span onClick={props.onClose}><IoMdClose /></span>
          <h2 className="text-xl font-bold mb-4 text-center"><span className='text-green-400'>User</span> Login</h2>
        </div>
        
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
            className='w-full p-2 border border-gray-500/50 mt-2 rounded-sm'
          />
          {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}

          <label className="mt-3 block">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
            className='w-full p-2 border border-gray-500/50 mt-2 rounded-sm'
          />
          {passwordError && <p className="text-xs text-red-500 mt-1">{passwordError}</p>}
        </div>

        <p className="mt-3">Create an Account <span className='text-green-400 cursor-pointer' onClick={props.openSignUp}>Click Here</span></p>
        
        <div className=''>

        <PrimaryBtn
          loading={loading}
          txt={"Login"}
          className="w-full cursor-pointer text-white bg-green-400 rounded-sm mt-4 mb-3"
          onClick={loginAPI}
          />
          <GoogleLoginButton/>
          </div>
      </div>
    </div>
  );
};

export default Login;
