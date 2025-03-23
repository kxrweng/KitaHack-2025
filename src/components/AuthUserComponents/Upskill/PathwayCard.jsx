import React, { useState } from "react";
import { useNavigate } from "react-router";

const PathwayCard = ({ pathway }) => {
	const navigate = useNavigate();
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const { title, imgSrc, completionPercentage, description, link } = pathway;
	const toggleIsDropDownOpen = () => {
		setIsDropDownOpen((prev) => !prev);
	};

	return (
		<div
			className="flex flex-col border border-slate-200 shadow-2xl rounded-xl w-[300px] cursor-pointer"
			onClick={() => navigate(link)}
		>
			<div className="relative">
				<img
					src={`${imgSrc}?w=300&h=188&format=webp`}
					loading="lazy"
					className="h-[188px] overflow-hidden rounded-t-xl object-cover w-full z-[10]"
				/>

				<img
					src="/PathwayHamburgerIcon.svg"
					className="absolute top-[12px] right-[12px] hover:cursor-pointer"
					onClick={toggleIsDropDownOpen}
				/>

				{isDropDownOpen && (
					<div className="absolute top-[45px] -right-[126px] bg-white border border-gray-200 shadow-md rounded-md z-[50]">
						<div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
							Unpin Pathway
						</div>
						<div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
							Remove Pathway
						</div>
					</div>
				)}
			</div>

			<div className="flex flex-col p-[16px] gap-[24px]">
				<div className="flex flex-col gap-[5px]">
					<div className="text-md font-semibold">{title}</div>
					<div className="text-slate-500 text-sm">
						{completionPercentage}% Completed
					</div>
				</div>

				<div className="text-slate-700 text-sm">{description}</div>
			</div>
		</div>
	);
};

export default PathwayCard;
