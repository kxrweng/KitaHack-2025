import React from 'react';

const DisplayCard = ({ state = [] }) => {
  if (state.length === 0) {
    return <h1>No State is passed!</h1>;
  } else
    return (
      <div className='flex flex-col gap-[12px]'>
        {state.map((state, index) => (
          <div
            className={`py-[16px] px-[24px] flex flex-col gap-[16px] rounded-lg ${
              index % 2 === 0 ? 'bg-[#F1F5F9]' : 'bg-[#DBEAFE]'
            }`}>
            <div className='font-semibold text-xl text-black'>
              {state.link && (
                <a
                  className='no-underline hover:cursor-pointer'
                  target='_blank'
                  href={state.link}>
                  {state.name}
                </a>
              )}
              {!state.link && (state.role || state.name)}
            </div>

            <div className='font-medium text-lg text-black'>
              {state.location
                ? `${state.location}, ${state.duration}`
                : `${state.duration}`}
            </div>
            <ul className='text-md text-black list-disc list-inside'>
              {state.description &&
                state.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    );
};

export default DisplayCard;
