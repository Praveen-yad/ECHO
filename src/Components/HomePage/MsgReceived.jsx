import React from 'react'
import {BsTriangleFill} from 'react-icons/bs'

const MsgReceived = ({message, timeStamp }) => {
  const newTimeStamp = new Date(timeStamp).getTime()
  const time = new Intl.DateTimeFormat('en-In',{
    timeZone:'Asia/Kolkata',
    timeStyle: "short"
  }).format(newTimeStamp)
  return (
    <div className='w-full mt-4'>
        <div className='w-fit flex-col relative'>
          <div className='flex w-fit bg-white pl-1 pr-3 py-2 rounded-r-lg rounded-bl-lg '>
            <div className='w-fit max-w-[23rem] px-2 text-black  text-[17px] '>{message}</div>
            <div className='absolute -left-[8px] -top-1 -rotate-[58deg] text-white'><BsTriangleFill/></div>
            <div className='text-xs mt-auto ml-2 uppercase'>{time}</div>
          </div>
        </div>
    </div>
  )
}

export default MsgReceived
