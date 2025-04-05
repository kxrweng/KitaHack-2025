import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useGlobalContext from '../../../hooks/useGlobalContext';

const Skills = () => {
  const navigate = useNavigate();
  const { user, setUser } = useGlobalContext();
  console.log(user);
  const [recommendedSkills, setRecommendedSkills] = useState([
    'Node.js',
    'Next.js',
    'React',
    'TailwindCSS',
  ]);

  const [addedSkills, setAddedSkills] = useState([]);

  const handleAddSkill = (skill) => {
    setAddedSkills((prev) => [...prev, skill]);
    setRecommendedSkills((prev) => {
      return prev.filter((recommendedSkill) => recommendedSkill !== skill);
    });
  };

  const handleDeleteSkill = (skill) => {
    setAddedSkills((prev) => prev.filter((skillName) => skillName !== skill));
    setRecommendedSkills((prev) => [...prev, skill]);
  };

  const handleNext = () => {
    setUser((prev) => {
      return { ...prev, skills: [...recommendedSkills] };
    });
    navigate('/auth_user/resume_builder/build/experience');
  };

  return (
    <div className='flex flex-row gap-[18px] w-full'>
      <div className='flex flex-col flex-1 pl-[72px] pt-[36px] gap-[36px]'>
        <div className='text-[#1E3A8A] font-semibold text-xl'>
          Build your Resume
        </div>
        <div className='flex flex-col bg-white px-[48px] py-[36px] gap-[24px]  '>
          <div className='flex justify-center items-center'>
            <img src='/SkillsStepTwo.png' />
          </div>
          <div className='flex flex-col gap-[16px] '>
            <div className='text-xl text-[#334155] font-medium'>
              Skills <span className='text-red-700 font-bold'>*</span>
            </div>
            <div className='flex flex-col gap-[16px]'>
              <div>
                <select
                  className='border border-[#CBD5E1] rounded-lg px-[16px] py-[12px]'
                  defaultValue={'default'}>
                  <option
                    selected
                    disabled
                    value='default'
                    hidden>
                    Search for skills in demand for your role
                  </option>
                  <option value='Figma'>Figma</option>
                  <option value='SpringBoot'>SpringBoot</option>
                </select>{' '}
              </div>
              {addedSkills.length > 0 &&
                addedSkills.map((skill, index) => (
                  <div className='flex flex-col'>
                    {/* Above is the container*/}
                    <div
                      key={index}
                      className={`flex flex-col py-[8px] px-[16px] rounded-xl ${
                        index % 2 === 0 ? 'bg-[#F1F5F9]' : 'bg-[#DBEAFE]'
                      }`}>
                      <div className='flex flex-row justify-between items-center'>
                        <div>{skill}</div>
                        <img
                          src='/DeleteIcon.png'
                          onClick={() => handleDeleteSkill(skill)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className='flex flex-col gap-[8px]'>
              <div className='text-xl text-[#334155]'>Recommended Skills</div>
              {recommendedSkills.map((skill, index) => (
                <div
                  className={`flex flex-row rounded-lg justify-between items-center py-[8px] px-[16px] ${
                    index % 2 === 0 ? 'bg-[#F1F5F9]' : 'bg-[#DBEAFE]'
                  }`}>
                  <div className='text-semibold'>{skill}</div>
                  <div
                    className='text-[#1D4ED8] text-lg font-semibold'
                    onClick={() => handleAddSkill(skill)}>
                    +
                  </div>
                </div>
              ))}
            </div>
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
                onClick={handleNext}>
                Next
              </div>{' '}
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-[30%] border sticky  right-0 top-0'>
        <div>Chatbot here</div>
      </div>
    </div>
  );
};

export default Skills;
