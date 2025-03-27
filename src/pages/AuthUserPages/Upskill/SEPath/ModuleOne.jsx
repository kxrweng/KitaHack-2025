import React, { useState } from "react";
import { SEModules } from "../../../../data/SEModules";
import { IoSendSharp } from "react-icons/io5";
import { GoogleGenAI } from "@google/genai";

const ModuleOne = () => {
	const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

	const [selectedState, setSelectedState] = useState({
		module: SEModules[0],
		chapter: SEModules[0].chapters[0],
	});

	const [conversation, setConversation] = useState([]);
	const [messageInput, setMessageInput] = useState("");
	const [messageInputLoadingStatus, setMessageInputLoadingStatus] =
		useState(false);
	const [response, setResponse] = useState({});

	const [showStatus, setShowStatus] = useState({
		moduleContainer: true,
		expandedModule: true,
		chatContainer: true,
	});

	const chat = ai.chats.create({
		model: "gemini-1.5-flash-8b",
		history: conversation,
		config: {
			maxOutputTokens: 50,
			candidateCount: 1,
			temperature: 0.1,
			systemInstruction:
				"Give brief,concise answers paragraphically. No point forms",
		},
	});

	const getResponse = async (message) => {
		const response = await chat.sendMessage({
			message,
		});
		setResponse(response);
		return response;
	};

	const handleSendMessage = async (message) => {
		setMessageInput(message);
		setMessageInputLoadingStatus(true);

		try {
			const response = await getResponse(message);
			const responseText = response.text;

			const userPart = { role: "user", parts: [{ text: message }] };
			const modelPart = { role: "model", parts: [{ text: responseText }] };

			setConversation((prev) => {
				const updatedConversation = [...prev, userPart, modelPart];
				localStorage.setItem(
					"chatHistory",
					JSON.stringify(updatedConversation)
				);
				return updatedConversation;
			});
		} catch (error) {
			console.log(error);
		} finally {
			setMessageInput("");
			setMessageInputLoadingStatus(false);
		}
	};

	const setSelectedChapter = (chapter) => {
		return setSelectedState((prev) => ({
			...prev,
			chapter,
		}));
	};
	const setSelectedModule = (module) => {
		setSelectedState((prev) => {
			const moduleIndex = SEModules?.indexOf(module);
			const chapter =
				moduleIndex !== -1 ? SEModules[moduleIndex]?.chapters?.[0] : undefined;

			return {
				...prev,
				module,
				chapter,
			};
		});
		toggleHideExpandedModule();
	};

	const toggleHideExpandedModule = () => {
		setShowStatus((prev) => ({
			...prev,
			expandedModule: !prev.expandedModule,
		}));
	};

	const toggleHideModuleContainer = () =>
		setShowStatus((prev) => ({
			...prev,
			moduleContainer: !prev.moduleContainer,
		}));
	const toggleHideChatContainer = () =>
		setShowStatus((prev) => ({
			...prev,
			chatContainer: !prev.chatContainer,
		}));

	return (
		<div className="flex flex-row w-screen gap-[18px] relative">
			{/* Above is outer container  */}
			{showStatus.moduleContainer && (
				<div
					className={`flex flex-col basis-[15%] bg-white border-r-1  border-slate-300 }`}
				>
					{/* Above is chapter listing container  */}
					<div className="flex flex-row justify-between font-semibold text-lg p-[20px]">
						<div>Software Engineer Pathway</div>
						<div onClick={toggleHideModuleContainer}>&lt;</div>
					</div>
					<div className="flex flex-col">
						{SEModules.map((module) => (
							<>
								<div
									className="flex flex-row justify-between pl-[36px] pr-[20px] py-[20px] font-semibold"
									key={module.id}
									onClick={() => setSelectedModule(module)}
								>
									<div className="text-[#1D4ED8] text-wrap">{module.name}</div>
									<div
										onClick={(e) => {
											e.stopPropagation();
											toggleHideExpandedModule();
										}}
										className="hover:cursor-pointer"
									>
										{showStatus.expandedModule ? "\u2228" : "\u2227"}
									</div>
								</div>
								{showStatus.expandedModule && (
									<div className="flex flex-col w-full  ">
										{module.chapters.map((chapter, index) => (
											<div
												key={index}
												className={`flex py-[20px] px-[48px] ${
													selectedState.chapter === chapter
														? "text-white bg-[#1D4ED8]"
														: "bg-slate-200 text-black"
												}`}
												onClick={() => setSelectedChapter(chapter)}
											>
												{chapter.header.title}
											</div>
										))}
									</div>
								)}
							</>
						))}
					</div>
				</div>
			)}

			{!showStatus.moduleContainer && (
				<button
					className="fixed left-0  top-1/2 -translate-y-1/2 flex items-center justify-center w-[70px] h-[70px] bg-white border border-gray-300 shadow-lg rounded-r-full text-gray-600 hover:bg-gray-100 hover:text-gray-800 active:scale-95 transition-all duration-300"
					onClick={toggleHideModuleContainer}
				>
					<span className="text-3xl font-bold">&gt;</span>
				</button>
			)}

			<div
				className={`flex flex-col gap-[48px] flex-1 px-[36px] py-[24px] my-[18px] border border-[#CBD5E1] bg-white ${
					showStatus.moduleContainer ? "" : "ml-[18px]"
				}`}
			>
				{/* Above is course container*/}
				<div className="flex ">
					<div className="text-blue-900 font-semibold text-2xl">
						{selectedState.chapter.header.title}
					</div>
				</div>

				<div className="flex flex-col gap-[16px]">
					<div className="text-2xl text-[#334155] font-semibold">
						{selectedState.chapter.header.subtitle}
					</div>

					<div>{selectedState.chapter.header.description}</div>

					<div className="w-full rounded-xl">
						<iframe
							src="https://www.youtube.com/embed/dQw4w9WgXcQ"
							className="w-full h-[630px] rounded-xl"
							allowFullScreen
						></iframe>
					</div>
				</div>
				<div className="flex flex-col gap-[16px]">
					<div className="text-[#334155] font-semibold text-2xl ">
						{selectedState.chapter.body.title}
					</div>

					<div className="flex flex-col">
						<ol>
							{selectedState.chapter.body.content.map((content, index) => (
								<li className="">
									<div
										className={`flex flex-col list-decimal  py-[12px] px-[16px]  ${
											index % 2 === 0 ? "bg-slate-100" : "bg-blue-100"
										}`}
									>
										<div className="list-decimal font-semibold ">{`${
											index + 1
										}. ${content.title}`}</div>

										<ul className="list-item mt-[5px]">
											{content.points.map((point) => (
												<li className="list-disc list-inside mt-[3px]">
													{point}
												</li>
											))}
										</ul>
									</div>
								</li>
							))}
						</ol>
					</div>

					<div className="flex flex-col gap-[5px]">
						<div className="text-2xl font-semibold">
							{selectedState.chapter.footer.title}
						</div>
						<ul>
							{selectedState.chapter.footer.points.map((point) => (
								<li className="list-disc list-inside mt-[3px]">{point}</li>
							))}
						</ul>
					</div>
				</div>

				<div className="flex flex-col gap-[15px] py-[12px] px-[16px] rounded-lg bg-[#334155]">
					<div className="flex text-xl text-white">Exercises</div>
					<div className="flex flex-col gap-[12px]">
						{selectedState.chapter.exercises.map((exercise) => (
							<div className="flex flex-row justify-between">
								<div className="text-[#F1F5F9]">{exercise.question}</div>
								<input
									type="text"
									placeholder="Input Your Answer"
									className="px-[16px] py-[12px] text-[#CBD5E1] rounded-lg bg-[#64748B]"
								/>
							</div>
						))}
					</div>
					<div className="flex pb-[12px]  justify-center">
						<button className="items-center px-[24px] py-[12px] rounded-lg border border-white text-white hover:opacity-50 hover:transition-all hover:ease-in-out">
							Submit Answer
						</button>
					</div>
				</div>
			</div>

			{showStatus.chatContainer && (
				<div
					className={`flex flex-col border-l-1 sticky  right-0 top-0 border-slate-300 h-screen 
						${showStatus.moduleContainer ? "w-[15%]" : "w-[30%]"}`}
				>
					{/* Header (Fixed) */}
					<div className="flex flex-row gap-[10px] p-[16px] items-center border-b-1 bg-white border-slate-300 justify-between sticky top-0">
						<div className="font-semibold text-xl flex items-center justify-center text-[#1E3A8A]">
							Miles Chat
						</div>
						<div
							className="text-xl font-semibold cursor-pointer"
							onClick={toggleHideChatContainer}
						>
							X
						</div>
					</div>

					{/* Chat Messages (Scrollable) */}
					<div className="bg-[#DBEAFE] flex flex-col py-[24px] px-[12px] gap-[12px] flex-1 overflow-auto">
						<div className="flex flex-col gap-[4px] ">
							<div className="text-[#64748B] mr-auto font-semibold">
								Miles 🤖
							</div>
							<div className="bg-white rounded-xl px-[12px] py-[16px]">
								Hello KWLim! Great to see you here!
							</div>
						</div>
						{
							conversation.length > 0 &&
								conversation.map((chat) => (
									<>
										{chat.role === "user" ? (
											<div className="flex flex-col ml-auto gap-[4px] ">
												<div className="text-[#64748B] ml-auto font-semibold ">
													👤 KWLim
												</div>
												<div className="bg-[#93C5FD] rounded-xl px-[12px] py-[16px]">
													{chat.parts[0].text}
												</div>
											</div>
										) : (
											<div className="flex flex-col gap-[4px]">
												<div className="text-[#64748B] mr-auto font-semibold">
													Miles 🤖
												</div>
												<div className="bg-white rounded-xl px-[12px] py-[16px]">
													{chat.parts[0].text}
												</div>
											</div>
										)}
									</>
								)) //If it is user, map this style, if it is miles, map that style
						}
					</div>

					{/* Chat Input (Fixed at Bottom) */}
					<div
						className={` flex flex-row bg-[#DBEAFE]
						items-center py-[16px] overflow-auto text-wrap px-[12px] justify-between sticky bottom-0`}
					>
						<div
							className={`flex flex-row  rounded-full  justify-between px-[24px] py-[16px] items-center w-full gap-5 ${
								messageInputLoadingStatus ? "bg-slate-300" : "bg-white"
							} }`}
						>
							<input
								placeholder={
									messageInputLoadingStatus
										? "Sending message..."
										: "Ask Anything!"
								}
								className="focus:outline-none w-full overflow-y-auto text-wrap"
								disabled={messageInputLoadingStatus}
								onChange={(e) => {
									setMessageInput(e.target.value);
								}}
								value={messageInput}
							/>
							{!messageInputLoadingStatus && (
								<IoSendSharp
									className="hover:cursor-pointer"
									onClick={(e) => {
										e.preventDefault();
										handleSendMessage(messageInput);
									}}
								/>
							)}
						</div>
					</div>
				</div>
			)}

			{!showStatus.chatContainer && (
				<button
					className="fixed right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[70px] rounded-l-full h-[70px] shadow-lg  text-gray-600 hover:bg-gray-100 hover:text-gray-800 active:scale-95 transition-all duration-300"
					onClick={toggleHideChatContainer} // Corrected function to toggle chatContainer
				>
					<img
						src="/ChatBotIcon.png"
						className="bg-[#3B82F6] rounded-l-full object-fill object-bottom"
					/>
				</button>
			)}
		</div>
	);
};

export default ModuleOne;
