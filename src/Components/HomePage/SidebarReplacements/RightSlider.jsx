import React, { useState } from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { IoCallOutline } from 'react-icons/io5'
import { BsCameraVideo } from 'react-icons/bs'
import {RiDeleteBinLine} from 'react-icons/ri'
import { TbFlag3 } from 'react-icons/tb'
import axios from 'axios'
import { setSecondRecall } from '../../../store/secondRecall'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const RightSlider = ({media, reciver, name, data, chatId}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [showBox, setShowBox] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };

    const deleteChat = async() => {
        await axios.post(`${BASE_URL}/api/chat/deletechat`,{
            chatId: chatId
          }, config).then(res => {
            dispatch(setSecondRecall())
            navigate('/home')
        })
    }
    return (
        <div className={`h-full bg-[#F8FAFF] dark:text-neutral-300 dark:bg-[#111111] border-l dark:border-neutral-800 transition-all ${!media && "-mr-[20rem]"}`}>
            <div className='h-[9vh] border-b dark:border-neutral-800 transition-colors flex items-center px-3'>
                <AiOutlineCloseCircle size={22}/>
                <div className='ml-2'>Contact Info</div>
            </div>
            <div className=' pt-5 w-[20rem] space-y-7 flex flex-col items-center'>
                <div className='w-[17rem] flex justify-center items-center'>
                    <img alt="ERROR" src={reciver.pic} className='h-[3.5rem] w-[3.5rem] rounded-full outline outline-1' />
                    <div className='ml-4 text-sm'>
                        <div className='capitalize text-[17px] font-medium'>{name}</div>
                    </div>
                </div>
                <div className='w-[17rem] flex justify-center space-x-6 py-1'>
                    <div className='flex flex-col items-center'>
                        <IoCallOutline />
                        <div>Audio</div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <BsCameraVideo />
                        <div>Video</div>
                    </div>
                </div>
                {
                    data !== '' &&
                    <div className='w-[17rem] flex flex-col'>
                        <div>Participants</div>
                        <div className='flex flex-wrap items-center w-[17rem] overflow-y-auto h-[5rem] mt-1 gap-x-2 gap-y-1 text-white'>
                            {data.map((item,index) => (
                                <div key={index} className='h-fit capitalize bg-theme px-2 rounded-md py-1'>{item.name}</div>
                            ))}
                        </div>
                    </div>
                }
                <div className='w-[17rem] flex justify-between items-center mx-5 border-t pb-20 pt-3 text-sm font-medium dark:border-neutral-800 transition-colors'>
                    <div>Media, links and docs</div>
                    <div className='text-base font-bold'>{'>'}</div>
                </div>
                <div className='w-[17rem] flex justify-between items-center mx-5 border-t border-b dark:border-neutral-800 transition-colors py-4 text-sm font-medium'>
                    <div>Starred Messages</div>
                    <div className='text-base font-bold'>{'>'}</div>
                </div>
                <div className='w-[17rem] flex justify-between items-center mx-5 space-x-7 text-theme'>
                    <div className='outline outline-2 outline-neutral-800 transition-colors  dark:text-neutral-300 text-neutral-800 w-full py-2 rounded-md flex justify-center items-center space-x-2' >
                        <TbFlag3/>
                        <div>Block</div>
                    </div>
                    <div className='outline outline-2 outline-neutral-800 transition-colors  dark:text-neutral-300 text-neutral-800 w-full py-2 rounded-md flex justify-center items-center space-x-2 cursor-pointer select-none' onClick={() => setShowBox(true)}>
                        <RiDeleteBinLine/>
                        <div>Delete</div>
                    </div>
                </div>
            </div>
            {showBox && 
                <div className='absolute left-[25%] top-[40%] bg-neutral-200 rounded-lg w-[23rem] h-[10rem] flex flex-col items-center justify-center transition-colors dark:bg-neutral-800 text-black dark:text-neutral-200'>
                    <div className='text-center'>Are tou sure you want to Delete this Conversation?</div>
                    <div className='flex space-x-10 mt-5'>
                        <div className='w-[3rem] text-center text-white py-1 bg-theme rounded cursor-pointer' onClick={deleteChat}>Yes</div>
                        <div className='w-[3rem] text-center text-white py-1 bg-red-500 rounded cursor-pointer' onClick={() => setShowBox(false)}>No</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RightSlider
