import React from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { IoCallOutline } from 'react-icons/io5'
import { MdOutlineGroups } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import {MdOutlineGroupAdd} from 'react-icons/md'


const SubSidebar = ({ setShow, show }) => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData"))
    return (
        <div className='w-[5.5rem] h-full flex flex-col items-center justify-between py-7 bg-[#F0F4FA]'>
            <div className='w-[3.5rem] flex flex-col items-center space-y-7 '>
                <div className='w-[3rem] h-[3rem] bg-[#AFBBF7] flex items-center justify-center p-2 rounded-xl'  onClick={() => navigate("")}>
                    <img alt="ERROR" src='https://res.cloudinary.com/de2rges3m/image/upload/v1693475079/Chat%20App/Budgie_tt8nv8.png' className='w-[1.7rem] h-[1.7rem] object-cover' />
                </div>
                <div className={`${(show === "Chats" || show === "") && 'bg-[#5B96F7] text-white transition-colors'} p-2 rounded-lg`} onClick={() => setShow("Chats")}>
                    <BiMessageSquareDetail className='' size={20} />
                </div>

                <div className={`${show === "People" && 'bg-[#5B96F7] text-white transition-colors'} p-2 rounded-lg`} onClick={() => setShow("People")}>
                    <MdOutlineGroupAdd className='' size={20} />
                </div>
                
                <div className={`${show === "Group" && 'bg-[#5B96F7] text-white transition-colors'} p-2 rounded-lg`} onClick={() => setShow("Group")}>
                    <MdOutlineGroups className='' size={20} />
                </div>

                <div className={`${show === "Calls" && 'bg-[#5B96F7] text-white transition-colors'} p-2 rounded-lg`} onClick={() => setShow("Calls")}>
                    <IoCallOutline className='' size={20} />
                </div>

                <div className='w-full h-[1px] bg-neutral-500'></div>

                <div className={`${show === "Setting" && 'bg-[#5B96F7] text-white transition-colors'} p-2 rounded-lg`} onClick={() => setShow("Setting")}>
                    <AiOutlineSetting className='' size={20} />
                </div>
            </div>
            <div className='w-[3.5rem] flex flex-col items-center space-y-7 '>
                <div className='w-[2.2rem] bg-[#5B96F7] rounded-full p-[3px]'>
                    <div className='w-[12px] h-[12px] rounded-full bg-[#F0F4FA] ml-auto'></div>
                </div>
                <div><img alt="ERROR" src={userData.pic} className='w-[2.5rem] h-[2.5rem] object-cover rounded-full' /></div>
            </div>
        </div>
    )
}

export default SubSidebar
