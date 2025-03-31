import React from "react";
import { Outlet } from "react-router-dom";

const InterviewPracticeLayout = () => {
    return (
        <div className="w-screen h-screen flex flex-col">
			<div className="flex flex-1 bg-gradient-to-r from-[#DBEBFF] to-[#A4AAFF]">
				<Outlet />
			</div>
        </div>
    );
};

export default InterviewPracticeLayout;
