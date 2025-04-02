import React from "react";

const Account = () => {
    const renderOneCol = (array: Array<number>) => {
        return <ul className="flex flex-col gap-[4px]">
            {(array.map((ele, i) => 
                <li key={i} value={i + 1} 
                className={`w-[16px] 
                    h-[16px] rounded-xs
                    ${ele > 0 ? ele > 5 ? ele > 10 ? "bg-blue-500" : "bg-blue-400" : "bg-blue-300" : "bg-slate-200"}`}/>
            ))}
          </ul>;
    };

    return <div className="flex gap-[18px] w-full">
        <div className="h-full w-[25vw] bg-white outline-1 outline-slate-300 p-[36px]">
            <div className="flex flex-col gap-[36px]">
                <img className="w-[120px] outline-4 outline-blue-700 rounded-[50%]" src="/UserAvatar.png"/>
                <div className="flex flex-col gap-[4px]">
                    <h2 className="text-[32px] text-blue-900 font-bold">KWLim</h2>
                    <h4 className="text-xl text-blue-900 font-semibold">24 Years Old</h4>
                    <h4 className="text-xl text-blue-900 font-semibold">Student</h4>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <h4 className="text-md text-blue-900 font-semibold">Field of Interest</h4>
                    <h3 className="text-xl text-blue-900 font-bold">Information Technology, Management</h3>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <h4 className="text-md text-blue-900 font-semibold">Career of Interest</h4>
                    <h3 className="text-xl text-blue-900 font-bold">Software Engineer, Project Manager</h3>
                </div>
                <button className="w-max px-[24px] py-[12px] bg-blue-700 text-white rounded-md">Edit Profile</button>
            </div>
        </div>
        <div className="pt-[18px] pr-[36px] w-[75vw]">
            <div className="flex flex-col h-full bg-white outline-1 outline-slate-300 p-[36px] rounded-lg gap-[36px]">
                <div className="flex flex-col gap-[16px]">
                    <h2 className="text-2xl font-bold text-blue-900">MBTI Personality Type</h2>
                    <div className="flex flex bg-blue-100 px-[36px] py-[24px] gap-[64px] rounded-md">
                        <div className="flex flex-col w-full gap-[16px]">
                            <div className="flex flex-col">
                                <div className="flex w-full justify-between">
                                    <p className="text-[14px] text-blue-900">Introvert</p>
                                    <p className="text-[14px] text-blue-900">Extrovert</p>
                                </div>
                                <div className="relative bg-white p-[1px] w-full rounded-4xl">
                                    <div className="flex items-center justify-end pr-[36px] text-white h-[32px] bg-blue-900 w-[10%] rounded-4xl">10%</div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex w-full justify-between">
                                    <p className="text-[14px] text-blue-900">Intuitive</p>
                                    <p className="text-[14px] text-blue-900">Observant</p>
                                </div>
                                <div className="relative bg-white p-[1px] w-full rounded-4xl">
                                    <div className="flex items-center justify-end pr-[36px] text-white h-[32px] bg-blue-900 w-[30%] rounded-4xl">30%</div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex w-full justify-between">
                                    <p className="text-[14px] text-blue-900">Feeling</p>
                                    <p className="text-[14px] text-blue-900">Thinking</p>
                                </div>
                                <div className="relative bg-white p-[1px] w-full rounded-4xl">
                                    <div className="flex items-center justify-end pr-[36px] text-white h-[32px] bg-blue-900 w-[20%] rounded-4xl">20%</div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex w-full justify-between">
                                    <p className="text-[14px] text-blue-900">Judging</p>
                                    <p className="text-[14px] text-blue-900">Prospecting</p>
                                </div>
                                <div className="relative bg-white p-[1px] w-full rounded-4xl">
                                    <div className="flex items-center justify-end pr-[36px] text-white h-[32px] bg-blue-900 w-[40%] rounded-4xl">40%</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-[12px]">
                            <img src="/MBTI.png"/>
                            <h3 className="text-blue-900 text-3xl font-bold">INFJ</h3>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[16px]">
                    <h2 className="text-2xl font-bold text-blue-900">Activity</h2>
                    <div className="flex justify-between">
                        {Array.from({length: 52},(_, i) => {
                            const renderedCol = i % 2 == 0 ? renderOneCol([0, 1, 6, 11, 2, 7, 12]) : renderOneCol([0, 0, 11, 1, 6, 2, 0]);
                            return renderedCol;
                            })}
                    </div>
                </div>
                <div className="flex flex-col gap-[16px]">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-blue-900">Activity History</h2>
                        <button className="text-blue-900 outline-1 outeline-blue-900 px-[24px] py-[12px] rounded-lg">View All</button>
                    </div>
                    <ul className="flex flex-col gap-[8px]">
                        <li className="flex justify-between w-full bg-slate-100 p-[16px] rounded-md">
                            <p>19 March</p>
                            <p>4 hours 55 minutes</p>
                            <p></p>
                        </li>
                        <li className="flex justify-between w-full bg-slate-100 p-[16px] rounded-md">
                            <p>18 March</p>
                            <p>4 hours 55 minutes</p>
                            <p></p>
                        </li>
                        <li className="flex justify-between w-full bg-slate-100 p-[16px] rounded-md">
                            <p>17 March</p>
                            <p>4 hours 55 minutes</p>
                            <p></p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
};

export default Account;