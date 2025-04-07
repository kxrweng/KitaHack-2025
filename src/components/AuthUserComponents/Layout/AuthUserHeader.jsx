import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalContext from '../../../hooks/useGlobalContext';
const AuthUserHeader = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const [currentSelectedPage, setCurrentSelectedPage] = useState('Upskill');

  useEffect(() => {
    if (currentSelectedPage === 'Upskill') {
      navigate('/auth_user/pathways');
    } else if (currentSelectedPage === 'InterviewPractice') {
      navigate('/auth_user/interview_practice');
    } else if (currentSelectedPage === 'ResumeBuilder') {
      navigate('/auth_user/resume_builder');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSelectedPage]);

  const selectedStyle = {
    color: 'white',
    backgroundColor: '#1D4ED8',
    borderRadius: '12px',
    padding: '10px 10px',
    transition: 'all 0.3s ease-in-out',
  };

  const notSelectedStyle = {
    color: '#1D4ED8',
    padding: '10px',
    transition: 'all 0.3s ease-in-out',
  };

  const onClickPageNavigator = (page) => setCurrentSelectedPage(page);

  return (
    <div className='flex flex-row w-full py-[24px] px-[72px] border-b-1 border-slate-300 drop-shadow-2xl '>
      <div className='flex flex-row mr-auto items-center basis-[20%]'>
        <img src='/MilestonesLogo.svg' />
        <div className='text-[#1D4ED8] text-xl font-bold w-[120px]'>
          Milestones
        </div>
      </div>

      <div className='flex flex-row flex-grow items-center justify-center gap-[24px]'>
        <div
          style={
            currentSelectedPage === 'Upskill' ? selectedStyle : notSelectedStyle
          }
          className='flex flex-row gap-[8px] items-center cursor-pointer'
          onClick={() => onClickPageNavigator('Upskill')}>
          <img
            src={`${
              currentSelectedPage === 'Upskill'
                ? '/UpskillIconWhite.svg'
                : '/UpskillIcon.svg'
            }`}
            className='w-[24px] h-[24px]'
          />
          <div className='font-semibold'>Upskill</div>
        </div>

        <div
          style={
            currentSelectedPage === 'ResumeBuilder'
              ? selectedStyle
              : notSelectedStyle
          }
          className='flex flex-row gap-[8px] items-center cursor-pointer'
          onClick={() => onClickPageNavigator('ResumeBuilder')}>
          <img
            src={`${
              currentSelectedPage === 'ResumeBuilder'
                ? '/ResumeBuilderIconWhite.svg'
                : '/ResumeBuilderIcon.svg'
            }`}
            className='w-[20px] h-[20px]'
          />
          <div className='font-semibold'>Resume Builder</div>
        </div>

        <div
          style={
            currentSelectedPage === 'InterviewPractice'
              ? selectedStyle
              : notSelectedStyle
          }
          className='flex flex-row gap-[8px] items-center cursor-pointer'
          onClick={() => onClickPageNavigator('InterviewPractice')}>
          <img
            src={`${
              currentSelectedPage === 'InterviewPractice'
                ? '/InterviewPracticeIconWhite.svg'
                : '/InterviewPracticeIcon.svg'
            }`}
            className='w-[24px] h-[24px]'
          />
          <div className='font-semibold'>Interview Practice</div>
        </div>
      </div>

      <div className='flex flex-row basis-[20%] items-center justify-center'>
        <div className='flex flex-row items-center gap-[12px]'>
          <img
            src='/UserAvatar.png'
            className='w-[40px] h-[40px] border-2 border-[#1D4ED8] rounded-full'
          />
          <div className='font-semibold text-[#1D4ED8]'>{user.name}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthUserHeader;
