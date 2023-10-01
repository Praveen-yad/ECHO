import React from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { IoCallOutline } from 'react-icons/io5'
import { BsCameraVideo } from 'react-icons/bs'
import {RiDeleteBinLine} from 'react-icons/ri'
import { TbFlag3 } from 'react-icons/tb'
const RightSlider = ({media, reciver, name, data}) => {
    return (
        <div className={`h-full bg-[#F8FAFF] border-l transition-all ${!media && "-mr-[20rem]"}`}>
            <div className='h-[9vh] border-b flex items-center px-3'>
                <AiOutlineCloseCircle size={22}/>
                <div className='ml-2'>Contact Info</div>
            </div>
            <div className=' pt-5 w-[20rem] space-y-7 flex flex-col items-center'>
                <div className='w-[17rem] flex justify-center items-center'>
                    <img src={reciver.pic} className='h-[3.5rem] w-[3.5rem] rounded-full outline outline-1' />
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
                <div className='w-[17rem] flex justify-between items-center mx-5 border-t pb-20 pt-3 text-sm font-medium'>
                    <div>Media, links and docs</div>
                    <div className='text-base font-bold'>{'>'}</div>
                </div>
                <div className='w-[17rem] flex justify-between items-center mx-5 border-t border-b py-4 text-sm font-medium'>
                    <div>Starred Messages</div>
                    <div className='text-base font-bold'>{'>'}</div>
                </div>
                <div className='w-[17rem] flex justify-between items-center mx-5 space-x-7 text-theme'>
                    <div className='outline outline-2 outline-theme w-full py-2 rounded-md flex justify-center items-center space-x-2'>
                        <TbFlag3/>
                        <div>Delete</div>
                    </div>
                    <div className='outline outline-2 outline-theme w-full py-2 rounded-md flex justify-center items-center space-x-2'>
                        <RiDeleteBinLine/>
                        <div>Block</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightSlider
