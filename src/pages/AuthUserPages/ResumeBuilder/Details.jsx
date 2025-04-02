import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';
import useGlobalContext from '../../../hooks/useGlobalContext';
const ResumeDetails = () => {
  const { user, setUser } = useGlobalContext();
  console.log(user);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '',
    currentRole: '',
    appliedRole: '',
    email: '',
    phoneNumber: '',
    website: '',
    introduction: '',
    education: [],
    skills: [],
  });

  const [tempEduInfo, setTempEduInfo] = useState({
    yearOfCompletion: '',
    levelOfEducation: '',
    learningInstitute: '',
    results: '',
  });

  const [showEducation, setShowEducation] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEduUuid, setCurrentEduUuid] = useState(null);
  const [addMore, setAddMore] = useState(false);

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEduChange = (e) => {
    setTempEduInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddMore = () => {
    setCurrentEduUuid(null);
    setTempEduInfo({
      yearOfCompletion: '',
      levelOfEducation: '',
      learningInstitute: '',
      results: '',
    });
    setAddMore(true);
  };

  const handleCancelAddMore = () => {
    setAddMore(false);
  };

  const enterEditMode = (uuid) => {
    console.log('Entering Edit Mode');
    const targettedEduExp = userInfo.education.find(
      (education) => education.id === uuid
    );
    setTempEduInfo((prev) => ({ ...prev, ...targettedEduExp }));
    setShowEducation(false);
    setEditMode(true);
    setCurrentEduUuid(uuid);
  };

  const saveEdittedCurrentEducationExperience = (uuid) => {
    setUserInfo((prev) => ({
      ...prev,
      education: prev.education.map((eduExp) => {
        if (eduExp.id === uuid) {
          return { ...eduExp, ...tempEduInfo };
        } else {
          return eduExp;
        }
      }),
    }));
    setEditMode(false);
    setShowEducation(true);
    setAddMore(false);
    setTempEduInfo({
      yearOfCompletion: '',
      levelOfEducation: '',
      learningInstitute: '',
      results: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !tempEduInfo.yearOfCompletion ||
      !tempEduInfo.learningInstitute ||
      !tempEduInfo.levelOfEducation
    ) {
      console.error('Incomplete Information!');
      return;
    }

    if (currentEduUuid) {
      saveEdittedCurrentEducationExperience(currentEduUuid);
    } else {
      const formattedTempEduInfo = { ...tempEduInfo, id: uuidv4() };
      if (userInfo.education.length === 0) {
        setUserInfo((prev) => ({ ...prev, education: [formattedTempEduInfo] }));
      } else {
        setUserInfo((prev) => ({
          ...prev,
          education: prev.education.concat(formattedTempEduInfo),
        }));
      }
      setTempEduInfo({
        yearOfCompletion: '',
        levelOfEducation: '',
        learningInstitute: '',
        results: '',
      });
      setShowEducation(true);
      setAddMore(false);
    }
  };

  const handleNext = () => {
    //map userInfo into user
    setUser(() => ({
      ...userInfo,
      education: [...userInfo.education],
      skills: [...userInfo.skills],
    }));
    navigate('/auth_user/resume_builder/build/skills');
  };

  return (
    <div className='flex flex-row gap-[18px] w-full'>
      <div className='flex flex-col flex-1 pl-[72px] pt-[36px] gap-[36px]'>
        <div className='text-[#1E3A8A] font-semibold text-xl'>
          Build your Resume
        </div>
        <div className='flex flex-col bg-white px-[48px] py-[36px] gap-[24px]  '>
          <div className='flex justify-center items-center'>
            <img src='/DetailsStepOne.png' />
          </div>

          <div className='flex flex-col gap-[8px] '>
            <div className='text-lg text-[#334155] font-semibold'>
              Basic Information{' '}
              <span className='text-red-700 font-bold'>*</span>
            </div>
            <div className='flex flex-col gap-[12px] '>
              <div className='flex flex-row  gap-[180px] '>
                <input
                  name='name'
                  placeholder='Name'
                  className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                  value={userInfo.name}
                  onChange={(e) => handleChange(e)}
                />
                <input
                  placeholder='Current Occupation'
                  name='currentRole'
                  className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                  value={userInfo.currentRole}
                  onChange={(e) => handleChange(e)}
                />{' '}
              </div>
              <div>
                <input
                  placeholder='Aspired Occupation'
                  className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                  name='appliedRole'
                  value={userInfo.appliedRole}
                  onChange={(e) => handleChange(e)}
                />{' '}
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-[8px] '>
            <div className='text-lg text-[#334155] font-semibold'>
              Contact Details <span className='text-red-700 font-bold'>*</span>
            </div>
            <div className='flex flex-col gap-[12px] '>
              <div className='flex flex-row  gap-[180px] '>
                <input
                  placeholder='Email'
                  className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                  name='email'
                  value={userInfo.email}
                  onChange={(e) => handleChange(e)}
                />
                <input
                  placeholder='Phone Number'
                  className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                  name='phoneNumber'
                  value={userInfo.phoneNumber}
                  onChange={(e) => handleChange(e)}
                />{' '}
              </div>
              <div>
                <input
                  placeholder='Website / LinkedIn URL'
                  className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                  name='website'
                  value={userInfo.website}
                  onChange={(e) => handleChange(e)}
                />{' '}
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-[8px] '>
            <div className='text-lg text-[#334155] font-semibold'>
              Objective <span className='text-red-700 font-bold'>*</span>
            </div>
            <input
              placeholder='Objective'
              className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
              name='objective'
              value={userInfo.objective}
              onChange={(e) => handleChange(e)}
            />{' '}
          </div>

          <div className='flex flex-col gap-[8px] '>
            <div className='text-lg text-[#334155] font-semibold'>
              Education <span className='text-red-700 font-bold'>*</span>
            </div>
            {!showEducation && !editMode && (
              <div className='flex flex-row gap-[32px]'>
                <div className='flex flex-col gap-[4px]'>
                  <label htmlFor='yearOfCompletion'>Year of Completion</label>
                  <input
                    placeholder='Year'
                    id='yearOfCompletion'
                    className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                    name='yearOfCompletion'
                    value={tempEduInfo.yearOfCompletion}
                    onChange={(e) => handleEduChange(e)}
                  />{' '}
                </div>
                <div className='flex flex-col gap-[4px]'>
                  <label htmlFor='levelOfEducation'>Level of Education</label>
                  <input
                    placeholder='Level'
                    id='levelOfEducation'
                    className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                    name='levelOfEducation'
                    value={tempEduInfo.levelOfEducation}
                    onChange={(e) => handleEduChange(e)}
                  />{' '}
                </div>
                <div className='flex flex-col gap-[4px] basis-[30%]'>
                  <label htmlFor='learningInstitute'>Learning Institute</label>
                  <input
                    placeholder='Institution Name'
                    id='learningInstitute'
                    className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                    name='learningInstitute'
                    value={tempEduInfo.learningInstitute}
                    onChange={(e) => handleEduChange(e)}
                  />{' '}
                </div>
                <div className='flex flex-col gap-[4px]'>
                  <label htmlFor='results'>Results</label>
                  <div className='flex flex-row items-center gap-[32px]'>
                    <input
                      placeholder='CGPA'
                      id='results'
                      className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                      name='results'
                      value={tempEduInfo.results}
                      onChange={(e) => handleEduChange(e)}
                    />{' '}
                  </div>
                </div>
              </div>
            )}

            <div className='flex flex-col'>
              {/* Below is showing actual education experience*/}
              {showEducation && userInfo.education.length > 0 && !editMode && (
                <div className='flex flex-col gap-[4px]'>
                  <div className='grid grid-cols-12'>
                    <div
                      className={`  
                             col-span-2
                          `}>
                      Year of Completion
                    </div>
                    <div
                      className={`  
                             col-span-2
                          `}>
                      Level of Education
                    </div>
                    <div className={`col-span-4`}>Learning Institute</div>
                    <div className={`col-span-2`}>Results</div>
                    <div className={`col-span-2`}>Actions</div>
                  </div>
                  {userInfo.education.map((education, index) => (
                    <div
                      className={`grid grid-cols-12 ${
                        index % 2 === 0 ? 'bg-[#F1F5F9]' : 'bg-[#DBEAFE]'
                      }`}
                      key={index}>
                      <div
                        className={`  px-[4px] py-[12px]  
                             col-span-2 
                          }`}>
                        {education.yearOfCompletion}
                      </div>
                      <div
                        className={` px-[4px] py-[12px] 
                            col-span-2 
                          }`}>
                        {education.levelOfEducation}
                      </div>
                      <div className={`  px-[4px] py-[12px] col-span-4`}>
                        {education.learningInstitute}
                      </div>
                      <div className={`  px-[4px] py-[12px] col-span-2`}>
                        {education.results}
                      </div>
                      <div
                        className={`items-center gap-[24px] col-span-2 flex flex-row`}>
                        <img
                          src='/EditIcon.png'
                          className='w-[20px] h-[20px]'
                          onClick={() => enterEditMode(education.id)}
                        />
                        <img
                          src='/DeleteIcon.png'
                          className='w-[20px] h-[20px]'
                        />
                      </div>
                      {/* )} */}
                    </div>
                  ))}
                </div>
              )}
              {/* Below is showing input fields with pre-existing education exp*/}
              {!showEducation && userInfo.education.length > 0 && editMode && (
                <div className='flex flex-row gap-[32px]'>
                  <div className='flex flex-col gap-[4px]'>
                    <label htmlFor='yearOfCompletion'>Year of Completion</label>
                    <input
                      id='yearOfCompletion'
                      className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                      name='yearOfCompletion'
                      value={tempEduInfo.yearOfCompletion}
                      onChange={(e) => handleEduChange(e)}
                    />{' '}
                  </div>
                  <div className='flex flex-col gap-[4px]'>
                    <label htmlFor='levelOfEducation'>Level of Education</label>
                    <input
                      id='levelOfEducation'
                      className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                      name='levelOfEducation'
                      value={tempEduInfo.levelOfEducation}
                      onChange={(e) => handleEduChange(e)}
                    />{' '}
                  </div>
                  <div className='flex flex-col gap-[4px] basis-[30%]'>
                    <label htmlFor='learningInstitute'>
                      Learning Institute
                    </label>
                    <input
                      id='learningInstitute'
                      className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                      name='learningInstitute'
                      value={tempEduInfo.learningInstitute}
                      onChange={(e) => handleEduChange(e)}
                    />{' '}
                  </div>
                  <div className='flex flex-col gap-[4px]'>
                    <label htmlFor='results'>Results</label>
                    <div className='flex flex-row items-center gap-[32px]'>
                      <input
                        id='results'
                        className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                        name='results'
                        value={tempEduInfo.results}
                        onChange={(e) => handleEduChange(e)}
                      />{' '}
                    </div>
                  </div>
                </div>
              )}

              {addMore && (
                <div className='flex flex-row gap-[32px]'>
                  <div className='flex flex-col gap-[4px]'>
                    <label htmlFor='yearOfCompletion'>Year of Completion</label>
                    <input
                      placeholder='Year'
                      id='yearOfCompletion'
                      className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                      name='yearOfCompletion'
                      value={tempEduInfo.yearOfCompletion}
                      onChange={(e) => handleEduChange(e)}
                    />{' '}
                  </div>
                  <div className='flex flex-col gap-[4px]'>
                    <label htmlFor='levelOfEducation'>Level of Education</label>
                    <input
                      placeholder='Level'
                      id='levelOfEducation'
                      className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                      name='levelOfEducation'
                      value={tempEduInfo.levelOfEducation}
                      onChange={(e) => handleEduChange(e)}
                    />{' '}
                  </div>
                  <div className='flex flex-col gap-[4px] basis-[30%]'>
                    <label htmlFor='learningInstitute'>
                      Learning Institute
                    </label>
                    <input
                      placeholder='Institution Name'
                      id='learningInstitute'
                      className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                      name='learningInstitute'
                      value={tempEduInfo.learningInstitute}
                      onChange={(e) => handleEduChange(e)}
                    />{' '}
                  </div>
                  <div className='flex flex-col gap-[4px]'>
                    <label htmlFor='results'>Results</label>
                    <div className='flex flex-row items-center gap-[32px]'>
                      <input
                        placeholder='CGPA'
                        id='results'
                        className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                        name='results'
                        value={tempEduInfo.results}
                        onChange={(e) => handleEduChange(e)}
                      />{' '}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='flex flex-row gap-[10px] justify-end'>
            <div
              className='border-[#1E3A8A] border rounded-lg px-[20px] py-[10px] text-[#1E3A8A] hover:cursor-pointer'
              onClick={addMore ? handleCancelAddMore : handleAddMore}>
              {addMore ? 'Cancel' : 'Add More'}
            </div>
            <div
              className=' border rounded-lg px-[20px] py-[10px] bg-[#1D4ED8] text-white hover:cursor-pointer'
              onClick={(e) => handleSubmit(e)}>
              Save Changes
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

export default ResumeDetails;
