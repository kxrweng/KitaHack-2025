import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const SoftwareEngineerPath = () => {
	const navigate = useNavigate();

	const learningOutcomes = [
		"Develop and deploy software applications using industry best practices.",
		"Apply software engineering principles to design scalable and maintainable systems.",
		"Use version control, testing frameworks, and debugging techniques effectively.",
		"Work with databases and backend technologies to create full-stack applications.",
		"Implement security best practices in software development.",
		"Collaborate in a development team using Agile and DevOps methodologies.",
		"Demonstrate problem-solving skills through a final software engineering project.",
	];
	const modules = [
		{
			id: 1,
			name: "Introduction to Software Engineering",
			chapters: [
				"Overview of software development methodologies (Agile, Waterfall, DevOps)",
				"Software development lifecycle (SDLC)",
			],
		},
		{
			id: 2,
			name: "Programming Fundamentals",
			chapters: [],
		},
		{
			id: 3,
			name: "Software Design and Architecture",
			chapters: [],
		},
		{
			id: 4,
			name: "Version Control And Collaboration",
			chapters: [],
		},
		{
			id: 5,
			name: "Testing and Quality Assurance",
			chapters: [],
		},
		{
			id: 6,
			name: "Databases and Backend Development",
			chapters: [],
		},
		{
			id: 7,
			name: "Frontend Development and User Experience (UX)",
			chapters: [],
		},
		{
			id: 8,
			name: "Deployment and DevOps Basics",
			chapters: [],
		},
		{
			id: 9,
			name: "Security in Software Development",
			chapters: [],
		},
		{
			id: 10,
			name: "A Day in The Life of A Software Engineer",
			chapters: [],
		},
	];

	const [openModules, setOpenModules] = useState({});

	const toggleOpenModules = (index) => {
		setOpenModules((prev) => {
			return { ...prev, [index]: !prev[index] };
		});
	};

	const [isStickyPresent, setIsStickyPresent] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const imageHeight = 278;
			const currentWindowScrollHeight = window.scrollY;
			if (currentWindowScrollHeight > imageHeight) {
				setIsStickyPresent(true);
			} else {
				setIsStickyPresent(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="flex flex-col gap-[36px] relative">
			{isStickyPresent && (
				<div className="flex flex-row py-[36px] justify-between bg-white items-center px-[72px] top-0 sticky">
					<div className="font-semibold text-[#1E3A8A] text-xl">
						Software Engineer Pathway
					</div>
					<div
						className="rounded-xl py-[12px] px-[24px] hover:opacity-50 hover:cursor-pointer text-white bg-[#1D4ED8]"
						onClick={() => navigate("module_1")}
					>
						Start Course
					</div>
				</div>
			)}
			<div
				className="flex flex-row bg-cover max-w-screen h-[278px] bg-center"
				style={{
					backgroundImage:
						"linear-gradient(to top, rgba(30, 58, 138, 1), rgba(8, 15, 36, 0)), url('/SoftwareEngineerHero.jpeg')",
				}}
			>
				<div className="flex flex-row items-end justify-between w-full text-white text-xl px-[72px] py-[24px]">
					<div className="font-semibold">Software Engineer</div>
					<div
						onClick={() => navigate("module_1")}
						className="border border-white rounded-xl py-[12px] px-[24px] hover:cursor-pointer hover:text-white hover:bg-[#1D4ED8] transition-all 0.3 ease-in-out hover:border-none"
					>
						Start Course
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-[48px] px-[72px] pb-[36px]">
				<div className="flex flex-col gap-[16px]">
					<div className="text-xl font-semibold text-[#1E3A8A]">
						Introduction
					</div>
					<div className="leading-[32px] text-lg">
						Software engineering is the foundation of modern technology, driving
						innovation in industries ranging from healthcare to finance. This
						course provides a comprehensive understanding of software
						development, covering programming principles, system design, and
						software lifecycle management. Learners will gain hands-on
						experience building scalable and efficient software solutions while
						applying best practices in coding, testing, and deployment.
					</div>
				</div>

				<div className="flex flex-col gap-[16px]">
					<div className="text-xl font-semibold text-[#1E3A8A]">Modules</div>
					{modules.map((module) => {
						return (
							<div
								className="flex flex-col gap-[4px]"
								key={module.id}
							>
								<div className="flex flex-col py-[24px] px-[36px] gap-[10px] border border-slate-300 rounded-xl ">
									<div className="flex flex-row text-xl justify-between font-semibold">
										<div className="tracking-tighter">{module.name}</div>
										<div
											onClick={() => toggleOpenModules(module.id)}
											className="hover:cursor-pointer"
										>
											{openModules[module.id] ? (
												<div>&#94;</div>
											) : (
												<div>&#x2228;</div>
											)}
										</div>
									</div>
									{module.chapters.length > 0 ? (
										<ul
											className={`${
												openModules[module.id]
													? "list-disc list-inside"
													: "hidden"
											}`}
										>
											{module.chapters.map((chapter, idx) => (
												<li key={idx}>{chapter}</li>
											))}
										</ul>
									) : null}
								</div>
							</div>
						);
					})}
				</div>

				<div className="flex flex-col gap-[16px]">
					<div className="text-xl font-semibold text-[#1E3A8A]">
						Learning Outcomes
					</div>
					<div className="flex flex-col">
						<div className="leading-[32px] text-lg">
							By the end of the course, students will be able to:
						</div>
						<ul>
							{learningOutcomes.map((outcome, index) => (
								<li
									className="list-disc list-inside pl-2 leading-[32px] text-lg"
									key={index}
								>
									{outcome}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SoftwareEngineerPath;
