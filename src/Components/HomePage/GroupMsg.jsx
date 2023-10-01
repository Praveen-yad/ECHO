import React from 'react'
import {BsTriangleFill} from 'react-icons/bs'

const GroupMsg = ({message, timeStamp , sender}) => {
  const newTimeStamp = new Date(timeStamp).getTime()
  const time = new Intl.DateTimeFormat('en-In',{
    timeZone:'Asia/Kolkata',
    timeStyle: "short"
  }).format(newTimeStamp)
  return (
    <div className='w-full mt-4'>
        <div className='relative w-fit flex-col bg-white rounded-bl-lg rounded-r-lg pl-3 pr-3 py-2'>
          {sender ? 
            <div className='capitalize text-theme font font-medium'>{sender.name}</div>
            :
            <div></div>
          }
          <div className='flex w-fit'>
            <div className='w-fit max-w-[23rem] text-black text-[17px]'>{message}</div>
            <div className='absolute -left-[8px] -top-1 -rotate-[58deg] text-white'><BsTriangleFill/></div>
            <div className='text-xs mt-auto ml-2 uppercase'>{time}</div>
          </div>
        </div>
    </div>
  )
}

export default GroupMsg
