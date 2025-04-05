import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import DisplayCard from '../../../components/AuthUserComponents/ResumeBuilder/DisplayCard';
import useGlobalContext from '../../../hooks/useGlobalContext';
import { v4 as uuidv4 } from 'uuid';
const Experience = () => {
  const { user, setUser } = useGlobalContext();
  const navigate = useNavigate();

  const [tempExp, setTempExp] = useState({
    role: '',
    location: '',
    duration: '',
    description: '',
  });

  const [tempProject, setTempProject] = useState({
    name: '',
    link: '',
    duration: '',
    description: '',
  });

  const [expEditMode, setExpEditMode] = useState(true); //This is the input field status
  const [projectEditMode, setProjectEditMode] = useState(true);
  const [currentExpUuid, setCurrentExpUuid] = useState(null);
  const [currentProjectUuid, setCurrentProjectUuid] = useState(null);
  const handleExpChange = (e) =>
    setTempExp((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  console.log(currentProjectUuid);
  console.log(projectEditMode);
  const handleProjectChange = (e) =>
    setTempProject((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleGenerateResume = () => {
    console.log('HandleGenerateResume clicked!');
    localStorage.setItem('savedUser', JSON.stringify(user));
    navigate('/auth_user/resume_builder/build/preview');
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
    setExpEditMode(false);
    setCurrentExpUuid(null);
    setTempExp({ role: '', location: '', description: '', duration: '' });
  };

  const handleSaveProjectChanges = (e) => {
    e.preventDefault();
    console.log('Saving changed project');
    setUser((currentUser) => {
      return {
        ...currentUser,
        projects: currentUser.projects.map((exp) =>
          exp.id === currentProjectUuid ? tempProject : exp
        ),
      };
    });
    setProjectEditMode(false);
    setCurrentProjectUuid(null);
    setTempProject({ name: '', link: '', duration: '', description: '' });
  };

  //For editting experiences, where it is in an input state
  const handleCancelExpChanges = () => {
    setExpEditMode(false);
    setCurrentExpUuid(null);
    setTempExp({ role: '', location: '', description: '', duration: '' });
  };

  const handleCancelProjectChanges = () => {
    setProjectEditMode(false);
    setCurrentProjectUuid(null);
    setTempProject({ name: '', link: '', duration: '', description: '' });
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
    setExpEditMode(true);
    setCurrentExpUuid(uuid);
    setTempExp({ ...targettedExp });
  };

  const handleEditProject = (uuid) => {
    console.log('handleEditProject is running');
    /* 
    Find the targetted experience in user.experiences
    Switch to input fields mode 
    Copy everything from targettedExp to tempExp
    After done editting, update in user as well
    */
    const targettedProject = user.projects.find((exp) => exp.id === uuid);
    if (!targettedProject) {
      console.error('Project not found!');
      return;
    }
    setProjectEditMode(true);
    setCurrentProjectUuid(uuid);
    setTempProject({ ...targettedProject });
  };

  //For when it is just displaying cards, then clicking add more, should make expEditMode === true
  const handleAddMoreExp = () => {
    setExpEditMode(true);
  };

  const handleAddMoreProject = () => {
    setProjectEditMode(true);
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
    setExpEditMode(false);
  };

  const handleProjectSubmit = (e) => {
    console.log('A new project is submitted!');

    e.preventDefault();
    if (
      !tempProject.name ||
      !tempProject.description ||
      !tempProject.duration ||
      !tempProject.link
    ) {
      console.error('Incomplete Project Information!');
      return;
    }

    const formattedProject = { id: uuidv4(), ...tempProject };
    if (user.projects.length === 0) {
      setUser((currentUser) => ({
        ...currentUser,
        projects: [formattedProject],
      }));
    } else {
      setUser((currentUser) => ({
        ...currentUser,
        projects: [...currentUser.projects, formattedProject],
      }));
    }
    setTempProject({ name: '', link: '', duration: '', description: '' });
    setProjectEditMode(false);
  };

  const handleExpDelete = (uuid) => {
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
      setExpEditMode(true);
    }
  };

  const handleProjectDelete = (uuid) => {
    const targettedProject = user.projects.find((pro) => pro.id === uuid);
    if (targettedProject) {
      setUser((currentUser) => ({
        ...currentUser,
        projects: currentUser.projects.filter((pro) => pro.id !== uuid),
      }));
    } else {
      console.error('Project not found!');
    }
    if (user.projects.length === 1) {
      setProjectEditMode(true);
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

          {/* When there's no past experiences (user.workExperience.length === 0 && !expEditMode)
              show input fields only*/}
          {user.experiences.length === 0 && !currentExpUuid && expEditMode && (
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

          {/* When there's past experiences (user.workExperience.length > 0) && !expEditMode
            display experience + show input fields
          */}

          {user.experiences.length > 0 && !expEditMode && !currentExpUuid && (
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
                        onClick={() => handleExpDelete(state.id)}
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
                    onClick={handleAddMoreExp}>
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

          {/* When there's experiences, and in expEditMode, 
              Others remain to be in card display, currently targetted ones in input
          */}
          {user.experiences.length > 0 &&
            expEditMode &&
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
                        onClick={handleCancelExpChanges}>
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
          {user.experiences.length > 0 && expEditMode && !currentExpUuid && (
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
                      onClick={handleCancelExpChanges}>
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

          <div className='text-xl text-[#334155] font-semibold'>Projects</div>

          {user.projects.length === 0 &&
            !currentProjectUuid &&
            projectEditMode && (
              <div className='flex flex-col gap-[12px]'>
                <div>
                  <input
                    id='name'
                    placeholder={'Name'}
                    value={tempProject.name}
                    onChange={(e) => handleProjectChange(e)}
                    className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                  />
                </div>
                <div className='flex flex-row w-full gap-[150px]'>
                  <div>
                    <input
                      id='duration'
                      placeholder='Duration'
                      value={tempProject.duration}
                      onChange={(e) => handleProjectChange(e)}
                      className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                    />
                  </div>

                  <div>
                    <input
                      placeholder='Link'
                      id='link'
                      value={tempProject.link}
                      onChange={(e) => handleProjectChange(e)}
                      className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                    />
                  </div>
                </div>
                <div>
                  <input
                    id='description'
                    placeholder='Description'
                    value={tempProject.description}
                    onChange={(e) => handleProjectChange(e)}
                    className='w-full py-[12px] px-[16px] border-slate-300 rounded-xl border'
                  />
                </div>
                <div className='py-[12px]'>
                  <div className='flex flex-row justify-end gap-[10px]'>
                    <div
                      className='py-[12px] px-[24px] rounded-xl bg-[#1D4ED8] text-white'
                      onClick={(e) => handleProjectSubmit(e)}>
                      Save Changes
                    </div>
                  </div>
                </div>
              </div>
            )}

          {user.projects.length > 0 &&
            !projectEditMode &&
            !currentProjectUuid && (
              <div className='flex flex-col gap-[12px]'>
                {user.projects.map((state, index) => (
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
                          onClick={() => handleEditProject(state.id)}
                        />
                        <img
                          src='/DeleteIcon.png'
                          className='w-[20px] h-[20px]'
                          onClick={() => handleProjectDelete(state.id)}
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
                      onClick={handleAddMoreProject}>
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

          {user.projects.length > 0 &&
            projectEditMode &&
            currentProjectUuid &&
            user.projects.map((exp, index) =>
              exp.id === currentProjectUuid ? (
                <div className='flex flex-col gap-[12px]'>
                  <div>
                    <input
                      id='name'
                      placeholder={'Name'}
                      value={tempProject.name}
                      onChange={(e) => handleProjectChange(e)}
                      className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                    />
                  </div>
                  <div className='flex flex-row w-full gap-[150px]'>
                    <div>
                      <input
                        id='duration'
                        placeholder='Duration'
                        value={tempProject.duration}
                        onChange={(e) => handleProjectChange(e)}
                        className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                      />
                    </div>

                    <div>
                      <input
                        placeholder='Link'
                        id='link'
                        value={tempProject.link}
                        onChange={(e) => handleProjectChange(e)}
                        className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      id='description'
                      placeholder='Description'
                      value={tempProject.description}
                      onChange={(e) => handleProjectChange(e)}
                      className='w-full py-[12px] px-[16px] border-slate-300 rounded-xl border'
                    />
                  </div>
                  <div className='py-[12px]'>
                    <div className='flex flex-row justify-end gap-[10px]'>
                      <div
                        className='border border-[#1E3A8A] text-[#1E3A8A] rounded-xl py-[12px] px-[24px]'
                        onClick={handleCancelProjectChanges}>
                        Cancel
                      </div>
                      <div
                        className='py-[12px] px-[24px] rounded-xl bg-[#1D4ED8] text-white'
                        onClick={(e) => handleSaveProjectChanges(e)}>
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

          {user.projects.length > 0 &&
            projectEditMode &&
            !currentProjectUuid && (
              <div className='flex flex-col gap-[12px]'>
                {user.projects.map((state, index) => (
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
                          onClick={() => handleEditProject(state.id)}
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

                <div className='flex flex-col gap-[12px]'>
                  <div>
                    <input
                      id='name'
                      placeholder={'Name'}
                      value={tempProject.name}
                      onChange={(e) => handleProjectChange(e)}
                      className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                    />
                  </div>
                  <div className='flex flex-row w-full gap-[150px]'>
                    <div>
                      <input
                        id='duration'
                        placeholder='Duration'
                        value={tempProject.duration}
                        onChange={(e) => handleProjectChange(e)}
                        className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                      />
                    </div>

                    <div>
                      <input
                        placeholder='Link'
                        id='link'
                        value={tempProject.link}
                        onChange={(e) => handleProjectChange(e)}
                        className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      id='description'
                      placeholder='Description'
                      value={tempProject.description}
                      onChange={(e) => handleProjectChange(e)}
                      className='w-full py-[12px] px-[16px] border-slate-300 rounded-xl border'
                    />
                  </div>
                  <div className='py-[12px]'>
                    <div className='flex flex-row justify-end gap-[10px]'>
                      <div
                        className='py-[12px] px-[24px] rounded-xl bg-[#1D4ED8] text-white'
                        onClick={(e) => handleProjectSubmit(e)}>
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
