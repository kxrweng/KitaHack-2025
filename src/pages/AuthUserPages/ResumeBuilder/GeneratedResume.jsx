import React from 'react';
import { IoLink } from 'react-icons/io5';
import useGlobalContext from '../../../hooks/useGlobalContext';

const GeneratedResume = () => {
  const { user } = useGlobalContext();

  return (
    <div className='flex flex-col py-[64px] px-[48px] gap-[24px] bg-white max-w-screen'>
      <div className='flex flex-col gap-[12px]'>
        <div className='font-bold text-2xl'>{user.name}</div>
        <div className='font-semibold text-xl'>{`Aspring ${user.appliedRole}`}</div>
        <div className='flex flex-row flex-wrap gap-x-[24px] text-lg'>
          <div className='flex flex-row gap-[10px] items-center'>
            <img
              src='/EmailIcon.png'
              className='w-[20px] h-[16px]'
            />
            <div>{user.email}</div>
          </div>
          <div className='flex flex-row gap-[10px] items-center'>
            <img
              src='/PhoneIcon.png'
              className='w-[20px] h-[16px]'
            />
            <div>{user.phoneNumber}</div>
          </div>{' '}
          <div className='flex flex-row gap-[10px] items-center'>
            <IoLink />

            <div>{user.website}</div>
          </div>{' '}
        </div>

        <hr className='font-bold'></hr>
      </div>

      <div className='flex flex-col gap-[12px]'>
        <div className='font-bold text-2xl'>Objective</div>
        <div className='text-xl flex flex-wrap'>{user.introduction}</div>
      </div>

      <div className='flex flex-col gap-[12px]'>
        <div className='font-bold text-2xl'>Education</div>
        {/* <div className='text-xl'>
          B.Sc. in Computer Science, University of Somewhere (Graduated 2023)
        </div> */}
        {user.education.map((edu, index) => (
          <div
            key={index}
            className='flex flex-col'>
            <div className='font-semibold text-xl'>{edu.learningInstitute}</div>
            <div className='flex flex-row justify-between'>
              <div className='italic text-lg'>{`${edu.levelOfEducation} in Computer Science`}</div>
              <div className='italic text-lg'>{edu.yearOfCompletion}</div>
            </div>

            <div className='text-lg'>
              {' '}
              <span className='font-semibold'>CGPA : </span>
              {edu.results}
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-[16px]'>
        <div className='font-bold text-2xl'>Work Experience</div>
        {user.experiences.map((exp, index) => (
          <div
            key={index}
            className='flex flex-col gap-[4px]'>
            <div className='font-semibold text-xl'>{exp.role}</div>
            <div className='italic text-lg'>{`${exp.location}, ${exp.duration}`}</div>
            <div className='text-lg'>{exp.description}</div>
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-[16px]'>
        <div className='font-bold text-2xl'>Projects</div>
        {user.projects.map((exp, index) => (
          <div
            key={index}
            className='flex flex-col gap-[4px]'>
            <div className='font-semibold text-xl'>{exp.name}</div>
            <div className='italic text-lg'>
              {' '}
              <a className='underline text-blue-600'>{exp.link}</a>,{' '}
              {exp.duration}
            </div>
            <div className='text-lg'>{exp.description}</div>
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-[12px]'>
        <div className='font-bold text-2xl'>Skills</div>
        <div className='flex flex-col gap-2'>
          <ul className='list-disc list-inside'>
            {/* <li className='text-lg'>TypeScript</li> */}
            {user.skills.map((skill) => (
              <li className='text-lg'>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GeneratedResume;
