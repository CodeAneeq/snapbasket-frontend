import React, { useState } from 'react';
import PrimaryBtn from '../button/primary-btn';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import baseURL from '../../services/baseURL';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/features/user-slice';
import Toster from '../toster/toster';
import { emailRegex, passwordRegex } from '../../services/helper';

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");

  const [loading, setLoading] = useState(false);
  const [txt, setTxt] = useState("");
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateFields = () => {
    let valid = true;

    setNameError("");
    setEmailError("");
    setPasswordError("");

    if (!name.trim()) {
      setNameError("Name is required");
      valid = false;
    } else if (name.length < 3) {
      setNameError("Name atleast contain 3 characters");
      valid = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if(!emailRegex.test(email)) {
      setEmailError("Invalid Email Format");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else if(!passwordRegex.test(password)) {
      setPasswordError("Invalid Passowrd Format");
      valid = false;
    }

    return valid;
  };

  const signUpAPI = async () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      let payload = { name, email, password };
      let response = await axios.post(`${baseURL}/auth/api/sign-up`, payload);

      if (response.data.status === 'success') {
        localStorage.setItem("token", response.data.data.token);
        navigate('/');
        props.onClose();
        setTxt("Sign Up successfully");
        setShowToast(true);
      }

      dispatch(addUser(response.data));
  } catch (error) {
  const errMsg = error.response?.data?.message || "Something went wrong";

  // Field-specific error handling
  if (errMsg.toLowerCase().includes("name")) {
    setNameError(errMsg);
  } else if (errMsg.toLowerCase().includes("email")) {
    setEmailError(errMsg);
  } else if (errMsg.toLowerCase().includes("password")) {
    setPasswordError(errMsg);
  } else {
    // General error
    setAuthError(errMsg);
    setShowToast(true);
    setTxt(errMsg);
  }
}
  };

  return (
    <div className='fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50 max-sm:pl-3 max-sm:pr-3'>
      {showToast && <Toster txt={txt} show={showToast} setShow={setShowToast} />}

      <div className='w-80 h-auto bg-white rounded shadow p-6'>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-center w-full">
            <span className='text-green-400'>User</span> Sign Up
          </h2>
          <span onClick={props.onClose} className="cursor-pointer"><IoMdClose /></span>
        </div>

        <div className='mt-4'>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter Name'
            className='w-full p-2 border border-gray-500/50 mt-2 rounded-sm'
          />
          {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}

          <label className='mt-4 block'>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
            className='w-full p-2 border border-gray-500/50 mt-2 rounded-sm'
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}

          <label className='mt-4 block'>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
            className='w-full p-2 border border-gray-500/50 mt-2 rounded-sm'
          />
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>

        {authError && <p className='mt-3 text-red-500 text-xs'>{authError}</p>}

        <p className='mt-3'>
          Already have an account?{" "}
          <span className='text-green-400 cursor-pointer' onClick={props.openLogin}>
            Click Here
          </span>
        </p>

        <PrimaryBtn
          loading={loading}
          txt={"Sign Up"}
          className="w-full text-white bg-green-400 rounded-sm mt-4"
          onClick={signUpAPI}
        />
      </div>
    </div>
  );
};

export default SignUp;
