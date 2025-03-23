import React from "react";

const ModuleOne = () => {
	return (
		<div className="flex flex-row w-screen gap-[18px]">
			{/* Above is outer container  */}
			<div className="flex flex-col basis-[15%] bg-blue-600">
				{/* Above is chapter listing container  */}
				<div className="flex flex-row">
					<div>Software Engineer Pathway</div>
					<div>&lt;</div>
				</div>
			</div>

			<div className="flex flex-row flex-1 bg-orange-600">
				{/* Above is center (content) container*/}
				Content
			</div>

			<div className="flex flex-col basis-[15%] bg-purple-700">
				{/* Above is ChatBot container */}
				Chatbot
			</div>
		</div>
	);
};

export default ModuleOne;
