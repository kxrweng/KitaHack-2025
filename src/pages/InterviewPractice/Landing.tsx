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
							<p>Software Engineer</p>
							<img src="/CheckCircleWhite.svg" />
						</li>
						<li className="flex px-[24px] py-[20px] text-gray-700 bg-blue-100 w-full justify-between text-[20px] rounded-lg">
							<p>Project Manager</p>
						</li>
						<li className="flex px-[24px] py-[20px] text-gray-700 bg-slate-100 w-full justify-between text-[20px] rounded-lg">
							<p>UI/UX Designer</p>
						</li>
						<li className="flex px-[24px] py-[20px] text-gray-700 bg-blue-100 w-full justify-between text-[20px] rounded-lg">
							<p>Quality Assurance Testerr</p>
						</li>
						<a className="text-blue-700 text-md cursor-pointer underline" onClick={navigateToMoreRoles}>Don't see your role?</a>
					</ul>
				</div>

				<div className="w-full flex justify-end">
					<button
						className="bg-[#1D4ED8] text-white text-md py-[12px] px-[24px] rounded-lg hover:cursor-pointer text-md hover:cursor-pointer"
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
