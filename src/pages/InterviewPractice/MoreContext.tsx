import React, {useState} from "react";
import { useNavigate } from "react-router";

const MoreContext = () => {
	const navigate = useNavigate();
	const navigateToInterviewAspects = () => navigate("/auth_user/interview_practice/aspects");
    const startInterview = () => navigate("/auth_user/interview_practice/question");

	return (
		<div className="w-full flex flex-col justify-center items-center py-[48px]">
			<div className="flex flex-col h-[673px] w-[775px] justify-between py-[48px] px-[64px] bg-white outline-slate-500 rounded-xl outline-1">
                <div className="flex flex-col gap-[36px] justify-center items-center w-full">
                    <div className="text-blue-900 font-bold text-[32px]">Welcome to Interview Practice!</div>

                    <div className="w-full flex flex-col gap-[12px]">
                        <div className="text-center text-slate-700 font-semibold text-2xl">
                            Any additional information we should take note of before we begin the interview? (e.g. what would you like to be tested on specifically)
                        </div>
                        <textarea 
                            className="w-full bg-white px-[24px] py-[20px] h-[288px] text-[20px] outline-slate-300 rounded-xl outline-1" 
                            placeholder="Enter additional context here"
                        />
                    </div>
                </div>

				<div className="flex justify-between">
                    <button
						className="bg-transparent text-blue-900 text-md py-[12px] px-[24px] rounded-lg outline-1 outline-blue-900 hover:cursor-pointer"
						onClick={navigateToInterviewAspects}
					>
						Previous
					</button>
					<button
						className="bg-[#1D4ED8] text-white text-md py-[12px] px-[24px] rounded-lg hover:cursor-pointer"
						onClick={startInterview}
					>
						Proceed
					</button>
				</div>
			</div>
		</div>
	);
};

export default MoreContext;
