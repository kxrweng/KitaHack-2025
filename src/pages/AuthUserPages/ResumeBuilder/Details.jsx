import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';
import useGlobalContext from '../../../hooks/useGlobalContext';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

const ResumeDetails = () => {
  const { user, setUser } = useGlobalContext();
  console.log(user);
  const navigate = useNavigate();

  const [tempEduInfo, setTempEduInfo] = useState({
    yearOfCompletion: '',
    levelOfEducation: '',
    learningInstitute: '',
    results: '',
  });

  const [showFeedback, setShowFeedback] = useState(true);
  const [editMode, setEditMode] = useState(user.education.length === 0); //set to indicate display of input fields
  const [currentEduUuid, setCurrentEduUuid] = useState(null);
  const introRef = useRef(null);
  const stringifiedDetailsChatHistory =
    localStorage.getItem('detailsChatHistory');
  console.log(stringifiedDetailsChatHistory);
  const [conversation, setConversation] = useState(
    stringifiedDetailsChatHistory
      ? JSON.parse(stringifiedDetailsChatHistory)
      : []
  );
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-1.5-flash-8b',
    history: conversation,
    config: {
      maxOutputTokens: 100,
      candidateCount: 1,
      temperature: 0.5,
      systemInstruction: `Try not to give too long response. Provide response with one point on its issue, one way of fixing it, and one example of a better introduction. Only one for each. `,
    },
  });

  useEffect(() => {
    console.log('Conversation updated:', conversation);
  }, [conversation]);

  // console.log(addMore);
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getResponse = async (introduction) => {
    console.log('getResponse is called');
    const message = `Comment on the brief introduction section of my resume. This is the introduction : ${introduction}.`;
    console.log(message);
    const response = await chat.sendMessage({ message });
    console.log(response);
    return response;
  };

  console.log(conversation);

  const handleGetFeedback = async () => {
    const latestIntro = introRef.current?.value?.trim() ?? '';

    if (!latestIntro) {
      console.log('Introduction is empty. Skipping feedback request.');
      return;
    }

    setShowFeedback(true);

    try {
      await getResponse(latestIntro);
      const parsedConversation = JSON.stringify(conversation);
      console.log(parsedConversation);
      setConversation([...JSON.parse(parsedConversation)]);
      localStorage.setItem('detailsChatHistory', parsedConversation);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (uuid) => {
    const targettedEdu = user.education.find((edu) => edu.id === uuid);
    if (targettedEdu) {
      setUser((currentUser) => ({
        ...currentUser,
        education: currentUser.education.filter((edu) => edu.id !== uuid),
      }));
    } else {
      console.error('Education not found!');
    }
    if (user.experiences.length === 1) {
      setEditMode(true);
    }
  };
  const handleEduChange = (e) => {
    setTempEduInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddMore = () => {
    setEditMode(true);
  };

  const handleEditEdu = (uuid) => {
    console.log('handleEditEdu is running');
    const targettedEdu = user.education.find((edu) => edu.id === uuid);
    if (!targettedEdu) {
      console.error('Education not found!');
      return;
    }
    setEditMode(true);
    setCurrentEduUuid(uuid);
    setTempEduInfo({ ...targettedEdu });
  };

  const handleCancelChange = () => {
    setEditMode(false);
    setCurrentEduUuid(null);
    setTempEduInfo({
      yearOfCompletion: '',
      levelOfEducation: '',
      learningInstitute: '',
      results: '',
    });
  };
  const handleSaveEduChanges = (e) => {
    e.preventDefault();
    console.log('Saving changed education');
    setUser((currentUser) => ({
      ...currentUser,
      education: currentUser.education.map((edu) =>
        edu.id === currentEduUuid ? tempEduInfo : edu
      ),
    }));
    setEditMode(false);
    setCurrentEduUuid(null);
    setTempEduInfo({
      yearOfCompletion: '',
      levelOfEducation: '',
      learningInstitute: '',
      results: '',
    });
  };
  //in edit mode, fresh start, users.education.length === 0
  const handleAddEducation = (e) => {
    e.preventDefault();
    if (
      !tempEduInfo.yearOfCompletion ||
      !tempEduInfo.learningInstitute ||
      !tempEduInfo.levelOfEducation ||
      !tempEduInfo.results
    ) {
      console.error('Incomplete education information!');
      return;
    }
    const formattedTempEduInfo = { ...tempEduInfo, id: uuidv4() };
    if (user.education.length === 0) {
      setUser((currentUser) => ({
        ...currentUser,
        education: [formattedTempEduInfo],
      }));
    } else {
      setUser((currentUser) => ({
        ...currentUser,
        education: currentUser.education.concat(formattedTempEduInfo),
      }));
    }
    setTempEduInfo({
      yearOfCompletion: '',
      levelOfEducation: '',
      learningInstitute: '',
      results: '',
    });
    setEditMode(false);
  };

  const handleNext = () => {
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
                  value={user.name}
                  onChange={(e) => handleChange(e)}
                />
                <input
                  placeholder='Current Occupation'
                  name='currentRole'
                  className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                  value={user.currentRole}
                  onChange={(e) => handleChange(e)}
                />{' '}
              </div>
              <div>
                <input
                  placeholder='Aspired Occupation'
                  className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                  name='appliedRole'
                  value={user.appliedRole}
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
                  value={user.email}
                  onChange={(e) => handleChange(e)}
                />
                <input
                  placeholder='Phone Number'
                  className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                  name='phoneNumber'
                  value={user.phoneNumber}
                  onChange={(e) => handleChange(e)}
                />{' '}
              </div>
              <div>
                <input
                  placeholder='Website / LinkedIn URL'
                  className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
                  name='website'
                  value={user.website}
                  onChange={(e) => handleChange(e)}
                />{' '}
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-[8px] '>
            <div className='text-lg text-[#334155] font-semibold'>
              Brief Introduction{' '}
              <span className='text-red-700 font-bold'>*</span>
            </div>
            <input
              placeholder='Brief Introduction'
              className='px-[16px] py-[12px] rounded-xl border-[#CBD5E1] border text-black'
              name='introduction'
              ref={introRef}
              value={user.introduction}
              onChange={(e) => handleChange(e)}
            />{' '}
          </div>

          <div className='text-lg text-[#334155] font-semibold'>
            Education <span className='text-red-700 font-bold'>*</span>
          </div>

          {/* When there's no past education (user.education.length === 0 && !editMode) */}
          {user.education.length === 0 && !currentEduUuid && editMode && (
            <div className='flex flex-col gap-[8px] '>
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
              <div className='flex flex-col gap-[8px]'>
                <div className='flex flex-col gap-[12px]'></div>{' '}
                <div className='flex flex-row gap-[10px] justify-end'>
                  <div
                    className=' border rounded-lg px-[20px] py-[10px] bg-[#1D4ED8] text-white hover:cursor-pointer'
                    onClick={(e) => handleAddEducation(e)}>
                    Save Changes
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* When there's past education(user.education.length > 0) && !editMode
            display experience + show input fields
          */}
          {user.education.length > 0 && !editMode && !currentEduUuid && (
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
              {user.education.map((education, index) => (
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
                      onClick={() => handleEditEdu(education.id)}
                    />
                    <img
                      src='/DeleteIcon.png'
                      className='w-[20px] h-[20px]'
                      onClick={() => handleDelete(education.id)}
                    />
                  </div>
                  {/* )} */}
                </div>
              ))}
              <div className='flex flex-col gap-[8px]'>
                <div className='flex flex-col gap-[12px]'></div>{' '}
                <div className='flex flex-row gap-[10px] justify-end'>
                  <div
                    onClick={handleAddMore}
                    className='border-[#1E3A8A] border rounded-lg px-[20px] py-[10px] text-[#1E3A8A] hover:cursor-pointer'>
                    Add More
                  </div>
                  {/* <div className=' border rounded-lg px-[20px] py-[10px] bg-[#1D4ED8] text-white hover:cursor-pointer'>
                    Save Changes
                  </div> */}
                </div>
              </div>
            </div>
          )}

          {/* When there's experiences, and in editMode, 
              Others remain to be in card display, currently targetted ones in input
          */}
          {user.education.length > 0 &&
            editMode &&
            currentEduUuid &&
            user.education.map((edu, index) =>
              edu.id === currentEduUuid ? (
                <div className='flex flex-col gap-[8px] '>
                  <div className='flex flex-row gap-[32px]'>
                    <div className='flex flex-col gap-[4px]'>
                      <label htmlFor='yearOfCompletion'>
                        Year of Completion
                      </label>
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
                      <label htmlFor='levelOfEducation'>
                        Level of Education
                      </label>
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
                  <div className='flex flex-col gap-[8px]'>
                    <div className='flex flex-col gap-[12px]'></div>{' '}
                    <div className='flex flex-row gap-[10px] justify-end'>
                      <div
                        onClick={handleCancelChange}
                        className='border-[#1E3A8A] border rounded-lg px-[20px] py-[10px] text-[#1E3A8A] hover:cursor-pointer'>
                        Cancel
                      </div>
                      <div
                        onClick={(e) => handleSaveEduChanges(e)}
                        className=' border rounded-lg px-[20px] py-[10px] bg-[#1D4ED8] text-white hover:cursor-pointer'>
                        Save Changes
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
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
                  <div
                    className={`grid grid-cols-12 ${
                      index % 2 === 0 ? 'bg-[#F1F5F9]' : 'bg-[#DBEAFE]'
                    }`}
                    key={index}>
                    <div
                      className={`  px-[4px] py-[12px]  
                             col-span-2 
                          }`}>
                      {edu.yearOfCompletion}
                    </div>
                    <div
                      className={` px-[4px] py-[12px] 
                            col-span-2 
                          }`}>
                      {edu.levelOfEducation}
                    </div>
                    <div className={`  px-[4px] py-[12px] col-span-4`}>
                      {edu.learningInstitute}
                    </div>
                    <div className={`  px-[4px] py-[12px] col-span-2`}>
                      {edu.results}
                    </div>
                  </div>
                </div>
              )
            )}

          {/* When user.education.length > 0, education are displayed, and add more is clicked*/}
          {user.education.length > 0 && editMode && !currentEduUuid && (
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
              {user.education.map((education, index) => (
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
                    />
                    <img
                      src='/DeleteIcon.png'
                      className='w-[20px] h-[20px]'
                    />
                  </div>
                  {/* )} */}
                </div>
              ))}
              <div className='flex flex-row gap-[32px]'>
                <div className='flex flex-col gap-[4px]'>
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
              <div className='flex flex-col gap-[8px]'>
                <div className='flex flex-col gap-[12px]'></div>{' '}
                <div className='flex flex-row gap-[10px] justify-end'>
                  <div
                    onClick={handleCancelChange}
                    className='border-[#1E3A8A] border rounded-lg px-[20px] py-[10px] text-[#1E3A8A] hover:cursor-pointer'>
                    Cancel
                  </div>
                  <div
                    onClick={(e) => handleAddEducation(e)}
                    className=' border rounded-lg px-[20px] py-[10px] bg-[#1D4ED8] text-white hover:cursor-pointer'>
                    Save Changes
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className='flex flex-row justify-between'>
            <div
              className='border-[#1E3A8A] border rounded-lg px-[24px] py-[12px] text-[#1E3A8A] text-xl hover:cursor-pointer'
              onClick={() => navigate(-1)}>
              Previous
            </div>{' '}
            <div className='flex flex-row gap-[10px]'>
              <div
                onClick={handleGetFeedback}
                className='border-[#1E3A8A] border rounded-lg px-[24px] py-[12px] text-[#1E3A8A] text-xl hover:cursor-pointer'>
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

      <div className='flex flex-col w-[30%]  sticky  right-0 top-0'>
        <div className='flex flex-row gap-[10px] p-[16px] items-center border-b-1 bg-white border-slate-300 justify-between sticky top-0'>
          <div className='font-semibold text-xl flex items-center justify-center text-[#1E3A8A]'>
            Feedback From Miles
          </div>
          {/* <div
                      className='text-xl font-semibold cursor-pointer'
                      onClick={toggleHideChatContainer}>
                      X
                    </div> */}
        </div>

        {/* Chat Messages (Scrollable) */}
        <div className='bg-[#DBEAFE] flex flex-col py-[24px] px-[12px] gap-[12px] flex-1 overflow-auto'>
          <div
            className={`flex flex-col gap-[4px] ${
              showFeedback ? 'hidden' : ''
            }`}>
            Receive feedback for your input here when you press the Get Feedback
            button.
          </div>
          {showFeedback &&
            conversation.length > 0 &&
            conversation.map(
              (chat, index) =>
                chat.role === 'model' && (
                  <div
                    key={index}
                    className='flex flex-col gap-[4px]'>
                    <div className='text-[#64748B] mr-auto font-semibold'>
                      Miles 🤖
                    </div>
                    <div className='bg-white rounded-xl px-[12px] py-[16px]'>
                      <Markdown>{chat.parts[0].text}</Markdown>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default ResumeDetails;
