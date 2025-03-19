import React from 'react'
import MilestonesMascot from '../../assets/MilestonesMascot.svg';
import { useNavigate } from 'react-router';

const Introduction = () => {
    const navigate = useNavigate();
    const navigateToCareerInterest = () => navigate("/new_user/career_interest");
    return (
    <div className = " flex flex-col gap-[30px] ">
    <div className = "flex flex-row ">
        <img src = {MilestonesMascot} className = "w-[301px] h-[238px]" />
        <div className = "flex flex-col w-full gap-5">
            <div className = "flex flex-col">
                <div className = "bg-[#1D4ED8] w-fit px-[32px] py-[8px] text-white relative top-3 left-5 font-mono rounded-full">
                    Miles
                </div>
                <div className = "bg-white text-xl pl-[24px] pr-[59px] py-[32px] w-[955px] outline-slate-500 rounded-xl outline-1 ">
                Hello there Test User, welcome to Milestones! My name is Miles and I’ll be your friendly neighbourhood bot around here. My job is to help you get settled in nice and comfy. 😊
                </div>

            </div>
            <div className = "bg-white text-xl pl-[24px] pr-[59px] py-[32px] w-[955px] outline-slate-500 rounded-xl outline-1 ">
            Before we move on, I’d like to know a little more about you so that we can make your experience here more personalised.                </div>
        </div>
    </div>
    <div className = "flex flex-col px-[272px] h-[448px] w-[752px] ">
        <div className = "bg-[#1D4ED8] px-[32px] py-[8px] w-fit text-white relative top-3 left-5 font-mono rounded-full">
            Test User
        </div>
        <div className = "flex flex-col gap-[24px] py-[16px] bg-white px-[24px] w-[800px] outline-slate-100 rounded-xl outline-1">
            <div className = "flex flex-row mt-[16px] justify-between">
                <div className = "flex flex-col gap-[8px] ">
                    <div className = "text-[#1E3A8A] font-bold text-lg">
                        Your Age
                    </div>

                    <input className = "bg-white p-4 w-[280px] h-[56px] outline-slate-300 rounded-xl outline-1" />
                </div>

                <div className = "flex flex-col gap-[8px]">
                    <div className = "text-[#1E3A8A] font-bold text-lg">
                        Your Gender
                    </div>

                    <select className = "bg-white p-4 w-[280px] h-[56px] outline-slate-300 rounded-xl outline-1">
                        <option value = "Female">Female</option>
                        <option value = "Male">Male</option>

                    </select>
                </div>

            </div>

            <div className = "flex flex-col gap-[8px]">
                <div className = "text-[#1E3A8A] font-bold text-lg">
                        Your Current Field
                </div>

                <select className = "bg-white p-4 w-[280px] h-[56px] outline-slate-300 rounded-xl outline-1">
                    <option value = "">Software Engineering</option>
                    <option value = "">Data Science</option>
                    <option value = "">DevOps</option>
                </select>
            </div>

            <div className = "text-slate-700 text-xl">
            *** Don’t worry, you can make changes to these later on if you need to!            
            </div>
            
            <div className="bg-[#1D4ED8] items-center justify-center  text-white flex rounded-xl w-[120px] h-[50px] ml-auto">
                <button className="text-xl py-1 hover:cursor-pointer" onClick = {navigateToCareerInterest}>
                    Confirm
                </button>
            </div>

           
        </div>
    </div>
    </div>
   
  )
}

export default Introduction