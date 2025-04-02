import React from 'react';
import { useNavigate } from 'react-router';
import useGlobalContext from '../../../hooks/useGlobalContext';

const CareerInterest = () => {
  const navigate = useNavigate();
  const { user, setUser } = useGlobalContext();
  console.log(user);
  const navigateToPrev = () => navigate(-1);
  const navigateToMbtiCheck = () =>
    navigate('/new_user/mbti_personality_check');

  const handleInputChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  return (
    <div className=' flex flex-col gap-[30px]'>
      <div className='flex flex-row '>
        <img
          src='/MilestonesMascot.svg'
          className='w-[301px] h-[238px]'
        />
        <div className='flex flex-col w-full gap-5'>
          <div className='flex flex-col'>
            <div className='bg-[#1D4ED8] w-fit px-[32px] py-[8px] text-white relative top-3 left-5 font-mono rounded-full'>
              Miles
            </div>
            <div className='bg-white text-xl pl-[24px] pr-[59px] py-[32px] w-[955px] outline-slate-500 rounded-xl outline-1 '>
              Great, it’s nice to know you a little better! I can now cater my
              responses to fit your demographic more. :){' '}
            </div>
          </div>
          <div className='bg-white text-xl pl-[24px] pr-[59px] py-[32px] w-[955px] outline-slate-500 rounded-xl outline-1 '>
            Now, let’s figure out your field and career of interest. These are
            important to help me recommend suitable pathways for you to follow
            during your time here at Milestones.{' '}
          </div>
        </div>
      </div>
      <div className='flex flex-col px-[272px] h-[448px] w-[752px] '>
        <div className='bg-[#1D4ED8] px-[32px] py-[8px] w-fit text-white relative top-3 left-5 font-mono rounded-full'>
          Test User
        </div>
        <div className='flex flex-col gap-[24px] py-[16px] bg-white px-[24px] w-[800px] outline-slate-100 rounded-xl outline-1'>
          <div className='flex flex-col gap-[24px] justify-between'>
            <div
              className='text-[#1D4ED8] text-lg font-normal mt-[16px] hover:cursor-pointer'
              onClick={navigateToPrev}>
              &lt; Previous
            </div>
            <div className='flex flex-col gap-[8px]'>
              <div className='text-[#1E3A8A] font-bold text-lg'>
                Field Of Interest
              </div>

              <select
                id='fieldOfInterest'
                className='bg-white p-4 w-[280px] h-[56px] outline-slate-300 rounded-xl outline-1'
                onChange={(e) => handleInputChange(e)}>
                <option value='ComputerScience'>Computer Science</option>
                <option value='Finance'>Finance</option>
              </select>
            </div>
          </div>

          <div className='flex flex-col gap-[8px]'>
            <div className='text-[#1E3A8A] font-bold text-lg'>
              Career Interest
            </div>

            <select
              id='careerInterest'
              onChange={(e) => handleInputChange(e)}
              className='bg-white p-4 w-[280px] h-[56px] outline-slate-300 rounded-xl outline-1'>
              <option value=''>Software Engineering</option>
              <option value=''>Data Science</option>
              <option value=''>DevOps</option>
            </select>
          </div>

          <div className='flex flex-row ml-auto gap-[16px]'>
            <div className='bg-white border-1 border-[#1D4ED8] justify-center items-center text-[#1D4ED8] flex rounded-xl w-[160px] h-[50px] '>
              <button
                className='text-xl py-1 hover:cursor-pointer'
                onClick={() => navigate(-1)}>
                I am unsure
              </button>
            </div>
            <div className='bg-[#1D4ED8] justify-center items-center  text-white flex rounded-xl w-[120px] h-[50px] '>
              <button
                className='text-xl py-1 hover:cursor-pointer'
                onClick={navigateToMbtiCheck}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerInterest;
