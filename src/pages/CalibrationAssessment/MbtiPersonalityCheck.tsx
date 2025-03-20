import React from 'react'
import { useNavigate } from 'react-router';
const MbtiPersonalityCheck = () => {
    const navigate = useNavigate();
    const navigateToRecommendedCareerInterest = () => navigate("/new_user/recommended_career_interest");
    const navigateToPrev = () => navigate(-1);
    return (
      <div className = " flex flex-col gap-[30px]">
      <div className = "flex flex-row ">
      <img src = "/MilestonesMascot.svg" className = "w-[301px] h-[238px]" />
      <div className = "flex flex-col w-full gap-5">
              <div className = "flex flex-col">
                  <div className = "bg-[#1D4ED8] w-fit px-[32px] py-[8px] text-white relative top-3 left-5 font-mono rounded-full">
                      Miles
                  </div>
                  <div className = "bg-white text-xl pl-[24px] pr-[59px] py-[32px] w-[955px] outline-slate-500 rounded-xl outline-1 ">
                  Unsure of which career pathway suits you best? Don’t fret, we’ve got your back.!All you have to do is input your MBTI personality type. If you are unsure of your personality type, feel free to take our personality test.                   </div>
  
              </div>
              <div className = "bg-white text-xl pl-[24px] pr-[59px] py-[32px] w-[955px] outline-slate-500 rounded-xl outline-1 ">
              With your personality type, we can recommend suitable career pathways for you. Of course, these are only recommendations and you are free to make changes.
              </div>
          </div>
      </div>
      <div className = "flex flex-col px-[272px] h-[448px] w-[752px] ">
          <div className = "bg-[#1D4ED8] px-[32px] py-[8px] w-fit text-white relative top-3 left-5 font-mono rounded-full">
              Test User
          </div>
          <div className = "flex flex-col py-[16px] gap-[24px] pb-[25px] bg-white px-[24px] w-[800px] outline-slate-100 rounded-xl outline-1">
              <div className = "flex flex-col gap-[10px] justify-between">
                <div className = "text-[#1D4ED8] text-lg font-normal mt-[16px] hover:cursor-pointer" onClick = {navigateToPrev}>
                      &lt; Previous
                      </div>
                  <div className = "flex flex-col gap-[8px]">
                      <div className = "text-[#1E3A8A] font-bold text-lg">
                        MBTI Personality Type
                      </div>
  
                      <select className = "bg-white p-4 w-[280px] h-[56px] outline-slate-300 rounded-xl outline-1">
                          <option value = "ComputerScience">Computer Science</option>
                          <option value = "Finance">Finance</option>
  
                      </select>
                </div>
  
                <div className="bg-[#1D4ED8] justify-center items-center ml-auto text-white flex rounded-xl w-[120px] h-[50px] ">
                  <button className="text-xl py-1 hover:cursor-pointer" onClick = {navigateToRecommendedCareerInterest}>
                      Confirm
                  </button>
                </div>
  
              </div>

                <div className="flex items-center mx-auto w-full">
                <hr className="flex-grow border-t border-gray-400" />
                <span className="mx-2 text-gray-600">or</span>
                <hr className="flex-grow border-t border-gray-400" />
                </div>
  
                <div className = "text-slate-700 text-xl">
                Unsure of your personality type? Take our MBTI test and find out!
                </div>
              <div className="bg-white border-1 border-[#1D4ED8] justify-center ml-auto items-center text-[#1D4ED8] flex rounded-xl w-[160px] h-[50px] ">
                  <button className="text-xl py-1">
                      Take MBTI Test
                  </button>
              </div>

          </div>
      </div>
      </div>
     
    )
  }
  

export default MbtiPersonalityCheck