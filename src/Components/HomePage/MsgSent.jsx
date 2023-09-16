import React from 'react'
import {BsTriangleFill} from 'react-icons/bs'

const MsgSent = ({message, timeStamp}) => {
  const newTimeStamp = new Date(timeStamp).getTime()
  const time = new Intl.DateTimeFormat('en-In',{
    timeZone:'Asia/Kolkata',
    timeStyle: "short"
  }).format(newTimeStamp)


  return (
      <div className='w-full flex justify-end mt-4'>
        <div className='relative w-fit flex flex-col'>
            <div className=' w-fit max-w-[23rem] bg-[#5B96F7] rounded-lg px-5 py-2 text-white'>{message}</div>
            <div className='absolute -top-[4px] text-[#5B96F7] -right-[6px] rotate-[59deg]'><BsTriangleFill/></div>
            <div className='text-xs ml-auto mt-2 uppercase'>{time}</div>
        </div>
    </div>
  )
}

export default MsgSent
