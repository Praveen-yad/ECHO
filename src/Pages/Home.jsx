import React, { useState } from 'react'
import { SubSidebar, Sidebar } from '../Components/HomePage'
import { Outlet } from 'react-router-dom'
import { NewChat, CreateGroup } from '../Components/HomePage/SidebarReplacements'
import { useSelector } from 'react-redux'


const Home = () => {
  const Dark = useSelector(state => state.darkMode)
  const [show, setShow] = useState('')

  return (
    <div className={`w-[100vw] h-[100vh] flex ${Dark && 'dark'} `}>
      <div className={`${(show === 'Calls' || show === 'Setting') ? 'w-[5.5rem]': 'w-[25.5rem]'} flex `}>
        <SubSidebar setShow={setShow} show={show} />
        {(show === "" || show === "Chats") && <Sidebar/>}
        {show === "People" && <NewChat setShow={setShow}/>}
        {show === "Group" && <CreateGroup setShow={setShow}/>}
      </div>
        <Outlet/>
    </div>
  )
}

export default Home
