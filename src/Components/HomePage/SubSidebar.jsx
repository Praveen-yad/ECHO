import React from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { IoCallOutline } from 'react-icons/io5'
import { MdOutlineGroups } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import {MdOutlineGroupAdd} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { setDark } from '../../store/darkMode'
import { TbSunFilled } from 'react-icons/tb'
import { HiMiniMoon } from 'react-icons/hi2'

const SubSidebar = ({ setShow, show }) => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData"))
    let Dark = useSelector(state  => state.darkMode)
    const dispatch = useDispatch()

    return (
        <div  className={`${Dark && 'dark'}`}>
            <div className={`w-[5.5rem] h-full flex flex-col items-center justify-between py-7 dark:bg-[#111111] bg-[#F0F4FA] transition-colors`}>
                <div className='w-[3.5rem] flex flex-col items-center space-y-7 '>
                    <div className='w-[3rem] h-[3rem] bg-[#000000] dark:bg-opacity-10 dark:bg-[#ffffff] transition-colors bg-opacity-10 flex items-center justify-center p-2 cursor-pointer rounded-xl'  onClick={() => navigate("")}>
                        <img alt="ERROR" src='https://res.cloudinary.com/de2rges3m/image/upload/v1693475079/Chat%20App/Budgie_tt8nv8.png' className='w-[1.7rem] h-[1.7rem] object-cover' />
                    </div>
                    <div className={`${(show === "Chats" || show === "") && 'bg-theme text-white transition-colors'} p-2 cursor-pointer dark:text-neutral-200 rounded-lg`} onClick={() => setShow("Chats")}>
                        <BiMessageSquareDetail className='' size={20} />
                    </div>

                    <div className={`${show === "People" && 'bg-theme text-white transition-colors'} p-2 cursor-pointer dark:text-neutral-200 rounded-lg`} onClick={() => setShow("People")}>
                        <MdOutlineGroupAdd className='' size={20} />
                    </div>
                    
                    <div className={`${show === "Group" && 'bg-theme text-white transition-colors'} p-2 cursor-pointer dark:text-neutral-200 rounded-lg`} onClick={() => setShow("Group")}>
                        <MdOutlineGroups className='' size={20} />
                    </div>

                    <div className={`${show === "Calls" && 'bg-theme text-white transition-colors'} p-2 cursor-pointer dark:text-neutral-200 rounded-lg`} onClick={() => setShow("Calls")}>
                        <IoCallOutline className='' size={20} />
                    </div>

                    <div className='w-full h-[1px] bg-neutral-500'></div>

                    <div className={`${show === "Setting" && 'bg-theme text-white transition-colors'} p-2 cursor-pointer dark:text-neutral-200 rounded-lg`} onClick={() => setShow("Setting")}>
                        <AiOutlineSetting className='' size={20} />
                    </div>
                </div>
                <div className='w-[3.5rem] flex flex-col items-center space-y-7 '>
                    <div className='w-[2.2rem] bg-neutral-800 dark:bg-neutral-200 rounded-full p-[3px]'onClick={() => {
                        dispatch(setDark())
                    }}>
                        <div className={`w-[12px] h-[12px] ml-auto -translate-x-[17px] transition-all text-sm dark:translate-x-0 text-neutral-200 dark:text-neutral-900 -translate-y-[1px]`}>
                            {Dark ?
                                <TbSunFilled/>
                                :
                                <HiMiniMoon/>
                            }
                        </div>
                    </div>
                    <div><img alt="ERROR" src={userData.pic} className='w-[2.5rem] h-[2.5rem] object-cover rounded-full' /></div>
                </div>
            </div>
        </div>
    )
}

export default SubSidebar
