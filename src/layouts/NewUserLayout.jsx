import React from "react";
import NewUserHeader from "../components/NewUserComponents/Layout/NewUserHeader";
import { Outlet } from "react-router-dom";

const NewUserLayout = () => {
	return (
		<div className="w-screen h-screen bg-gradient-to-r from-[#DBEBFF] to-[#A4AAFF] flex flex-col">
			<NewUserHeader />
			<div className="flex flex-grow justify-center items-center">
				<Outlet />
			</div>
		</div>
	);
};

export default NewUserLayout;
