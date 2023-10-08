import React, { useState } from 'react'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import axios from 'axios'
import { Ring } from '@uiball/loaders'
import DisplayError from './Common/DisplayError'
import { AnimatePresence } from 'framer-motion'

const Signup = ({setShowSignup,setShowLogin, setShowVerify, setMail}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')
  const [pic , setPic] = useState('')
  const [email , setEmail] = useState('')
  const [isLoading ,setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const image = [{
    url: "https://res.cloudinary.com/de2rges3m/image/upload/v1694366576/Chat%20App/avatars/274631669_812613963466977_3328506348348471831_n_nzauuj.jpg",
  },{
    url:"https://res.cloudinary.com/de2rges3m/image/upload/v1694366576/Chat%20App/avatars/275142450_1318668188599801_2365904023282124370_n_elf9dj.jpg",
  },{
    url:"https://res.cloudinary.com/de2rges3m/image/upload/v1694366576/Chat%20App/avatars/274303677_345856997413993_7933070600784647291_n_qem3yd.jpg",
  },{
    url:"https://res.cloudinary.com/de2rges3m/image/upload/v1694366575/Chat%20App/avatars/273640502_969418803680995_8248371961151946792_n_bldtye.jpg",
  },{
    url:"https://res.cloudinary.com/de2rges3m/image/upload/v1694366576/Chat%20App/avatars/273786956_1309780429434406_331166400412437173_n_a44daf.jpg"
  }
  ]

  const SignupHandler = async(e) => {
    e.preventDefault();
    setIsLoading(true)
    if(pic === ""){
      setErrorMsg("Choose a Profile Picture")
      setShowError(true)
      setIsLoading(false)
      setTimeout(() => {
        setShowError(false)
      },5000)
      return;
    }
    await axios.post(`${BASE_URL}/api/user/register`,{
      name: username,
      email: email,
      password: password,
      pic:pic
    }).then(res => {
      setIsLoading(false)
      if(res.data.sucess){
        setShowVerify(true)
        setShowSignup(false)
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
    <div className='w-[25rem] bg-white rounded-2xl p-8 flex flex-col text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 transition-colors outline outline-1 outline-neutral-500 group z-10'>
      <div className='text-3xl font-bold flex justify-between'>
          <div>ECHO,</div>
          <div><IoIosCloseCircleOutline className='opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer' onClick={() => setShowSignup(false)}/></div>
      </div>
      <div className='mt-2 '>Welcomes You!</div>
      <form onSubmit={SignupHandler}>
        <div className='mt-8 space-y-4 text-lg'> 
            <div className='text-sm text-neutral-700 dark:text-neutral-300 transition-colors -mb-2'>Profile Pic</div>
            <div className='h-[3rem]  w-full flex items-center justify-between'>
              {image.map((item, index) => (
                <div key={index} className={`w-[3rem] overflow-hidden h-[3rem] rounded-full ${pic === item.url ? 'outline outline-2 dark:outline-neutral-100 transition-colors outline-[#6a6a6a]' : ''} `} onClick={() => setPic(item.url)}>
                  <img alt='ERROR' src={item.url} className='w-[3rem] object-cover h-[3rem]' />
                </div>  
              ))}
              <div className='w-[3rem] h-[3rem] bg-slate-300 rounded-full grid place-items-center text-3xl cursor-not-allowed dark:text-neutral-800 transition-colors'>+</div>  
            </div>        
            <input autoComplete='signup-username' required onChange={(e) => setUsername(e.target.value)} type="text" className='w-full bg-transparent outline-none border-b border-neutral-400' placeholder='Username'/>
            <input autoComplete='signup-email' required onChange={(e) => {
              setEmail(e.target.value) 
              setMail(e.target.value)
            }} type='Email' className='w-full bg-transparent outline-none border-b border-neutral-400' placeholder='Email'/>
            <input autoComplete='signup-pass' required onChange={(e) => setPassword(e.target.value)} type='password' className='w-full bg-transparent outline-none border-b border-neutral-400' placeholder='Password'/>
        </div>
        <button className='w-full text-center text-white mt-10 bg-neutral-500 h-[2.5rem] dark:bg-neutral-700 transition-colors flex items-center justify-center rounded-lg'>{isLoading ? <Ring size={24} color='white'/> : 'Signup'} </button>
      </form>
      <div className='text-center mt-4 text-xs flex justify-center font-medium'>
      <div>Already have an Account? </div>
        <div className='text-black dark:text-theme transition-colors cursor-pointer pl-1 hover:underline' onClick={() => {
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

export default Signup
