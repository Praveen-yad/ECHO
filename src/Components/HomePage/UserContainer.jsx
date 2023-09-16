import React from "react";
import { useSelector } from "react-redux";

const UserContainer = ({ name, pic, id, lastMsg, sendersName, sendersId, timeStamp, notify }) => {
    const activeId = useSelector(state => state.activeChat)
    let time = ''

    if(timeStamp){
        const newTimeStamp = new Date(timeStamp).getTime()
        time = new Intl.DateTimeFormat('en-In',{
        timeZone:'Asia/Kolkata',
        timeStyle: "short"
        }).format(newTimeStamp)
    }else{
        time = ''
    }

    
    return (
        <div className={`h-[4rem] px-3 rounded-xl w-full flex items-center hover:bg-neutral-700 ${activeId === id ? "bg-neutral-700" : "bg-[#F0F4FA]"} transition-colors cursor-pointer group`}>
            <div className=" w-[3.5rem] ">
                <img 
                    alt="ERROR"
                    src={pic}
                    className={`w-[2.5rem] h-[2.5rem] object-cover rounded-full outline group-hover:outline-white transition-all outline-2 ${activeId === id ? "outline-white" : "outline-neutral-500"}`}/>
            </div>
            <div className="ml-2 w-full flex flex-col text-sm">
                <div
                    className={`flex justify-between ${activeId === id ? "text-white" : "text-neutral-800"}`}>
                    <div
                        className={`w-[9rem] truncate capitalize font-semibold group-hover:text-white transition-colors`}>
                        {name}
                    </div>
                    <div className="text-xs w-fit group-hover:text-white transition-colors">
                        {time}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className={`text-xs w-[10rem] flex truncate ${activeId === id ? "text-neutral-200" : "text-neutral-600"} group-hover:text-neutral-200 transition-colors`}>
                        <div className="capitalize">{(sendersId === localStorage.getItem('id')) ? 'You:\xa0' : sendersName}</div>
                        <div className="w-full">{lastMsg || "No Conversation Yet"}</div>
                    </div>
                    {notify && 
                        <div className="bg-[#5B96F7] w-3 h-3 rounded-full"></div> 
                    }
                </div>
            </div>
        </div>
    );
};

export default UserContainer;
