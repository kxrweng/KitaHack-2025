import React from "react";

const AuthUserFooter = () => {
	return (
		<div className="flex flex-row bg-[#1E3A8A] py-[36px] px-[72px] justify-between">
			<div className="flex flex-row items-center">
				<img src="/MilestonesWhite.svg" />
				<div className="text-white font-semibold text-xl">Milestones</div>
			</div>

			<div className="flex flex-col gap-[16px] tracking-wider ">
				<div className="text-white font-semibold text-lg">Pages</div>
				<div className="flex flex-col gap-[8px]">
					<div className="text-white ">Upskill</div>
					<div className="text-white ">Resume Builder</div>
					<div className="text-white ">Interview Practice</div>
					<div className="text-white ">Analytics</div>
					<div className="text-white ">Account</div>
				</div>
			</div>

			<div className="flex flex-col gap-[16px] tracking-wider ">
				<div className="text-white font-semibold text-lg">About Us</div>
				<div className="flex flex-col gap-[8px]">
					<div className="text-white ">About Us</div>
					<div className="text-white ">Our Vision</div>
					<div className="text-white ">Our Solution</div>
					<div className="text-white ">Meet Our Team</div>
				</div>
			</div>

			<div className="flex flex-col gap-[16px] tracking-wider ">
				<div className="text-white font-semibold text-lg">Contact Us</div>
				<div className="flex flex-col gap-[8px]">
					<div className="flex flex-row gap-[10px]">
						<img src="/LinkedIn.svg" />
						<img src="/Facebook.svg" />
						<img src="/Instagram.svg" />
					</div>
				</div>
				<div className="text-white">+60 11 2345 6789</div>
				<div className="text-white">contact@milestones.com</div>
			</div>
		</div>
	);
};

export default AuthUserFooter;
