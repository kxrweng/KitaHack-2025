import React from 'react'

const Introduction = () => {
  return (
    <div className = "border flex flex-col  w-screen h-screen bg-gradient-to-r from-[#DBEBFF] to-[#A4AAFF]">
    <div className = "flex flex-row ">
        <img src = 'src\assets\MilestonesMascot.svg' className = "w-[301px] h-[238px]" />
        <div className = "flex flex-col w-full gap-5">
            <div className = "flex flex-col">
                <div className = "bg-[#1D4ED8] w-fit px-4 py-1 text-white relative top-3 left-5 font-mono rounded-full">
                    Miles
                </div>
                <div className = "bg-white p-4 w-[955px] outline-slate-100 rounded-xl outline-1 ">
                Hello there Test User, welcome to Milestones! My name is Miles and I’ll be your friendly neighbourhood bot around here. My job is to help you get settled in nice and comfy. 😊
                </div>

            </div>
            <div className = "bg-white p-4 w-[955px] outline-slate-100 rounded-xl outline-1 ">
            Before we move on, I’d like to know a little more about you so that we can make your experience here more personalised.                </div>
        </div>
    </div>
    </div>
  )
}

export default Introduction