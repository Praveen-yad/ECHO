import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BiSearch } from 'react-icons/bi'
import { Jelly } from '@uiball/loaders'
import {IoClose} from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setActiveChat } from '../../../store/activeChat'


const CreateGroup = ({ setShow }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)
  const [users, setUsers] = useState([])
  const [groupName, setGroupName] = useState('')
  const [userIdArray, setUserIdArray] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const config = {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };
  const apiCall = async () => {
    await axios.post(`${BASE_URL}/api/user/find?search=${search}`, {
    }, config)
      .then(res => {
        setData(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        // console.log(err)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setIsLoading(true)
    apiCall();
  }, [search])

  useEffect(() => {
    setUserIdArray([])
    users.map((item) => setUserIdArray(old => [...old, (item.id)]))
  },[users])

  const CreateGroup = async () => {
    setIsLoading2(true)
    const data = JSON.stringify(userIdArray)

    await axios.post(`${BASE_URL}/api/chat/group`, {
      name: groupName,
      users: data
    }, config)
      .then(async(res) => {
        // console.log(res)
        if(res.data.sucess) {
          axios.post(`${BASE_URL}/api/message`,
          {
              chatId: res.data.response._id,
              content: "I Created This Group",
          },
          config
          ).then(resp => {
            dispatch(setActiveChat(res.data.response._id))
            setShow("Chats")
            navigate(`/home/${res.data.response._id}`)
          }).catch(err => {
            console.log(err)
          })
        }
        setIsLoading2(false)
      })
      .catch(err => {
        // console.log(err)
        setIsLoading2(false)
      })
  }

  const HandleUser = (id, name) => {
    let count = 0

    for(let items in users){
      if(users[items].id === id){
        count++
      }
    }

    if(count === 0){
      setUsers(old => [...old, {id, name}])
    }
  }

  const FindInGroup = (id) => {
    let count=0
    for(let items in users){
      if(users[items].id === id){
        count++
      }
    }
    if(count ===0){
      return false
    }else{
      return true
    }
  }

  return (
    <div className='w-[20rem] h-[100vh] dark:bg-[#111111fd] transition-colors bg-[#F8FAFF] dark:border-neutral-800 border-l-2 flex flex-col items-center overflow-y-auto overflow-x-hidden'>
      <div className='w-full border-b pb-3 flex items-center pt-7 top-0 bg-[#F8FAFF] dark:bg-[#111111fd] dark:border-neutral-800 transition-colors flex-col '>
        <div className='w-[17rem] text-neutral-800 flex justify-between items-center'>
          <div className='font-semibold text-3xl dark:text-neutral-200 transition-colors'>Create Group</div>
        </div>


        <div className={`w-[17rem] mt-3 flex  flex-col transition-all`}>

          <div className='space-y-4 w-full py-2 flex flex-col'>
            <input className='w-full py-2 outline-none bg-transparent border dark:border-neutral-600 rounded-lg px-2 placeholder:text-neutral-500 transition-colors dark:text-neutral-300 text-neutral-900 text-center' placeholder='Group Name' onChange={(e) => setGroupName(e.target.value)} />
            <div>
              {users.length !== 0 ?
                <div className='gap-3 justify- center border rounded-lg flex flex-wrap p-3'>
                  {users.map((items, index) => (
                    <div key={index} className='px-2 py-2 text-sm bg-neutral-600 text-white w-[7.32rem] rounded-lg h-fit flex justify-between items-center '>
                      <div className='capitalize w-full truncate'>{items.name}</div>
                      <div className='cursor-pointer' onClick={() => {
                        setUsers(users.filter((item) => (item.id !== items.id)))
                      }}><IoClose/></div>
                    </div>
                  ))}
                </div>
                :
                <div className='text-neutral-500 dark:border-neutral-600 transition-colors border rounded-lg py-2 text-center'>Group Members</div>
              }
            </div>

            <div className='flex items-center cursor-pointer justify-between w-full h-fit hover:outline outline-1 outline-neutral-200 px-2 rounded-lg transition-colors text-neutral-600 dark:hover:outline-neutral-500 dark:text-neutral-300' onClick={CreateGroup}>
              <div className='py-1'>Create New Group</div>
              {isLoading2 ? 
              <div className='h-6 w-6 flex items-center'><Jelly size={20} speed={0.9} color="#075f45" /></div>
                :
                <div className='text-2xl flex items-center h-6 w-6'>+</div>
              }
            </div>

          </div>
        </div>
      </div>

      <form>
        <div className="h-[2.3em] mt-6 mb-3 flex items-center px-3 w-[17rem] bg-black dark:bg-[#fff] dark:bg-opacity-10 bg-opacity-10 text-opacity-90 rounded-full text-neutral-700 dark:text-neutral-300 space-x-2 transition-colors">
          <button>{isLoading ? <Jelly size={20} speed={0.9} color="#075f45" /> : <BiSearch size={20} />}</button>
          <input className='bg-transparent w-full outline-none placeholder:text-neutral-700 dark:placeholder:text-neutral-400  placeholder:text-opacity-70 transition-colors' placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
        </div>
      </form>

      <div className='w-full px-[1.5rem] flex-1 space-y-4 mt-5 '>
        {data.map((item) => (
          <div key={item._id} className={`w-full p-3 flex   rounded-xl cursor-pointer dark:shadow-md hover:bg-theme dark:hover:bg-theme hover:text-white transition-colors ${FindInGroup(item._id) ? 'bg-theme text-white' : 'bg-[#F0F4FA] dark:bg-neutral-900 dark:text-neutral-300 transition-colors text-neutral-900'} `} onClick={() => HandleUser(item._id, item.name)}>
            <div className='relative'>
              <img alt="ERROR" src={item.pic} className='w-[2.5rem] h-[2.5rem] object-cover rounded-full' />
            </div>
            <div className='ml-3 -space-y-0.5'>
              <div className='capitalize'>{item.name}</div>
              <div className='text-xs'>{item.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CreateGroup