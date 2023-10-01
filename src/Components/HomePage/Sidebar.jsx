import React, { useState, useEffect } from "react";
import { PiCircleDashed, PiArchiveBox } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";
import { UserContainer } from "./";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../../store/activeChat";
import { setSecondRecall } from "../../store/secondRecall";

const Sidebar = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const chatId = useSelector(state => state.activeChat)
  const secondRecall = useSelector(state => state.secondRecall)
  const dispatch = useDispatch()

  const config = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    const FetchChats = async () => {
      await axios
      .get(`${BASE_URL}/api/chat/`, config)
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err)
      });
    };
    FetchChats();

    // eslint-disable-next-line
  }, [secondRecall]);

  const Notify = async(id) => {
    dispatch(setActiveChat(id)) 
    navigate(`/home/${id}`)
    await axios.post(`${BASE_URL}/api/chat/removenew`,{
      chatId:id
      },config)
      .then(res => {
          // console.log(res)
          dispatch(setSecondRecall())
      })
      .catch(err => {
          // console.log(err)
      })  
  }


  return (
    <div className="bg-[#F8FAFF] border-l-2 w-[20rem] flex flex-col items-center pb-8 overflow-y-auto ">
      <div className="sticky pt-7 top-0 bg-[#F8FAFF]">
        <div className="w-[17rem] text-neutral-800 flex justify-between items-center">
          <div className="font-semibold text-3xl ">Chats</div>
          <div className="mt-1">
            <PiCircleDashed size={26} />
          </div>
        </div>

        <form>
          <div className="h-[2.3em] mt-6 mb-3 flex items-center px-3 w-[17rem] bg-theme bg-opacity-10 text-opacity-90 rounded-full text-theme space-x-2">
            <button>
              <BiSearch size={20} />
            </button>
            <input
              className="bg-transparent w-full outline-none placeholder:text-theme placeholder:text-opacity-70"
              placeholder="Search"
            />
          </div>
        </form>
      </div>

      <div className="w-[17rem] text-theme h-[2.3rem] mt-3 pb-1 flex items-center space-x-2 border-b-2">
        <PiArchiveBox />
        <div >Archived</div>
      </div>

      {/* <div className='w-[17rem] mt-3 space-y-5'>
                <div>Pinned</div>
                <div onClick={() => navigate("/home/chat")}><UserContainer active={true}/></div>
            <NewMsgComp/>
            </div> */}

      <div className="w-[17rem] mt-3 space-y-5">
        <div>All Chats</div>

        {data.map((items, index) => (
          <div key={index}>
            {items.isGroupChat ? (
              <div onClick={() => Notify(items._id)}>
                <UserContainer
                  sendersId={ items.latestMessage?.sender._id}
                  sendersName={`${items.latestMessage?.sender.name}:\xa0`}
                  lastMsg={items.latestMessage?.content}
                  name={items.chatName}
                  pic={items.groupAdmin.pic}
                  id={items._id}
                  activeId={chatId}
                  timeStamp={items.latestMessage?.createdAt}
                  notify={items.newMessage}
                />
              </div>
            ) : (
              <div>
                {items.users
                  .filter((item) => item._id !== localStorage.getItem("id"))
                  .map((item, newIndex) => (
                    <div
                      key={newIndex}
                      onClick={() => Notify(items._id)}>
                        <UserContainer
                          sendersId={items.latestMessage?.sender._id}
                          lastMsg={items.latestMessage?.content}
                          name={item.name}
                          pic={item.pic}
                          id={items._id}
                          activeId={chatId}
                          timeStamp={items.latestMessage?.createdAt}
                          notify={items.newMessage ? true : false}
                        />
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
