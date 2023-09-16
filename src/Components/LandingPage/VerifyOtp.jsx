import React, { useState } from 'react'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import axios from 'axios'
import { Ring } from '@uiball/loaders'
import DisplayError from './Common/DisplayError'
import { AnimatePresence } from 'framer-motion'

const VerifyOtp = ({setShowSignup, setShowLogin, setShowVerify, mail}) => {
    const [otp, setotp] = useState()
    const [isLoading ,setIsLoading] = useState(false)   
    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('') 

    const VerifyHandler = async(e) => {
        e.preventDefault();
        setIsLoading(true)
        await axios.post("https://echo-backend.vercel.app/api/user/verify",{
          email: mail,
          otp: otp
        }).then(res => {
          setIsLoading(false)
          if(res.data.sucess){
            setShowVerify(false)
            setShowLogin(true)
          }
        }).catch(err => {
          setIsLoading(false)
          setErrorMsg(err.response.data.message)
          setShowError(true)
          setTimeout(() => {
            setShowError(false)
          },5000)
        })
    }

  return (
    <div className='w-[25rem] bg-white rounded-2xl p-8 flex flex-col text-neutral-700 outline outline-1 outline-neutral-500 group z-10'>
      <div className='text-3xl font-bold flex justify-between'>
          <div>Enter OPT</div>
          <div><IoIosCloseCircleOutline className='opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer' onClick={() => setShowVerify(false)}/></div>
      </div>
      <form onSubmit={VerifyHandler}>
        <div className='mt-8 space-y-4 text-lg'>              
            <div className='text-[13px]'>An OTP has been sent to {mail}</div>
            <input required onChange={(e) => setotp(e.target.value)} type="text" className='w-full bg-transparent outline-none border-b border-neutral-400' placeholder='OTP'/>
        </div>
        <button className='w-full text-center text-white mt-10 bg-neutral-500 h-[2.5rem] flex items-center justify-center rounded-lg'>{isLoading ? <Ring size={24} color='white'/> : 'Verify'} </button>      
      </form>
      <div className='text-center mt-4 text-xs flex justify-center font-medium'>
      <div>Already have an Account? </div>
        <div className='text-black cursor-pointer pl-1 hover:underline' onClick={() => {
          setShowLogin(true)
          setShowSignup(false)
        }}>Login</div>
      </div>
      <AnimatePresence>
        {showError && <DisplayError msg={errorMsg} setShowError={setShowError} />}
      </AnimatePresence>
    </div>
  )
}

export default VerifyOtp
