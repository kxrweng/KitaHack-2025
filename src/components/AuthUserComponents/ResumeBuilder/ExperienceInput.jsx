import React from 'react';

const ExperienceInput = ({ topic, handleAddMore, handleSaveChanges }) => {
  const workPlaceholders = {
    title: 'Work Experience',
    placeholders: {
      levelOne: 'Your Work Role',
      levelTwo: 'Your Work Location',
      levelThree: 'Your Work Duration',
      levelFour: 'Your Work Description',
    },
  };

  const projectPlaceholders = {
    title: 'Project',
    placeholders: {
      levelOne: 'Project Name',
      levelTwo: 'Project Duration',
      levelThree: 'Project Link',
      levelFour: 'Project Description',
    },
  };

  const getPlaceholders = (topic) => {
    if (topic === 'work') {
      return workPlaceholders;
    } else if (topic === 'project') {
      return projectPlaceholders;
    }
  };

  const topicPlaceholders = getPlaceholders(topic);

  return (
    <div className='flex flex-col gap-[8px]'>
      <div className='text-xl text-[#334155] font-semibold'>
        {topicPlaceholders.title}
      </div>
      <div className='flex flex-col gap-[12px]'>
        <div>
          <input
            placeholder={topicPlaceholders.placeholders.levelOne}
            className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
          />
        </div>
        <div className='flex flex-row w-full gap-[150px]'>
          <div>
            <input
              placeholder={topicPlaceholders.placeholders.levelTwo}
              className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
            />
          </div>

          <div>
            <input
              placeholder={topicPlaceholders.placeholders.levelThree}
              className='py-[12px] px-[16px] border-slate-300 rounded-xl border'
            />
          </div>
        </div>
        <div>
          <input
            placeholder={topicPlaceholders.placeholders.levelFour}
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
    </div>
  );
};

export default ExperienceInput;
