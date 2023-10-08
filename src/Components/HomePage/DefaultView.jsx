import React from 'react'
import { useSelector } from 'react-redux'
const DefaultView = () => {
  let Dark = useSelector(state => state.darkMode)

  return (
    <div className={`flex flex-1 ${Dark && 'dark'}`}>
      <div className='flex-1 flex items-center dark:bg-[#111111] justify-center flex-col transition-colors dark:text-neutral-200'>
        
        <img alt="ERROR" src='https://res.cloudinary.com/de2rges3m/image/upload/v1696703380/Chat%20App/Home%20Page/13_enkavg.png' className='w-[22rem]' />
        <div className='-translate-y-8'>Select a conversation or start a <span className='text-theme'>New One</span></div>
      </div>
    </div>
  )
}

export default DefaultView
