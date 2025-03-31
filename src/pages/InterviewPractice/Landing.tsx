import React from "react";
import { useNavigate } from "react-router";

const Landing = () => {
	const navigate = useNavigate();
	const navigateToMoreRoles = () => navigate("/auth_user/interview_practice/more_roles");
	const navigateToInterviewAspects = () => navigate("/auth_user/interview_practice/aspects");
	return (
		<div className="w-full flex flex-col justify-center items-center py-[48px]">
			<div className="flex flex-col justify-center items-center gap-[36px] py-[48px] bg-white px-[64px] outline-slate-500 rounded-xl outline-1">
				<div className="text-blue-900 font-bold text-[32px]">Welcome to Interview Practice!</div>

				<div className="flex flex-col gap-[24px]">
					<div className="text-slate-700 font-semibold text-2xl">
						First, let’s pick the role which you are interviewing for:
					</div>
					<ul className="flex flex-col gap-[12px] w-full">
						<li className="flex px-[24px] py-[20px] text-white bg-blue-700 w-full justify-between text-[20px] rounded-lg">
							<text>Software Engineer</text>
							<img src="/CheckCircleWhite.svg" />
						</li>
						<li className="flex px-[24px] py-[20px] text-gray-700 bg-blue-100 w-full justify-between text-[20px] rounded-lg">
							<text>Project Manager</text>
						</li>
						<li className="flex px-[24px] py-[20px] text-gray-700 bg-slate-100 w-full justify-between text-[20px] rounded-lg">
							<text>UI/UX Designer</text>
						</li>
						<li className="flex px-[24px] py-[20px] text-gray-700 bg-blue-100 w-full justify-between text-[20px] rounded-lg">
							<text>Quality Assurance Testerr</text>
						</li>
						<a className="text-blue-700 text-md cursor-pointer underline" onClick={navigateToMoreRoles}>Don't see your role?</a>
					</ul>
				</div>

				<div className="bg-[#1D4ED8] items-center justify-center  text-white flex rounded-xl w-[120px] h-[50px] ml-auto">
					<button
						className="text-xl py-1 hover:cursor-pointer"
						onClick={navigateToInterviewAspects}
					>
						Proceed
					</button>
				</div>
			</div>
		</div>
	);
};

export default Landing;
