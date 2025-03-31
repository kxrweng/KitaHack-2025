import React, {useState} from "react";
import { useNavigate } from "react-router";

const MoreRoles = () => {
    const [value, setValue] = useState("");
    const [isSelected, setIsSelected] = useState(false);
	const navigate = useNavigate();
	const navigateToInterviewLanding = () => navigate("/auth_user/interview_practice");
    const navigateToInterviewAspects = () => navigate("/auth_user/interview_practice/aspects");
    const someRoles = [
        {"roleName": "Software Engineer"},
        {"roleName": "Data Analyst"}, 
        {"roleName": "Data Engineer"}, 
        {"roleName": "Data Scientist"}
    ]

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setValue(event.target.value);
        setIsSelected(false);
    };

    const handleRoleClick = (roleName: string) => {
        setValue(roleName);
        setIsSelected(true);
    };

	return (
		<div className="w-full flex flex-col justify-center items-center py-[48px]">
			<div className="flex flex-col h-[680px] justify-between py-[48px] px-[64px] bg-white outline-slate-500 rounded-xl outline-1">
                <div className="flex flex-col gap-[36px] justify-center items-center">
                    <div className="text-blue-900 font-bold text-[32px]">Welcome to Interview Practice!</div>

                    <div className="flex flex-col gap-[12px]">
                        <div className="text-slate-700 font-semibold text-2xl">
                            Let's find the role which you are interviewing for:
                        </div>
                        <div>
                            <input 
                                className="bg-white px-[24px] py-[20px] w-full h-[56px] text-[20px] outline-slate-300 rounded-xl outline-1" 
                                placeholder="Enter your role"
                                onChange={handleChange}
                                value={value}
                            />
                            {value && !isSelected &&
                                <ul className="outline-slate-300 rounded-xl outline-1">
                                    {
                                        someRoles.filter((item) => {
                                            return item.roleName.toLowerCase().startsWith(value.toLowerCase());
                                        }).map((item) => (
                                            <li 
                                            key={item.roleName} 
                                            className="py-[20px] px-[24px] bg-white text-slate-700 text-[20px] cursor-pointer rounded-xl hover:bg-slate-100"
                                            onClick={() => handleRoleClick(item.roleName)}
                                            >
                                                {item.roleName}
                                            </li>
                                        ))
                                    }
                                </ul>
                            }
                        </div>
                    </div>
                </div>

				<div className="flex flex-row justify-between">
                    <button
						className="bg-transparent flex items-center justify-center text-blue-900 text-md py-[12px] px-[24px] rounded-lg outline-1 outline-blue-900 hover:cursor-pointer"
						onClick={navigateToInterviewLanding}
					>
						Previous
					</button>
					<button
						className="bg-[#1D4ED8] flex items-center justify-center text-white text-md py-[12px] px-[24px] rounded-lg hover:cursor-pointer"
						onClick={navigateToInterviewAspects}
					>
						Proceed
					</button>
				</div>
			</div>
		</div>
	);
};

export default MoreRoles;
