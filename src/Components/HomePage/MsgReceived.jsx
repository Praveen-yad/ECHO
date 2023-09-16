import React from 'react'
import {BsTriangleFill} from 'react-icons/bs'

const MsgReceived = ({message, timeStamp , sender}) => {
  const newTimeStamp = new Date(timeStamp).getTime()
  const time = new Intl.DateTimeFormat('en-In',{
    timeZone:'Asia/Kolkata',
    timeStyle: "short"
  }).format(newTimeStamp)
  return (
    <div className='w-full mt-4'>
        <div className='w-fit flex-col'>
            {sender ? 
            <div>{sender.name}</div>
            :
            <div></div>
          }
          <div className='flex w-fit relative'>
            <div className='w-fit max-w-[23rem] bg-neutral-700 text-white rounded-lg px-4 py-2'>{message}</div>
            <div className='absolute -left-[8px] -top-1 -rotate-[59deg] text-neutral-700'><BsTriangleFill/></div>
            <div className='text-xs mt-auto ml-2 uppercase'>{time}</div>
          </div>
        </div>
    </div>
  )
}

export default MsgReceived
