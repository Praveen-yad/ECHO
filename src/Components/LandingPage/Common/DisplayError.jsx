import React from 'react'
import {IoClose} from 'react-icons/io5'
import {motion} from 'framer-motion'

const DisplayError = ({msg,setShowError}) => {
  return (
    <motion.div transition={{duration:0.3}} initial={{x:1000}} animate={{x:0}} exit={{x:1000}} className='absolute w-[25rem] rounded-lg p-3 bg-red-100 bg-opacity-40 bottom-0 right-0 mr-5 mb-5 outline outline-1 outline-neutral-800 flex items-center justify-between'>
        <div className='p-2 bg-red-500 rounded-full'>
          <div className='flex items-center bg-white rounded-full'>
          <IoClose className='text-red-500' size={20}/>
        </div>
        </div>
        <div className='w-full mx-3'>
          <div className='text-sm text-neutral-900 font-semibold'>Something Went Wrong!</div>
          <div className='text-xs'>{msg}</div>
        </div>
        <div className='w-6'>
          <IoClose className='text-2xl text-neutral-800 cursor-pointer' size={18} onClick={() => setShowError(false)}/>
        </div>
    </motion.div>
  )
}

export default DisplayError
