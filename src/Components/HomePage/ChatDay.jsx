import React from 'react'

const ChatDay = ({timeStamp}) => {
  const newTimeStamp = new Date(timeStamp).getTime()
  const today = new Date()
  const date = new Intl.DateTimeFormat('en-In',{
      timeZone:'Asia/Kolkata',
      dateStyle: "short"
  }).format(newTimeStamp)

  const dateToday = new Intl.DateTimeFormat('en-In',{
      timeZone:'Asia/Kolkata',
      dateStyle: "short"
  }).format(today)

  return (
    <div className='w-full flex items-center py-5'>
      <div className='w-full h-[1px] bg-neutral-200'></div>
      <div className='px-5 text-sm'>{(date === dateToday) ? 'Today' : date}</div>
      <div className='w-full h-[1px] bg-neutral-200'></div>
    </div>
  )
}

export default ChatDay
