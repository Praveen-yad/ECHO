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
        <div className='relative w-fit flex bg-theme rounded-l-lg rounded-br-lg pl-1 pr-3 py-2'>
            <div className=' w-fit max-w-[23rem] pl-2 pr-3 text-[17px] text-white'>{message}</div>
            <div className='absolute -top-1 text-theme -right-[8px] rotate-[59deg]'><BsTriangleFill/></div>
            <div className='text-xs mt-2 uppercase text-white'>{time}</div>
        </div>
    </div>
  )
}

export default MsgSent
