import React from "react";
import PathwayCard from "./PathwayCard";

const PathwayCardGrid = ({ pathways }) => {
	return (
		<div className="flex-wrap justify-between flex w-full px-[24px] py-[32px]">
			{pathways.map((pathway, index) => (
				<PathwayCard
					key={index}
					pathway={pathway}
				/>
			))}
		</div>
	);
};

export default PathwayCardGrid;
