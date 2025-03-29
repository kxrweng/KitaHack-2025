import React, { useState } from "react";
import { useNavigate } from "react-router";

const Landing = () => {
	const navigate = useNavigate();

	const toBuildResume = () => navigate("build/details");
	const [uploadedFileName, setUploadedFileName] = useState("");

	const handleFileUpload = (e) => {
		setUploadedFileName(e.target.files[0].name);
	};
	return (
		<div className=" mx-[72px] py-[100px] px-[72px] border border-slate-300 w-full mt-[120px] bg-white">
			<div className="flex flex-col justify-center items-center gap-9 ">
				<div className="text-[#1E3A8A] font-semibold text-2xl ">
					Welcome to Resume Builder!
				</div>
				<div className="flex w-full py-[80px] bg-[#EFF6FF] flex-col outline-dotted outline-[#94A3B8]  justify-center items-center gap-[16px]">
					<div className="text-slate-700 text-lg">
						Upload your current resume as PDF for feedback
					</div>
					{/* <button className="bg-[#1D4ED8] rounded-xl py-3 px-6 text-white">
						Upload Resume
					</button> */}
					<label
						htmlFor="file-upload"
						className="bg-[#1D4ED8] rounded-xl py-3 px-6 text-white cursor-pointer"
					>
						Upload Resume
					</label>
					<input
						id="file-upload"
						type="file"
						className="hidden"
						onChange={(e) => handleFileUpload(e)}
					/>
					{uploadedFileName ? (
						<div> {uploadedFileName} </div>
					) : (
						<div>No Files Uploaded</div>
					)}
				</div>
				<div className="flex w-full gap-[24px] items-center justify-center ">
					<hr className="flex flex-grow border-t-1 border-slate-700" />
					<span className="text-slate-700 text-lg ">or</span>
					<hr className="flex flex-grow border-t-1 border-slate-700" />
				</div>

				<div className="text-slate-700 text-lg">
					Don’t have a resume yet? Fret not since we are here to guide you along
					the way!
				</div>

				<button
					onClick={toBuildResume}
					className="border border-blue-900 py-[12px] px-[24px] text-blue-900 text-lg rounded-lg hover:bg-[#1D4ED8] hover:text-white hover:border-none transition-all 0.3s ease-in-out hover:cursor-pointer"
				>
					Build a Resume
				</button>
			</div>
		</div>
	);
};

export default Landing;
