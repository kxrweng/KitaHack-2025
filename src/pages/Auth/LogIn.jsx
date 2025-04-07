import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { auth } from '../../firebase/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import useGlobalContext from '../../hooks/useGlobalContext';
const LogIn = () => {
  const { user } = useGlobalContext();
  user;
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const navigateToSignUp = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    if (!email || !password) {
      console.error('Provide email and password');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      user;
      navigate('/auth_user/pathways');
    } catch (error) {
      error;
      const errorCode = error.code;
      const errorMessage = error.message;

      'Error Code : ', errorCode, 'Error Message : ', errorMessage;
    } finally {
      setIsLoggingIn(false);
    }
  };
  return (
    <div className='flex w-full h-screen'>
      {/* {userLoggedIn && (
        <Navigate
          to={'/auth_user/landing'}
          replace={true}
        />
      )} */}
      <div className='w-full flex items-center justify-center lg:w-1/2'>
        <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
          <h1 className='text-5xl font-semibold'>Welcome Back</h1>
          <p className='font-medium text-lg text-gray-500 mt-4'>
            Welcome back! Please enter your details.
          </p>
          <div className='mt-8'>
            <div className='flex flex-col'>
              <label className='text-lg font-medium'>Email</label>
              <input
                value={email}
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Enter your email'
                onChange={(e) => handleEmailInput(e)}
              />
            </div>
            <div className='flex flex-col mt-4'>
              <label className='text-lg font-medium'>Password</label>
              <input
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Enter your password'
                value={password}
                type={'password'}
                onChange={(e) => handlePasswordInput(e)}
              />
            </div>

            <div className='mt-8 flex flex-col gap-y-4'>
              <button
                onClick={(e) => handleLogin(e)}
                disabled={isLoggingIn}
                className={`transition-all ease-in-out transform py-4 rounded-xl font-bold text-lg
    ${
      isLoggingIn
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-violet-500 hover:scale-[1.01] active:scale-[.98] active:duration-75 text-white'
    }`}>
                {isLoggingIn ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
            <div className='mt-8 flex justify-center items-center'>
              <p className='font-medium text-base'>Don't have an account?</p>
              <button
                className='ml-2 font-medium text-base text-violet-500'
                onClick={(e) => navigateToSignUp(e)}>
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200'>
        <div className='w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin' />
        <div className='w-full h-1/2 absolute bottom-0 bg-white/10' />
      </div>
    </div>
  );
};

export default LogIn;
