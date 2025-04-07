import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase/Firebase';
import { useNavigate } from 'react-router';
import useGlobalContext from '../../hooks/useGlobalContext';
const SignUp = () => {
  const { user, setUser } = useGlobalContext();
  const navigate = useNavigate();
  const navigateToLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleNameInput = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleEmailInput = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    setIsSigningUp(true);
    e.preventDefault();
    if (!name || !password || !email) {
      console.error('Please provide email, password and name.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setUser((currentInfo) => ({ ...currentInfo, name, email }));
      localStorage.setItem('savedUser', JSON.stringify(user));
      user;
      navigate('/new_user/landing');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(
        'Error Code : ',
        errorCode,
        'Error Message : ',
        errorMessage
      );
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className='flex w-full h-screen'>
      <div className='hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200'>
        <div className='w-60 h-60 rounded-full bg-gradient-to-tr from-orange-500 to-purple-500 animate-spin' />
        <div className='w-full h-1/2 absolute bottom-0 bg-white/10' />
      </div>
      <div className='w-full flex items-center justify-center lg:w-1/2'>
        <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
          <h1 className='text-5xl font-semibold'>Register</h1>
          <p className='font-medium text-lg text-gray-500 mt-4'>
            Hello! Enter your details to get started.
          </p>
          <div className='mt-8'>
            <div className='flex flex-col'>
              <label className='text-lg font-medium'>Name</label>
              <input
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Enter your name'
                value={name}
                onChange={(e) => handleNameInput(e)}
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-lg font-medium'>Email</label>
              <input
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => handleEmailInput(e)}
              />
            </div>
            <div className='flex flex-col mt-4'>
              <label className='text-lg font-medium'>Password</label>
              <input
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Enter your password'
                type={'password'}
                value={password}
                onChange={(e) => handlePasswordInput(e)}
              />
            </div>

            <div className='mt-8 flex flex-col gap-y-4'>
              <button
                onClick={(e) => handleRegister(e)}
                disabled={isSigningUp}
                className={`transition-all ease-in-out transform py-4 rounded-xl font-bold text-lg
    ${
      isSigningUp
        ? 'bg-violet-500 bg-opacity-50 cursor-not-allowed text-white'
        : 'bg-violet-500 text-white hover:scale-[1.01] active:scale-[.98] active:duration-75'
    }`}>
                {isSigningUp ? 'Registering...' : 'Register'}
              </button>
            </div>
            <div className='mt-8 flex justify-center items-center'>
              <p className='font-medium text-base'>Don't have an account?</p>
              <button
                className='ml-2 font-medium text-base text-violet-500'
                onClick={(e) => navigateToLogin(e)}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
