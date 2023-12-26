import React,{useState} from 'react'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import { Ring } from '@uiball/loaders'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DisplayError from './Common/DisplayError'
import { AnimatePresence } from 'framer-motion'

const Login = ({setShowLogin,setShowSignup, setShowVerify, setMail}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [isLoading ,setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const LoginHandler = async(e) => {
    e.preventDefault();
    setIsLoading(true)
    await axios.post(`${BASE_URL}/api/user/login`,{
      email: email,
      password: password,
    }).then(res => {
      setIsLoading(false)
      if(res.data.sucess){
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("userData", JSON.stringify(res.data.response))
        localStorage.setItem("id", res.data.response._id)
        navigate("/home")
      }
    }).catch(err => {
      setIsLoading(false)
      if(err.response.data.response && !err.response.data.response.isVerified){
        setTimeout(() => {
          setShowVerify(true)
          setShowLogin(false)
        },2000)
      }
      setErrorMsg(err.response.data.message)
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      },5000)
    })
  }

  return (
    <div className='w-[25rem] bg-white dark:bg-neutral-800 rounded-2xl p-8 flex flex-col text-neutral-700 transition-colors dark:text-neutral-200 outline outline-1 outline-neutral-500 group z-10'>
      <div className='text-3xl font-bold flex justify-between'>
          <div>ECHO,</div>
          <div><IoIosCloseCircleOutline className='opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer' onClick={() => setShowLogin(false)}/></div>
      </div>
      <div className='mt-2 '>Welcomes you Back!</div>
      <form onSubmit={LoginHandler}>
        <div className='mt-8 space-y-4 text-lg'>
            <input autoComplete='login-email' required type='Email' onChange={(e) => {
              setEmail(e.target.value) 
              setMail(e.target.value)
            }} className='w-full bg-transparent outline-none border-b border-neutral-400' placeholder='Email'/>
            <input autoComplete='login-Pass' required type='password' onChange={(e) => setPassword(e.target.value)} className='w-full bg-transparent outline-none border-b border-neutral-400' placeholder='Password'/>
        </div>
        <div className='text-center flex justify-end mt-4 py-2 rounded-lg'>
            <div className='underline cursor-pointer'>Forgot Password?</div>
        </div>
        <button className='w-full text-center text-white mt-10 bg-neutral-500 h-[2.5rem] flex items-center justify-center rounded-lg dark:bg-neutral-700 transition-colors'>{isLoading ? <Ring size={24} color='white'/> : 'Login'} </button>      
      </form>
      <div className='text-center mt-4 text-xs flex justify-center font-medium'>
      <div>Dont have an Account? </div>
        <div className='text-black transition-colors dark:text-theme cursor-pointer pl-1 hover:underline' 
        onClick={() => {
          setShowLogin(false)
          setShowSignup(true)
        }}>
          Signup</div>
      </div>
      <AnimatePresence>
          {showError && <DisplayError msg={errorMsg} setShowError={setShowError} />}
      </AnimatePresence>
    </div>
  )
}

export default Login
