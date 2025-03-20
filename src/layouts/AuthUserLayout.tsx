import React from "react";
import { Outlet } from "react-router-dom";
import AuthUserHeader from "../components/AuthUserComponents/AuthUserHeader";
import AuthUserFooter from "../components/AuthUserComponents/AuthUserFooter";
const AuthUserLayout = () => {
	return (
		<div className="flex flex-col w-screen h-screen">
			<div className="flex">
				<AuthUserHeader />
			</div>

			<div className="flex w-full bg-slate-100">
				<Outlet />
			</div>

			<div className="mt-auto">
				<AuthUserFooter />
			</div>
		</div>
	);
};

export default AuthUserLayout;
