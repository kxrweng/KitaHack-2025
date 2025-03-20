import React from "react";
import PathwayCard from "../../components/AuthUserComponents/Upskill/PathwayCard";
import PathwayCardGrid from "../../components/AuthUserComponents/Upskill/PathwayCardGrid";

const Landing = () => {
	return (
		<div className="w-full h-full px-[72px] py-[36px] gap-[48px] flex flex-col">
			<div className="flex justify-center">
				<img src="/WelcomeHero.png" />
			</div>

			<div className="flex flex-col gap-[16px]">
				<div className="text-2xl font-semibold text-[#1E3A8A]">
					Pinned Pathways
				</div>
				<div className="flex flex-row justify-between">
					<div className="flex items-center border w-[320px] py-[12px] px-[10px] rounded-xl gap-[10px]">
						<div className="flex basis-[20%]">
							<img src="/SearchIcon.svg" />
						</div>

						<div className="flex-grow flex">
							<input
								type="text"
								placeholder="Search pathways"
								className="py-[5px] px-[10px]"
							/>
						</div>

						<div className=" flex">
							<img src="/ClearIcon.svg" />
						</div>

						<div></div>
					</div>

					<div className="flex flex-row items-center border w-[200px] p-[16px]  rounded-xl gap-[10px] border-[#1D4ED8]">
						<div>
							<img src="/FilterIcon.svg" />
						</div>

						<div className="text-[#1D4ED8]">Filter Pathways</div>
					</div>
				</div>
			</div>
			<div className="">
				<PathwayCardGrid />
			</div>
		</div>
	);
};

export default Landing;
