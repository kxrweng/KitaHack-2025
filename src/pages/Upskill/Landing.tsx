import React, { useState } from "react";
import PathwayCard from "../../components/AuthUserComponents/Upskill/PathwayCard";
import PathwayCardGrid from "../../components/AuthUserComponents/Upskill/PathwayCardGrid";
import { pinnedPathway } from "../../data/PinnedPathway";
import { recommendedPathway } from "../../data/RecommendedPathway";

const Landing = () => {
	const chunkArray = (arr, size) => {
		return arr.reduce((acc, _, i) => {
			if (i % size === 0) acc.push(arr.slice(i, i + size));
			return acc;
		}, []);
	};

	const recommendedPathwayChunks = chunkArray(recommendedPathway, 4);

	const [isFilterDropDownOpen, setIsFilterDropDownOpen] = useState(false);

	const toggleIsFilterDropDownOpen = () => {
		setIsFilterDropDownOpen((prev) => !prev);
	};

	return (
		<div className="w-full px-[72px] py-[36px] gap-[48px] flex flex-col relative">
			{isFilterDropDownOpen && (
				<div className="fixed inset-0 flex justify-center items-center bg-[rgba(49,49,49,0.8)] z-[99]">
					<div className="bg-white relative   flex  flex-col py-[48px] px-[64px] gap-[36px] rounded-xl">
						<div className="flex flex-row  justify-between w-full">
							<div className="text-[#1E3A8A] font-semibold text-xl">
								Filter Pathways
							</div>
							<div
								className="text-[#1E3A8A] font-semibold text-xl hover:cursor-pointer"
								onClick={toggleIsFilterDropDownOpen}
							>
								X
							</div>
						</div>

						<div className="flex flex-col gap-[36px]">
							<div className="flex flex-col gap-[16px]">
								<div className="text-[#1E3A8A] font-semibold text-xl">
									Interested Fields
								</div>
								<div className="flex flex-row gap-[16px]">
									<div className="border items-center text-center text-[#1E3A8A] border-[#1E3A8A] rounded-full px-[16px] py-[5px]">
										Information Technology
									</div>
									<div className="border items-center text-center text-[#1E3A8A] border-[#1E3A8A] rounded-full px-[16px] py-[5px]">
										Management
									</div>
									<div className="border items-center text-center text-[#1E3A8A] border-[#1E3A8A] rounded-full px-[16px] py-[5px]">
										Add More
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-[16px]">
								<div className="text-[#1E3A8A] font-semibold text-xl">
									Interested Role(s)
								</div>
								<div className="flex flex-row gap-[16px]">
									<div className="border items-center text-center text-[#1E3A8A] border-[#1E3A8A] rounded-full px-[16px] py-[5px]">
										Software Engineer
									</div>
									<div className="border items-center text-center text-[#1E3A8A] border-[#1E3A8A] rounded-full px-[16px] py-[5px]">
										Data Scientist
									</div>
									<div className="border items-center text-center text-[#1E3A8A] border-[#1E3A8A] rounded-full px-[16px] py-[5px]">
										Cashier
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-[16px]">
								<div className="text-[#1E3A8A] font-semibold text-xl">
									MBTI Personality
								</div>
								<div className="flex flex-row gap-[16px]">
									<div className="border items-center text-center text-[#1E3A8A] border-[#1E3A8A] rounded-full px-[16px] py-[5px]">
										INTJ
									</div>
									<div className="border items-center text-center text-[#1E3A8A] border-[#1E3A8A] rounded-full px-[16px] py-[5px]">
										Management
									</div>
									<div className="border items-center text-center text-[#1E3A8A] border-[#1E3A8A] rounded-full px-[16px] py-[5px]">
										Add More
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="flex justify-center">
				<img src="/WelcomeHero.png" />
			</div>

			<div className="flex flex-col gap-[16px]">
				<div className="text-2xl font-semibold text-[#1E3A8A]">
					Pinned Pathways
				</div>
				<div className="flex flex-row justify-between">
					<div className="flex items-center border w-[320px] py-[10px] px-[5px] rounded-xl">
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

						<div
							className="text-[#1D4ED8] hover:cursor-pointer"
							onClick={toggleIsFilterDropDownOpen}
						>
							Filter Pathways
						</div>
					</div>
				</div>
			</div>
			<div className="">
				<PathwayCardGrid pathways={pinnedPathway} />
			</div>

			<div className="flex flex-row justify-between">
				<div className="text-2xl font-semibold text-[#1E3A8A]">
					Other Recommended Pathways
				</div>
				<div className="flex flex-row justify-between">
					<div className="flex flex-row items-center border w-[200px] p-[16px]  rounded-xl gap-[10px] border-[#1D4ED8]">
						<div>
							<img src="/ViewMoreIcon.svg" />
						</div>

						<div className="text-[#1D4ED8]">View More</div>
					</div>
				</div>
			</div>
			<div>
				{recommendedPathwayChunks.map((chunk, index) => (
					<PathwayCardGrid
						key={index}
						pathways={chunk}
					/>
				))}{" "}
			</div>
		</div>
	);
};

export default Landing;
