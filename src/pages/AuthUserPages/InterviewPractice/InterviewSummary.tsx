import React, {useState} from "react";
import { useNavigate } from "react-router";

const InterviewSummary = () => {
    const [display, setDisplay] = useState(false);
    const feedback = "Feedback: Your answer is too vague. It lacks details and has no clear resolution or impact. You can consider using the STAR (Situation, Task, Action, Result) methodology to improve your solution.\n\nSample Answer:\nSituation: In my previous role as a project manager, we were working on a software update for a major client, and a key developer unexpectedly left the team two weeks before the deadline.\n\nTask: I had to ensure the project stayed on track without compromising quality.\n\nAction: I immediately reassessed our timeline and reassigned tasks based on the team’s strengths. I also communicated with the client to adjust expectations and secured an extra resource from another team to help with critical components. To ensure we met the deadline, I organized daily check-ins to monitor progress and remove roadblocks.\n\nResult: As a result, we successfully delivered the update on time with minimal disruptions. The client appreciated our transparency, and the project even led to an extended contract with them.";
    const navigate = useNavigate();
    const navigateToLanding = () => navigate("/auth_user/interview_practice");

    const toggleDisplay = () => {
        setDisplay(!display);
    }

    return (
        <div className="w-full px-[64px] py-[48px]">
            <div className="flex flex-col gap-[48px] px-[36px] py-[24px] bg-slate-100 rounded-lg outline-1 outline-slate-500">
                <h1 className="text-4xl font-bold text-blue-900">Practice Interview Summary</h1>
                <ul className="flex flex-col gap-[12px]">
                    <li className="flex flex-col gap-[16px] bg-white p-[24px] outline-1 outline-slate-300 rounded-md text-xl text-slate-700">
                        <div className="flex justify-between">
                            <p><a className="font-bold">Question 1: </a>Could you tell me about a time you faced a challenge at work and how you handled it?</p>
                            <img className="cursor-pointer"
                            src={display ? "/KeyboardArrowUp.svg" : "/KeyboardArrowDown.svg"}
                            onClick={toggleDisplay}/>
                        </div>
                        {display ? 
                        <>
                            <p><a className="font-bold">Your Answer: </a>One time, I had a difficult project with a tight deadline. It was really stressful, but I worked hard and managed to complete it. It was tough, but I got it done.</p>
                            <div className="px-[16px] py-[12px] bg-blue-100 rounded-lg"><p className="whitespace-pre-line text-blue-900">{feedback}</p></div>
                        </> : 
                        <></>}
                    </li>
                    <li className="flex items-center justify-between bg-white p-[24px] outline-1 outline-slate-300 rounded-md text-xl text-slate-700">
                        <p><a className="font-bold">Question 2: </a>Tell me about a time you worked with a difficult team member. How did you handle it?</p>
                        <img src="/KeyboardArrowDown.svg"/>
                    </li>
                    <li className="flex items-center justify-between bg-white p-[24px] outline-1 outline-slate-300 rounded-md text-xl text-slate-700">
                        <p><a className="font-bold">Question 3: </a>Describe a time you received constructive criticism. How did you respond?</p>
                        <img src="/KeyboardArrowDown.svg"/>
                    </li>
                    <li className="flex items-center justify-between bg-white p-[24px] outline-1 outline-slate-300 rounded-md text-xl text-slate-700">
                        <p><a className="font-bold">Question 4: </a>Have you ever had to motivate a team during a difficult project? What did you do?</p>
                        <img src="/KeyboardArrowDown.svg"/>
                    </li>
                    <li className="flex items-center justify-between bg-white p-[24px] outline-1 outline-slate-300 rounded-md text-xl text-slate-700">
                        <p><a className="font-bold">Question 5: </a>Have you ever missed a deadline? What happened, and what did you learn?</p>
                        <img src="/KeyboardArrowDown.svg"/>
                    </li>
                    <li className="flex items-center bg-slate-700 p-[24px] outline-1 outline-slate-300 rounded-md text-xl text-white">
                        <p><a className="font-bold">Overall Feedback: </a>A decent try with the practice questions but there is certainly room for improvement. Practise using the STAR method more when answering behavioural questions so the interviewer has a deeper insight into your thought process.</p>
                    </li>
                </ul>
                <div className="flex justify-end w-full">
                    <button 
                    className="px-[24px] py-[12px] bg-blue-700 text-lg text-white rounded-md cursor-pointer"
                    onClick={navigateToLanding}
                    >Complete Practice Interview</button>
                </div>
            </div>
        </div>
    );
};
export default InterviewSummary;