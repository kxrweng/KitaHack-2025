import React, { useState } from 'react';
import ExperienceInput from '../../../components/AuthUserComponents/ResumeBuilder/ExperienceInput';
import { useNavigate } from 'react-router';
import DisplayCard from '../../../components/AuthUserComponents/ResumeBuilder/DisplayCard';
import useGlobalContext from '../../../hooks/useGlobalContext';
const Experience = () => {
  const { user, setUser } = useGlobalContext();
  //#F1F5F9 for even, #DBEAFE for odd
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);

  // const [experiences, setExperiences] = useState([
  //   {
  //     role: 'Software Engineer Intern',
  //     location: 'RytBank',
  //     duration: 'March 2025 - April 2025',
  //     description: [
  //       'Enhanced RabbitMQ requests',
  //       'Migrated frontend using Next.js',
  //     ],
  //   },
  // ]);
  // const [projects, setProjects] = useState([
  //   {
  //     name: 'Milestones',
  //     duration: 'March 2025 - April 2025',
  //     link: 'github.com/kxrweng',
  //     description: [
  //       'Setup frontend CI/CD pipeline',
  //       'Develop application based on Figma designs',
  //     ],
  //   },
  // ]);
  // const handleAddMore = () => {
  //   console.log('handleAddMore');
  // };
  // const handleSaveChanges = () => {
  //   console.log('handleSaveChanges');
  // };

  const handleGenerateResume = () => {
    console.log('HandleGenerateResume clicked!');
  };
  return (
    <div className='flex flex-row gap-[18px] w-full'>
      <div className='flex flex-col flex-1 pl-[72px] py-[36px] gap-[36px]'>
        <div className='text-[#1E3A8A] font-semibold text-xl'>
          Build your Resume
        </div>
        <div className='flex flex-col bg-white px-[48px] py-[36px] gap-[24px]  '>
          <div className='flex justify-center items-center'>
            <img src='/ExperienceStepThree.png' />
          </div>

          {experiences.length > 0 ? (
            <div className='flex flex-col gap-[8px]'>
              <DisplayCard state={experiences} />
              <ExperienceInput
                topic='work'
                // handleAddMore={handleAddMore}
                // handleSaveChanges={handleSaveChanges}
              />
            </div>
          ) : (
            <ExperienceInput
              topic='work'
              // handleAddMore={handleAddMore}
              // handleSaveChanges={handleSaveChanges}
            />
          )}

          {projects.length > 0 ? (
            <div className='flex flex-col gap-[8px]'>
              <DisplayCard state={projects} />
              <ExperienceInput
                topic='project'
                // handleAddMore={handleAddMore}
                // handleSaveChanges={handleSaveChanges}
              />
            </div>
          ) : (
            <ExperienceInput
              topic='project'
              // handleAddMore={handleAddMore}
              // handleSaveChanges={handleSaveChanges}
            />
          )}
        </div>
        <div className='flex flex-row justify-between'>
          <div
            className='border-[#1E3A8A] border rounded-lg px-[24px] py-[12px] text-[#1E3A8A] text-xl hover:cursor-pointer'
            onClick={() => navigate(-1)}>
            Previous
          </div>{' '}
          <div className='flex flex-row gap-[10px]'>
            <div className='border-[#1E3A8A] border rounded-lg px-[24px] py-[12px] text-[#1E3A8A] text-xl hover:cursor-pointer'>
              Get Feedback
            </div>{' '}
            <div
              className='border rounded-lg px-[24px] py-[12px] bg-[#1D4ED8] text-white hover:cursor-pointer text-xl'
              onClick={handleGenerateResume}>
              Generate Resume
            </div>{' '}
          </div>
        </div>{' '}
      </div>
      <div className='flex flex-col w-[30%] border sticky  right-0 top-0'>
        <div>Chatbot here</div>
      </div>
    </div>
  );
};

export default Experience;
