import { pinnedPathway } from "../../../data/PinnedPathway";

import React from "react";
import PathwayCard from "./PathwayCard";

const PathwayCardGrid = () => {
	return (
		<div className="grid grid-cols-4 gap-[32px] ">
			{pinnedPathway.map((pathway, index) => (
				<PathwayCard
					key={index}
					pathway={pathway}
				/>
			))}
		</div>
	);
};

export default PathwayCardGrid;
