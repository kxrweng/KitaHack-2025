import React from "react";
import { Outlet } from "react-router-dom";
import AuthUserHeader from "../components/AuthUserComponents/Layout/AuthUserHeader";
import AuthUserFooter from "../components/AuthUserComponents/Layout/AuthUserFooter";
const AuthUserLayout = () => {
	return (
		<div className="flex flex-col max-w-screen ">
			<div className="flex ">
				<AuthUserHeader />
			</div>

			<div className="flex flex-1 bg-slate-100 ">
				<Outlet />
			</div>

			<div className="mt-auto">
				<AuthUserFooter />
			</div>
		</div>
	);
};

export default AuthUserLayout;
