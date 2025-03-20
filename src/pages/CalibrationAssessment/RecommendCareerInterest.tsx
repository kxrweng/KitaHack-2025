import React from 'react'
import { useNavigate } from 'react-router';

const RecommendCareerInterest = () => {
    const navigate = useNavigate();
    const navigateToPrev = () => navigate(-1);
  return (
    <div className = " flex flex-col gap-[30px] ">
    <div className = "flex flex-row ">
        <img src = "/MilestonesMascot.svg" className = "w-[301px] h-[238px]" />
        <div className = "flex flex-col w-full gap-5">
            <div className = "flex flex-col">
                <div className = "bg-[#1D4ED8] w-fit px-[32px] py-[8px] text-white relative top-3 left-5 font-mono rounded-full">
                    Miles
                </div>
                <div className = "bg-white text-xl pl-[24px] pr-[59px] py-[32px] w-[955px] outline-slate-500 rounded-xl outline-1 ">
                I see that your personality type is <span className = "text-[#1D4ED8] font-semibold">INFJ</span> - we’re going to get along well together! :) Based on your personality type, these are the recommended career pathways for you. If you are alright with them, let’s proceed to the Milestones home page!
                            </div>

            </div>
            <div className = "bg-white text-xl pl-[24px] pr-[59px] py-[32px] w-[955px] outline-slate-500 rounded-xl outline-1 ">
            Now, let’s figure out your field and career of interest. These are important to help me recommend suitable pathways for you to follow during your time here at Milestones.            </div>
        </div>
    </div>
    <div className = "flex flex-col px-[272px] h-[448px] w-[752px] ">
        <div className = "bg-[#1D4ED8] px-[32px] py-[8px] w-fit text-white relative top-3 left-5 font-mono rounded-full">
            Test User
        </div>
        <div className = "flex flex-col gap-[24px] py-[16px] bg-[#F1F5F9] px-[24px] w-[800px] outline-slate-100 rounded-xl outline-1">
            <div className = "flex flex-col gap-[24px] justify-between">
                    <div className = "text-[#1D4ED8] text-lg font-normal mt-[16px] hover:cursor-pointer" onClick = {navigateToPrev}>
                    &lt; Previous
                    </div>
            </div>            
        
        
            <div className = "flex justify-between tracking-wide text-[#1E3A8A] font-bold text-xl flex-row">
                <div>
                    Recommended Career Pathways
                </div>
                <div>
                    +
                </div>
            </div>

            <div className = "flex flex-col gap-[12px]">
                <div className = "flex flex-row justify-between border-1 bg-white border-slate-300 items-center text-xl py-[12px] px-[16px] rounded-lg">
                    <div className = "">
                        Software Engineer
                    </div>
                    <div>
                        x
                    </div>
                </div>

                <div className = "flex flex-row justify-between bg-white border-1 border-slate-300 items-center text-xl py-[12px] px-[16px] rounded-lg">
                    <div className = "">
                        Data Scientist
                    </div>
                    <div>
                        x
                    </div>
                </div>

                <div className = "flex flex-row justify-between bg-white border-1 border-slate-300 items-center text-xl py-[12px] px-[16px] rounded-lg">
                    <div className = "">
                        UI/UX Designer
                    </div>
                    <div>
                        x
                    </div>
                </div>

                <div className="bg-[#1D4ED8] mt-[8px] items-center justify-center  text-white flex rounded-xl w-[120px] h-[50px] ml-auto">
                <button className="text-xl py-1 hover:cursor-pointer">
                    Proceed
                </button>
            </div>
                
            </div>
        </div>
    </div>
    </div>
   
  )
}

export default RecommendCareerInterest