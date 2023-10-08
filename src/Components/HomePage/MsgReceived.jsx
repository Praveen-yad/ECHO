import React from 'react'
import {BsTriangleFill} from 'react-icons/bs'
import { useSelector } from 'react-redux'

const MsgReceived = ({message, timeStamp }) => {
  const Dark = useSelector(state => state.darkMode)
  const newTimeStamp = new Date(timeStamp).getTime()
  const time = new Intl.DateTimeFormat('en-In',{
    timeZone:'Asia/Kolkata',
    timeStyle: "short"
  }).format(newTimeStamp)
  return (
    <div className={`w-full mt-4 ${Dark && 'dark'}`}>
      <div className='w-fit flex-col relative '>
        <div className='flex w-fit bg-white transition-colors dark:bg-neutral-900 pl-1 pr-3 py-2 rounded-r-lg rounded-bl-lg '>
          <div className='w-fit max-w-[23rem] px-2 text-black text-[17px] dark:text-neutral-200'>{message}</div>
          <div className='absolute -left-[8px] -top-1 -rotate-[58deg] text-white dark:text-neutral-900 transition-colors'><BsTriangleFill/></div>
          <div className='text-xs mt-auto ml-2 uppercase dark:text-neutral-400'>{time}</div>
        </div>
      </div>
    </div>
  )
}

export default MsgReceived
