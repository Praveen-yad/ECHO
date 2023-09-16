import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { BsCameraVideo } from "react-icons/bs";
import { HiOutlineFaceSmile} from 'react-icons/hi2'
import { FiChevronDown } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { ChatDay, GroupMsg, MsgReceived, MsgSent } from ".";
import axios from "axios";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRecall } from "../../store/recall";
import { setSecondRecall } from "../../store/secondRecall";
import EmojiPicker from "emoji-picker-react";

const ENDPOINT = "https://echo-backend.vercel.app";
let socket;

const MainContainer = () => {
    const [media, setMedia] = useState(false);
    const [data, setData] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [reciver, setReciver] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    // eslint-disable-next-line
    const [socketConnected, setSocketConnected] = useState(false);
    let chatId = useSelector((state) => state.activeChat);
    const id = localStorage.getItem("id");
    const UserData = JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dummy = useRef();

    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };

    useEffect(() => {
        if (!chatId) {
            navigate("/home");
        }
        socket = io(ENDPOINT);
        socket.emit("setup", UserData);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true))
        socket.on("stop typing", () => setIsTyping(false))
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const AllMessages = async () => {
            setShowEmoji(false)
            await axios.get(`https://echo-backend.vercel.app/api/message/${chatId}`, config)
                .then((res) => {
                    setData(res.data.response.reverse());
                    socket.emit("join chat", res.data.response[0].chat._id);
                    socket.emit("stop typing", chatId);
                    setTyping(false)
                    setNewMessage('')
                })
                .catch((err) => {
                    console.log(err);
                });

            await axios.post(`https://echo-backend.vercel.app/api/chat/getreciver`,
                    {
                        chatId: chatId,
                    },
                    config,
                )
                .then((res) => {
                    let ref = res.data.users
                    let data = ref.filter((item) => item._id !== id);
                    // console.log(data)
                    setReciver(data[0]);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        AllMessages();
        // eslint-disable-next-line
    }, [chatId]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (newMessage === "") {
            return;
        }

        setIsSending(true);
        await axios
            .post(
                `https://echo-backend.vercel.app/api/message`,
                {
                    chatId: chatId,
                    content: newMessage,
                },
                config,
            )
            .then((res) => {
                socket.emit("stop typing", chatId)
                setIsSending(false);
                setData([res.data.response, ...data]);
                socket.emit("new message", res.data.response);
                setNewMessage("");
                dispatch(setRecall())
                dispatch(setSecondRecall())
            })
            .catch((err) => {
                setIsSending(false);
                console.log(err);
                setNewMessage("");
            });
    };

    const Notify = async(id) => {
        await axios.post(`https://echo-backend.vercel.app/api/chat/addnew`,{
            chatId:id
        },config)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })              
    } 

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if (chatId !== newMessageReceived.chat._id) {
                Notify(newMessageReceived.chat._id);
            } else {
                setData([newMessageReceived, ...data]);
            }
            dispatch(setRecall());
            dispatch(setSecondRecall())
        });
    });

    const getDate = (timeStamp) => {
        const newTimeStamp = new Date(timeStamp).getTime();
        const date = new Intl.DateTimeFormat("en-In", {
            timeZone: "Asia/Kolkata",
            dateStyle: "short",
        }).format(newTimeStamp);
        return date;
    };

    const typingHandler = (e) => {
        setNewMessage(e.target.value)
        setShowEmoji(false)

        if(!socketConnected) return

        if(newMessage === ''){
            socket.emit("stop typing", chatId);
            setTyping(false)
        }

        if(!typing){
            socket.emit("typing", chatId)
            setTyping(true)
        }

        let lastTypingTime = new Date().getTime();
        let timerLength = 2000;
        setTimeout(() => {
            let timeNow = new Date().getTime();
            let timeDiff = timeNow - lastTypingTime;

            if(timeDiff >= timerLength && typing){
                socket.emit("stop typing", chatId);
                setTyping(false)
            }
        }, 2000) 
    }

    return (
        <div className=" flex w-full h-[100vh]">
                <div id="Scroll" className="flex w-full overflow-hidden">
                    <div className="w-full h-[100vh] flex flex-col">
                        <div className="w-full h-[9vh] border-l-2 bg-[#F8FAFF] flex items-center px-6 justify-between">
                            <div className="flex space-x-3">
                                <div className="relative h-[2.2rem]">
                                    <img
                                        alt="ERROR"
                                        src={reciver.pic}
                                        className="w-[2.2rem] h-[2.2rem] object-cover rounded-full outline outline-[#5B96F7] outline-2"
                                    />
                                    {/* <div className="h-2 w-2 rounded-full bg-green-400 absolute right-0 bottom-0.5"></div> */}
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-sm capitalize">
                                        {data[0]?.chat.isGroupChat
                                            ? data[0].chat.chatName
                                            : reciver.name}
                                    </div>
                                    <div className="text-xs">{isTyping ? <div className="text-[#5B96F7] font-medium">Typing...</div>: "Online"}</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="border-r-2 flex space-x-5 text-xl px-3 py-2">
                                    <div>
                                        <IoCallOutline />
                                    </div>
                                    <div>
                                        <BsCameraVideo />
                                    </div>
                                    <div>
                                        <BiSearch />
                                    </div>
                                </div>
                                <div className="text-xl px-3" onClick={() => setMedia(!media)}>
                                    <FiChevronDown />
                                </div>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="h-[82vh] flex flex-col border-l justify-end bg-[#F0F4FA] " >
                            
                            <div className="overflow-y-auto w-full p-5 flex flex-col-reverse ">
                                {data.map((item, index) => (
                                    <div key={index}>
                                        {getDate(item.createdAt) === getDate(data[index === data.length-1 ? data.length-1 : index+1 ].createdAt) ? (
                                            <div></div>
                                            ) : (
                                            <ChatDay timeStamp={item.createdAt} />
                                        )}
                                        {item.sender._id === id ? (
                                            <MsgSent
                                                timeStamp={item.createdAt}
                                                message={item.content}
                                            />
                                        ) : (
                                            <div>
                                                {item.chat.isGroupChat ? (
                                                    <GroupMsg
                                                        sender={item.sender}
                                                        timeStamp={item.createdAt}
                                                        message={item.content}
                                                    />
                                                ) : (
                                                    <MsgReceived
                                                        timeStamp={item.createdAt}
                                                        message={item.content}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div ref={dummy} id="printBuffer"></div>
                            </div>
                        </div>

                        <form onSubmit={sendMessage}>
                            <div className="w-full h-[9vh] border-l-2 bg-[#F8FAFF] flex items-center px-4">
                                <div className="w-full px-4 flex items-center bg-[#EAF2FE] h-[2.5rem] rounded-lg">
                                    <img
                                        alt="ERROR"
                                        src="https://res.cloudinary.com/de2rges3m/image/upload/v1693508429/Chat%20App/Home%20Page/Link_vjmo8j.png"
                                        className="w-[1.5rem] h-[1.5rem] object-cover"
                                    />
                                    <input
                                        value={newMessage}
                                        className="outline-none bg-transparent w-full ml-3 placeholder:text-[#709CE6]"
                                        placeholder="Write a Message..."
                                        onChange={(e) => typingHandler(e)}
                                        readOnly={isSending ? true : false}
                                    />
                                    <div>
                                        <HiOutlineFaceSmile size={24} className="text-[#709CE6]" onClick={() => setShowEmoji(!showEmoji)} />
                                        {showEmoji && <div className="fixed bottom-[5rem] right-[1.3rem] "><EmojiPicker emojiStyle="google" width={350} height={450} onEmojiClick={(e) => setNewMessage(old => old + e.emoji)} /></div>}
                                    </div>
                                </div>
                                <button className="w-[6.5rem] h-[2.5rem] ml-4 flex items-center justify-center rounded-lg bg-[#5B96F7] text-white">
                                    <div>
                                        Send
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className={`h-full bg-red-400 w-[19rem] transition-all ${!media && "-mr-[19rem]"}`}
                    ></div>
                </div>
        </div>
    );
};

export default MainContainer;
