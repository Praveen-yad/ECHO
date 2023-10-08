import React from 'react'
import {BsTriangleFill} from 'react-icons/bs'
import { useSelector } from 'react-redux'

const GroupMsg = ({message, timeStamp , sender, data, index}) => {
  const Dark = useSelector(state => state.darkMode)
  const newTimeStamp = new Date(timeStamp).getTime()
  const time = new Intl.DateTimeFormat('en-In',{
    timeZone:'Asia/Kolkata',
    timeStyle: "short"
  }).format(newTimeStamp)
  return (
    <div className={`w-full mt-4 ${Dark && 'dark'}`}>
        <div className='relative w-fit flex-col bg-white  dark:bg-neutral-900 transition-colors rounded-bl-lg rounded-r-lg pl-3 pr-3 py-2'>
          {sender ? 
            <div className='capitalize text-theme font font-medium'>{data[index === 0 ? index : index-1].sender.name === data[index].sender.name && sender.name}</div>
            :
            <div></div>
          }
          <div className='flex w-fit'>
            <div className='w-fit max-w-[23rem] text-black text-[17px] dark:text-neutral-200 transition-colors '>{message}</div>
            <div className='absolute -left-[8px] -top-1 -rotate-[58deg] text-whit dark:text-neutral-900 transition-colors'><BsTriangleFill/></div>
            <div className='text-xs mt-auto ml-2 uppercase dark:text-neutral-400 transition-colors '>{time}</div>
          </div>
        </div>
    </div>
  )
}

export default GroupMsg
