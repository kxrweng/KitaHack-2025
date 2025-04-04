import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import DisplayCard from '../../../components/AuthUserComponents/ResumeBuilder/DisplayCard';
import useGlobalContext from '../../../hooks/useGlobalContext';
import { v4 as uuidv4 } from 'uuid';
const Experience = () => {
  const { user, setUser } = useGlobalContext();
  const navigate = useNavigate();
  // const [showExperiences, setShowExperiences] = useState(false);
  // const [expEditMode, setExpEditMode] = useState(false);
  // const [showProjects, setShowProjects] = useState(false);
  // const [projectsEditMode, setProjectsEditMode] = useState(false);
  // const [currentExpUuid, setCurrentExpUuid] = useState(null);
  // const [currentProjectUuid, setCurrentProjectUuid] = useState(null);
  // const [addMoreExp, setAddMoreExp] = useState(false);
  // const [addMoreProjects, setAddMoreProjects] = useState(false);
  const [tempExp, setTempExp] = useState({
    role: '',
    location: '',
    duration: '',
    description: '',
  });

  const [editMode, setEditMode] = useState(true); //This is the input field status
  const [currentExpUuid, setCurrentExpUuid] = useState(null);
  const handleExpChange = (e) =>
    setTempExp((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  console.log(tempExp);
  console.log(user);
  console.log(editMode);
  console.log(currentExpUuid);

  const handleGenerateResume = () => {
    console.log('HandleGenerateResume clicked!');
  };

  //For Editting Experiences, where it is in an input state
  const handleSaveExpChanges = (e) => {
    e.preventDefault();
    console.log('Saving changed experience');
    setUser((currentUser) => {
      return {
        ...currentUser,
        experiences: currentUser.experiences.map((exp) =>
          exp.id === currentExpUuid ? tempExp : exp
        ),
      };
    });
    setEditMode(false);
    setCurrentExpUuid(null);
    setTempExp({ role: '', location: '', description: '', duration: '' });
  };

  //For editting experiences, where it is in an input state
  const handleCancelChanges = () => {
    setEditMode(false);
    setCurrentExpUuid(null);
    setTempExp({ role: '', location: '', description: '', duration: '' });
  };

  //For editting experiences, where it is in an input state
  const handleEditExp = (uuid) => {
    console.log('handleEditExp is running');
    /* 
    Find the targetted experience in user.experiences
    Switch to input fields mode 
    Copy everything from targettedExp to tempExp
    After done editting, update in user as well
    */
    const targettedExp = user.experiences.find((exp) => exp.id === uuid);
    if (!targettedExp) {
      console.error('Experience not found!');
      return;
    }
    setEditMode(true);
    setCurrentExpUuid(uuid);
    setTempExp({ ...targettedExp });
  };

  //For when it is just displaying cards, then clicking add more, should make editMode === true
  const handleAddMore = () => {
    setEditMode(true);
  };

  //For adding new experiences
  const handleExpSubmit = (e) => {
    console.log('A new experience is submitted!');
    //Only for new entries
    //Copy the current tempExp into user.experiences.
    //If user.experiences.length === 0, put as new entry
    //else add it to existing
    //Reset tempExp
    //Check fields are not empty too

    e.preventDefault();
    if (
      !tempExp.role ||
      !tempExp.description ||
      !tempExp.duration ||
      !tempExp.location
    ) {
      console.error('Incomplete Experience Information!');
      return;
    }

    const formattedExp = { id: uuidv4(), ...tempExp };
    if (user.experiences.length === 0) {
      setUser((currentUser) => ({
        ...currentUser,
        experiences: [formattedExp],
      }));
    } else {
      setUser((currentUser) => ({
        ...currentUser,
        experiences: [...currentUser.experiences, formattedExp],
      }));
    }
    setTempExp({ role: '', location: '', description: '', duration: '' });
    setEditMode(false);
  };

  const handleDelete = (uuid) => {
    const targettedExp = user.experiences.find((exp) => exp.id === uuid);
    if (targettedExp) {
      setUser((currentUser) => ({
        ...currentUser,
        experiences: currentUser.experiences.filter((exp) => exp.id !== uuid),
      }));
    } else {
      console.error('Experience not found!');
    }
    if (user.experiences.length === 1) {
      setEditMode(true);
    }
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

          <div className='text-xl text-[#334155] font-semibold'>
            Work Experience
          </div>

          {/* When there's no past experiences (user.workExperience.length === 0 && !editMode)
              show input fields only*/}
          {user.experiences.length === 0 && !currentExpUuid && editMode && (
            <div className='flex flex-col gap-[12px]'>
              <div>
                <input
                  id='role'
                  placeholder={'Your Role'}
                  value={tempExp.role}
                  onChange={(e) => handleExpChange(e)}
                  className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                />
              </div>
              <div className='flex flex-row w-full gap-[150px]'>
                <div>
                  <input
                    id='location'
                    placeholder='Your Work Location'
                    value={tempExp.location}
                    onChange={(e) => handleExpChange(e)}
                    className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                  />
                </div>

                <div>
                  <input
                    placeholder='Your Work Duration'
                    id='duration'
                    value={tempExp.duration}
                    onChange={(e) => handleExpChange(e)}
                    className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                  />
                </div>
              </div>
              <div>
                <input
                  id='description'
                  placeholder='Your Work Description'
                  value={tempExp.description}
                  onChange={(e) => handleExpChange(e)}
                  className='w-full py-[12px] px-[16px] border-slate-300 rounded-xl border'
                />
              </div>
              <div className='py-[12px]'>
                <div className='flex flex-row justify-end gap-[10px]'>
                  <div
                    className='py-[12px] px-[24px] rounded-xl bg-[#1D4ED8] text-white'
                    onClick={(e) => handleExpSubmit(e)}>
                    Save Changes
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* When there's past experiences (user.workExperience.length > 0) && !editMode
            display experience + show input fields
          */}

          {user.experiences.length > 0 && !editMode && !currentExpUuid && (
            <div className='flex flex-col gap-[12px]'>
              {user.experiences.map((state, index) => (
                <div
                  key={index}
                  className={`py-[16px] px-[24px] flex flex-col gap-[16px] rounded-lg ${
                    index % 2 === 0 ? 'bg-[#F1F5F9]' : 'bg-[#DBEAFE]'
                  }`}>
                  <div className='font-semibold text-xl flex flex-row justify-between text-black'>
                    {state.link && (
                      <a
                        className='no-underline hover:cursor-pointer'
                        target='_blank'
                        href={state.link}>
                        {state.name}
                      </a>
                    )}
                    <div>{!state.link && (state.role || state.name)} </div>
                    <div
                      className={`items-center gap-[24px] col-span-2 flex flex-row`}>
                      <img
                        src='/EditIcon.png'
                        className='w-[20px] h-[20px]'
                        onClick={() => handleEditExp(state.id)}
                      />
                      <img
                        src='/DeleteIcon.png'
                        className='w-[20px] h-[20px]'
                        onClick={() => handleDelete(state.id)}
                      />
                    </div>
                  </div>

                  <div className='font-medium text-lg text-black'>
                    {state.location
                      ? `${state.location}, ${state.duration}`
                      : `${state.duration}`}
                  </div>
                  <ul className='text-md text-black list-disc list-inside'>
                    {state.description && (
                      <div className='font-medium text-lg text-black'>
                        {state.description}
                      </div>
                    )}
                  </ul>
                </div>
              ))}
              <div className='py-[12px]'>
                <div className='flex flex-row justify-end gap-[10px]'>
                  <div
                    className='border border-[#1E3A8A] text-[#1E3A8A] rounded-xl py-[12px] px-[24px]'
                    onClick={handleAddMore}>
                    Add More
                  </div>
                  {/* <div
                    className='py-[12px] px-[24px] rounded-xl bg-[#1D4ED8] text-white'
                    onClick={(e) => handleExpSubmit(e)}>
                    Save Changes
                  </div> */}
                </div>
              </div>
            </div>
          )}

          {/* When there's experiences, and in editMode, 
              Others remain to be in card display, currently targetted ones in input
          */}
          {user.experiences.length > 0 &&
            editMode &&
            currentExpUuid &&
            user.experiences.map((exp, index) =>
              exp.id === currentExpUuid ? (
                <div className='flex flex-col gap-[12px]'>
                  <div>
                    <input
                      id='role'
                      placeholder={'Your Role'}
                      value={tempExp.role}
                      onChange={(e) => handleExpChange(e)}
                      className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                    />
                  </div>
                  <div className='flex flex-row w-full gap-[150px]'>
                    <div>
                      <input
                        id='location'
                        placeholder='Your Work Location'
                        value={tempExp.location}
                        onChange={(e) => handleExpChange(e)}
                        className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                      />
                    </div>

                    <div>
                      <input
                        placeholder='Your Work Duration'
                        id='duration'
                        value={tempExp.duration}
                        onChange={(e) => handleExpChange(e)}
                        className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      id='description'
                      placeholder='Your Work Description'
                      value={tempExp.description}
                      onChange={(e) => handleExpChange(e)}
                      className='w-full py-[12px] px-[16px] border-slate-300 rounded-xl border'
                    />
                  </div>
                  <div className='py-[12px]'>
                    <div className='flex flex-row justify-end gap-[10px]'>
                      <div
                        className='border border-[#1E3A8A] text-[#1E3A8A] rounded-xl py-[12px] px-[24px]'
                        onClick={handleCancelChanges}>
                        Cancel
                      </div>
                      <div
                        className='py-[12px] px-[24px] rounded-xl bg-[#1D4ED8] text-white'
                        onClick={(e) => handleSaveExpChanges(e)}>
                        Save Changes
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='flex flex-col gap-[12px]'>
                  <div
                    key={index}
                    className={`py-[16px] px-[24px] flex flex-col gap-[16px] rounded-lg ${
                      index % 2 === 0 ? 'bg-[#F1F5F9]' : 'bg-[#DBEAFE]'
                    }`}>
                    <div className='font-semibold text-xl flex flex-row justify-between text-black'>
                      {exp.link && (
                        <a
                          className='no-underline hover:cursor-pointer'
                          target='_blank'
                          href={exp.link}>
                          {exp.name}
                        </a>
                      )}
                      <div>{!exp.link && (exp.role || exp.name)} </div>
                      {/* <div
                        className={`items-center gap-[24px] col-span-2 flex flex-row`}>
                        <img
                          src='/EditIcon.png'
                          className='w-[20px] h-[20px]'
                          onClick={() => console.log('Hi')}
                        />
                        <img
                          src='/DeleteIcon.png'
                          className='w-[20px] h-[20px]'
                        />
                      </div> */}
                    </div>

                    <div className='font-medium text-lg text-black'>
                      {exp.location
                        ? `${exp.location}, ${exp.duration}`
                        : `${exp.duration}`}
                    </div>
                    <ul className='text-md text-black list-disc list-inside'>
                      {exp.description && (
                        <div className='font-medium text-lg text-black'>
                          {exp.description}
                        </div>
                      )}
                    </ul>
                  </div>
                </div>
              )
            )}

          {/* When user.experiences.length > 0, experiences are displayed, and add more is clicked*/}
          {user.experiences.length > 0 && editMode && !currentExpUuid && (
            <div className='flex flex-col gap-[12px]'>
              {user.experiences.map((state, index) => (
                <div
                  key={index}
                  className={`py-[16px] px-[24px] flex flex-col gap-[16px] rounded-lg ${
                    index % 2 === 0 ? 'bg-[#F1F5F9]' : 'bg-[#DBEAFE]'
                  }`}>
                  <div className='font-semibold text-xl flex flex-row justify-between text-black'>
                    {state.link && (
                      <a
                        className='no-underline hover:cursor-pointer'
                        target='_blank'
                        href={state.link}>
                        {state.name}
                      </a>
                    )}
                    <div>{!state.link && (state.role || state.name)} </div>
                    <div
                      className={`items-center gap-[24px] col-span-2 flex flex-row`}>
                      <img
                        src='/EditIcon.png'
                        className='w-[20px] h-[20px]'
                        onClick={() => handleEditExp(state.id)}
                      />
                      <img
                        src='/DeleteIcon.png'
                        className='w-[20px] h-[20px]'
                      />
                    </div>
                  </div>

                  <div className='font-medium text-lg text-black'>
                    {state.location
                      ? `${state.location}, ${state.duration}`
                      : `${state.duration}`}
                  </div>
                  <ul className='text-md text-black list-disc list-inside'>
                    {state.description && (
                      <div className='font-medium text-lg text-black'>
                        {state.description}
                      </div>
                    )}
                  </ul>
                </div>
              ))}

              {/* <div className='py-[12px]'>
                  <div className='flex flex-row justify-end gap-[10px]'>
                    <div className='border border-[#1E3A8A] text-[#1E3A8A] rounded-xl py-[12px] px-[24px]'>
                      Add More
                    </div>
                    <div
                      className='py-[12px] px-[24px] rounded-xl bg-[#1D4ED8] text-white'
                      onClick={(e) => handleExpSubmit(e)}>
                      Save Changes
                    </div>
                  </div>
                </div> */}

              <div className='flex flex-col gap-[12px]'>
                <div>
                  <input
                    id='role'
                    placeholder={'Your Role'}
                    value={tempExp.role}
                    onChange={(e) => handleExpChange(e)}
                    className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                  />
                </div>
                <div className='flex flex-row w-full gap-[150px]'>
                  <div>
                    <input
                      id='location'
                      placeholder='Your Work Location'
                      value={tempExp.location}
                      onChange={(e) => handleExpChange(e)}
                      className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                    />
                  </div>

                  <div>
                    <input
                      placeholder='Your Work Duration'
                      id='duration'
                      value={tempExp.duration}
                      onChange={(e) => handleExpChange(e)}
                      className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                    />
                  </div>
                </div>
                <div>
                  <input
                    id='description'
                    placeholder='Your Work Description'
                    value={tempExp.description}
                    onChange={(e) => handleExpChange(e)}
                    className='w-full py-[12px] px-[16px] border-slate-300 rounded-xl border'
                  />
                </div>
                <div className='py-[12px]'>
                  <div className='flex flex-row justify-end gap-[10px]'>
                    <div
                      className='border border-[#1E3A8A] text-[#1E3A8A] rounded-xl py-[12px] px-[24px]'
                      onClick={handleCancelChanges}>
                      Cancel
                    </div>
                    <div
                      className='py-[12px] px-[24px] rounded-xl bg-[#1D4ED8] text-white'
                      onClick={(e) => handleExpSubmit(e)}>
                      Save Changes
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
