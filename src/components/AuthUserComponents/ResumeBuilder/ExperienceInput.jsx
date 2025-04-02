import React from 'react';
import useGlobalContext from '../../../hooks/useGlobalContext';
const ExperienceInput = ({ topic, handleAddMore, handleSaveChanges }) => {
  const { user, setUser } = useGlobalContext();
  //  const [tempExp, setTempExp] = useState({
  //     role: '',
  //     location: '',
  //     duration: '',
  //     description: '',
  //   });

  //   const [tempProject, setTempProject] = useState({
  //     name: '',
  //     duration: '',
  //     link: '',
  //     description: '', })
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);

  const [tempExp, setTempExp] = useState({
    role: '',
    location: '',
    duration: '',
    description: '',
  });

  const [tempProject, setTempProject] = useState({
    name: '',
    duration: '',
    link: '',
    description: '',
  });

  const handleProjectChange = (e) =>
    setTempProject((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleExpChange = (e) =>
    setTempExp((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSaveExp = () => {
    setProjects((prev) => [...prev, tempExp]);
    setUser((prev) => )
    setTempExp({ role: '', location: '', duration: '', description: '' });
  };

  const handleSaveProjects = () => {
    setExperiences((prev) => [...prev, tempProject]);
    setTempProject({ name: '', duration: '', link: '', description: '' });
  };

  return (
    <div className='flex flex-col gap-[8px]'>
      {topic === 'work' ? (
        <>
          {' '}
          <div className='text-xl text-[#334155] font-semibold'>
            Work Experience
          </div>
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
          </div>
          <div className='py-[12px]'>
            <div className='flex flex-row justify-end gap-[10px]'>
              <div
                className='border border-[#1E3A8A] text-[#1E3A8A] rounded-xl py-[12px] px-[24px]'
                onClick={handleAddMore}>
                Add More
              </div>
              <div
                className='py-[12px] px-[24px] rounded-xl bg-[#1D4ED8] text-white'
                onClick={handleSaveChanges}>
                Save Changes
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {' '}
          <div className='text-xl text-[#334155] font-semibold'>Projects</div>
          <div className='flex flex-col gap-[12px]'>
            <div>
              <input
                id='name'
                placeholder='Project Name'
                value={tempProject.name}
                onChange={(e) => handleProjectChange(e)}
                className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
              />
            </div>
            <div className='flex flex-row w-full gap-[150px]'>
              <div>
                <input
                  placeholder='Project Duration'
                  value={tempProject.duration}
                  onChange={(e) => handleProjectChange(e)}
                  id='duration'
                  className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                />
              </div>

              <div>
                <input
                  placeholder='Project Link'
                  id='link'
                  value={tempProject.link}
                  onChange={(e) => handleProjectChange(e)}
                  className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
                />
              </div>
            </div>
            <div>
              <input
                placeholder='Project Description'
                id='description'
                value={tempProject.description}
                onChange={(e) => handleProjectChange(e)}
                className='w-full py-[12px] px-[16px] border-slate-300 rounded-xl border'
              />
            </div>
          </div>
          <div className='py-[12px]'>
            <div className='flex flex-row justify-end gap-[10px]'>
              <div
                className='border border-[#1E3A8A] text-[#1E3A8A] rounded-xl py-[12px] px-[24px]'
                onClick={handleAddMore}>
                Add More
              </div>
              <div
                className='py-[12px] px-[24px] rounded-xl bg-[#1D4ED8] text-white'
                onClick={handleSaveChanges}>
                Save Changes
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExperienceInput;
