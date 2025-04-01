import React, { useState } from 'react';
import ExperienceInput from '../../../components/AuthUserComponents/ResumeBuilder/ExperienceInput';
import DisplayCard from '../../../components/AuthUserComponents/ResumeBuilder/DisplayCard';
const Experience = () => {
  //#F1F5F9 for even, #DBEAFE for odd
  const [experiences, setExperiences] = useState([
    {
      role: 'Software Engineer Intern',
      location: 'RytBank',
      duration: 'March 2025 - April 2025',
      description: [
        'Enhanced RabbitMQ requests',
        'Migrated frontend using Next.js',
      ],
    },
  ]);
  const [projects, setProjects] = useState([
    {
      name: 'Milestones',
      duration: 'March 2025 - April 2025',
      link: 'github.com/kxrweng',
      description: [
        'Setup frontend CI/CD pipeline',
        'Develop application based on Figma designs',
      ],
    },
  ]);
  const handleAddMore = () => {
    console.log('handleAddMore');
  };
  const handleSaveChanges = () => {
    console.log('handleSaveChanges');
  };
  return (
    <div className='flex flex-row gap-[18px] w-full'>
      <div className='flex flex-col flex-1 pl-[72px] pt-[36px] gap-[36px]'>
        <div className='text-[#1E3A8A] font-semibold text-xl'>
          Build your Resume
        </div>
        <div className='flex flex-col bg-white px-[48px] py-[36px] gap-[24px]  '>
          <div className='flex justify-center items-center'>
            <img src='/ExperienceStepThree.png' />
          </div>

          {experiences.length > 0 && (
            <div className='flex flex-col gap-[8px]'>
              <DisplayCard state={experiences} />
              <ExperienceInput
                topic='work'
                handleAddMore={handleAddMore}
                handleSaveChanges={handleSaveChanges}
              />
            </div>
          )}

          {projects.length > 0 && (
            <div className='flex flex-col gap-[8px]'>
              <DisplayCard state={projects} />
              <ExperienceInput
                topic='project'
                handleAddMore={handleAddMore}
                handleSaveChanges={handleSaveChanges}
              />
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col w-[30%] border sticky  right-0 top-0'>
        <div>Chatbot here</div>
      </div>
    </div>
  );
};

export default Experience;
