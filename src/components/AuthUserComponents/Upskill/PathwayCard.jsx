import React from "react";

const PathwayCard = ({ pathway }) => {
	console.log(pathway);
	const { title, imgSrc, completionPercentage, description } = pathway;

	return (
		<div className="flex flex-col border border-slate-400 shadow-2xl rounded-xl w-[300px]">
			<div>
				<img
					src={imgSrc}
					className=" h-[188px] overflow-hidden rounded-t-xl"
				/>
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
