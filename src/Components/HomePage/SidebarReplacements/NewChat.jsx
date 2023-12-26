import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BiSearch } from 'react-icons/bi'
import { Jelly } from '@uiball/loaders'
import { Ring } from '@uiball/loaders'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setActiveChat } from '../../../store/activeChat'
import { setSecondRecall } from '../../../store/secondRecall'

const NewChat = ({setShow}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)
  const [id, setId] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const config = {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };
  const apiCall = async() => {
    await axios.post(`${BASE_URL}/api/user/find?search=${search}`, {
    }, config)
    .then(res => {
      setData(res.data)
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err)
      setIsLoading(false)      
    })
  }

  useEffect(() => {
    setIsLoading(true)
    apiCall();
    //eslint-disable-next-line
  },[search])

  const accessChat = async(id) => {
    setIsLoading2(true)
    await axios.post(`${BASE_URL}/api/chat`, {
      userId: id
      }, config)
      .then(res => {
        console.log(res)
        if(res.data.sucess){
          axios.post(`${BASE_URL}/api/message`,
            {
                chatId: res.data.response._id,
                content: 'Hey!',
            },config,).then(ress => dispatch(setSecondRecall()))
          setShow("Chats")
          navigate(`/home/${res.data.response._id}`)
          dispatch(setActiveChat(res.data.response._id))
          
        }
        setIsLoading2(false)
      })
      .catch(err => {
        console.log(err)
        setIsLoading2(false)
    })
  }

  return (
    <div className='w-[20rem] h-[100vh] dark:bg-[#111111fd] bg-[#F8FAFF] transition-colors border-l-2 dark:border-neutral-800 flex flex-col items-center overflow-hidden'>
      <div className='w-full border-b pb-5 flex items-center pt-7 top-0 dark:bg-[#111111fd] dark:border-neutral-800 transition-colors bg-[#F8FAFF] flex-col'>
        <div className='w-[17rem] dark:text-neutral-300 text-neutral-800 flex justify-between items-center'>
          <div className='font-semibold text-3xl '>Find People</div>
        </div>

        <form>
          <div className="h-[2.3em] mt-6 mb-3 flex items-center px-3 w-[17rem] bg-black dark:bg-[#fff] dark:bg-opacity-10 bg-opacity-10 text-opacity-90 rounded-full text-neutral-700 dark:text-neutral-300 space-x-2 transition-colors">
            <button>{isLoading ?<Jelly size={20} speed={0.9} color='#075f45' /> : <BiSearch size={20} />}</button>
            <input className='bg-transparent w-full outline-none placeholder:text-neutral-700 dark:placeholder:text-neutral-400  placeholder:text-opacity-70 transition-colors' placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
          </div>
        </form>
      </div>

      <div className='w-full px-[1.5rem] flex-1 space-y-4 mt-5 overflow-y-auto'>
        {data.map((item) => (
          <div key={item._id} className='w-full p-3 flex bg-[#F0F4FA] rounded-xl cursor-pointer hover:bg-theme dark:hover:bg-theme text-neutral-800 dark:text-neutral-300 dark:shadow-md dark:bg-neutral-900 hover:text-white transition-colors' onClick={() => {
            setId(item._id)
            accessChat(item._id)
          }}>
            <div className='relative'>
              <img alt="ERROR" src={item.pic} className='w-[2.5rem] h-[2.5rem] object-cover rounded-full' />
              {(isLoading2 && id === item._id) && <div className='absolute top-0 -translate-x-[7px] -translate-y-[7px] '><Ring size={54} lineWeight={3} speed={2} color="#fff" /></div>}
            </div>
            <div className='ml-3 -space-y-0.5'>
              <div>{item.name}</div>
              <div className='text-xs'>{item.email}</div>
            </div>
          </div>
        ))}
      </div>    
    </div>
  )
}

export default NewChat













