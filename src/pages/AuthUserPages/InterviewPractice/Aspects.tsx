import React from "react";
import { useNavigate } from "react-router";

const Aspects = () => {
	const navigate = useNavigate();
	const navigateToInterviewLanding = () => navigate("/auth_user/interview_practice");
	const navigateToInterviewContext = () => navigate("/auth_user/interview_practice/context");
	return (
		<div className="w-full flex flex-col justify-center items-center py-[48px]">
			<div className="h-[673px] w-[775px] flex flex-col justify-between py-[48px] bg-white px-[64px] outline-slate-500 rounded-xl outline-1">
                <div className="flex flex-col gap-[36px] justify-center items-center">
                    <div className="text-blue-900 font-bold text-[32px]">Welcome to Interview Practice!</div>
                    <div className="flex flex-col gap-[24px] w-full">
                        <div className="text-slate-700 font-semibold text-2xl text-center">
                            Which aspects would you like to be interviewed on?
                        </div>
                        <ul className="flex flex-col gap-[12px] w-full">
                            <li className="flex px-[24px] py-[20px] text-gray-700 bg-slate-100 w-full justify-between text-[20px] rounded-lg">
                                <p>Technical Skill</p>
                            </li>
                            <li className="flex px-[24px] py-[20px] text-white bg-blue-700 w-full justify-between text-[20px] rounded-lg">
                                <p>Behaviour</p>
                                <img src="/CheckCircleWhite.svg" />
                            </li>
                            <li className="flex px-[24px] py-[20px] text-gray-700 bg-slate-100 w-full justify-between text-[20px] rounded-lg">
                                <p>Problem Solving</p>
                            </li>
                            <li className="flex px-[24px] py-[20px] text-gray-700 bg-blue-100 w-full justify-between text-[20px] rounded-lg">
                                <p>Culture Fit</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="w-full flex justify-between">
                    <button
						className="bg-transparent text-blue-900 text-md py-[12px] px-[24px] rounded-lg outline-1 outline-blue-900 hover:cursor-pointer"
						onClick={navigateToInterviewLanding}
					>
						Previous
					</button>
					<button
						className="bg-[#1D4ED8] text-white text-md py-[12px] px-[24px] rounded-lg hover:cursor-pointer"
						onClick={navigateToInterviewContext}
					>
						Proceed
					</button>
				</div>
			</div>
		</div>
	);
};

export default Aspects;
