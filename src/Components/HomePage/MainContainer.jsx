import React, { useCallback, useState } from "react";
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
import { setSecondRecall } from "../../store/secondRecall";
import EmojiPicker from "emoji-picker-react";
import RightSlider from "./SidebarReplacements/RightSlider";
import { DotPulse } from '@uiball/loaders'
import ReactPlayer from 'react-player'
import peer from '../../service/peer'


let socket, selectedChatCompare;

const MainContainer = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const ENDPOINT = BASE_URL;
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
    const [myStream, setMyStream]= useState()
    const [showCalling, setShowCalling] = useState(false)
    const [showIncomingCall, setShowIncomingCall] = useState(false)
    const [incomingCall, setIncomingCall] = useState()
    const [Answer, setAnswer] = useState()

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

            if(!chatId)return

            setShowEmoji(false)
            await axios.get(`${BASE_URL}/api/message/${chatId}`, config)
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
                
            await axios.post(`${BASE_URL}/api/chat/getreciver`,
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
            selectedChatCompare = chatId
            // eslint-disable-next-line
        }, [chatId]);
        
        const sendMessage = async (e) => {
            e.preventDefault();
            if (newMessage === "") {
                return;
            }
            
            setIsSending(true);
            await axios
            .post(`${BASE_URL}/api/message`,
                {
                    chatId: chatId,
                    content: newMessage,
                },
                config,
                )
                .then((res) => {
                    // dispatch(setRecall())
                    socket.emit("stop typing", chatId)
                    setIsSending(false);
                    setData([res.data.response, ...data]);
                    socket.emit("new message", res.data.response);
                    setNewMessage("");
                    dispatch(setSecondRecall())
                })
                .catch((err) => {
                    setIsSending(false);
                    console.log(err);
                    setNewMessage("");
                });
    };

    const Notify = async(id) => {
        console.log(chatId, id)
        dispatch(setSecondRecall())
        await axios.post(`${BASE_URL}/api/chat/addnew`,{
            chatId:id
        },config)
        .then(res => {
            // console.log(res)
        })
        .catch(err => {
            // console.log(err)
        })              
    }
    
    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if (selectedChatCompare !== newMessageReceived.chat._id) {
                Notify(newMessageReceived.chat._id);
            }else{
                Proceed(newMessageReceived)
            }
        });
    });

    const Proceed = (newMessageReceived) => {
        if(newMessageReceived.chat._id !== chatId){
            return
        }else{
            setData([newMessageReceived, ...data]);
            dispatch(setSecondRecall())
        }
    }

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

    const HandelCall = useCallback(async() => {
        setShowCalling(true)
        const stream = await navigator.mediaDevices.getUserMedia({audio:true, video:true})

        const offer = await peer.getOffer()
        socket.emit("userCall",{to: chatId, from:JSON.stringify(UserData), offer: offer})
        setMyStream(stream)
    },[chatId])

    const handleAcceptedCall = useCallback(async({ans}) => {
        await peer.setLocalDescription(ans)
        console.log("call accepted")
    },[])

    const handleIncomingCall = useCallback(async({from, offer}) => {
        setShowIncomingCall(true)
        const ans = await peer.getAnswer(offer)
        socket.emit("callAccepted", {to: chatId, ans:ans})
        let data = JSON.parse(from)
        setIncomingCall(data)
        const stream = await navigator.mediaDevices.getUserMedia({audio:true, video:true})
        setMyStream(stream)
    },[]) 
    
    useEffect(() => {
        socket.on("incomingCall", handleIncomingCall)
        socket.on("callAccepted", handleAcceptedCall)

        return () => {
            socket.off("incomingCall", handleIncomingCall);
            socket.off("callAccepted", handleAcceptedCall);
        };
    },[])

    const handelCallAccept = async() => {
    }

    return (
        <div className="flex w-full h-[100vh]">
                <div className="flex w-full overflow-hidden">
                    <div className="w-full h-[100vh] flex flex-col relative">
                        <div className="w-full h-[9vh] border-l-[1px] border-b-[1px] bg-[#F8FAFF] flex items-center px-6 justify-between ">
                            <div className="flex space-x-3">
                                <div className="relative h-[2.2rem]">
                                    <img
                                        alt="ERROR"
                                        src={reciver.pic}
                                        className="w-[2.2rem] h-[2.2rem] object-cover rounded-full outline outline-theme outline-2"
                                    />
                                    {/* <div className="h-2 w-2 rounded-full bg-green-400 absolute right-0 bottom-0.5"></div> */}
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-sm capitalize">
                                        {data[0]?.chat.isGroupChat
                                            ? data[0].chat.chatName
                                            : reciver.name}
                                    </div>
                                    <div className="text-xs">{isTyping ? <div className="text-theme font-medium">Typing...</div>: "Online"}</div>
                                </div>
                            </div>
                            <div className="flex items-center ">
                                <div className="border-r-2 flex space-x-2 text-xl px-3 py-2">
                                    <div className="transition-colors hover:bg-neutral-200 px-3 py-2 rounded-md">
                                        <IoCallOutline />
                                    </div>
                                    <div className="transition-colors hover:bg-neutral-200 px-3 py-2 rounded-md" onClick={HandelCall}>
                                        <BsCameraVideo />
                                    </div>
                                    <div className="transition-colors hover:bg-neutral-200 px-3 py-2 rounded-md">
                                        <BiSearch />
                                    </div>
                                </div>
                                <div className="text-xl hover:bg-neutral-200 ml-3 rounded-md py-2 px-2 transition-colors" onClick={() => setMedia(!media)}>
                                    <FiChevronDown className={`${media && '-rotate-90 transition-all'}`} />
                                </div>
                            </div>
                        </div>

                        {showCalling &&
                            <div className="absolute w-[30rem] rounded-r-2xl shadow-[0px_0px_10px_2px] shadow-neutral-300 top-5 right-5 bg-white z-20 space-y-3 flex flex-col py-6 justify-around">
                                <div className="w-[30rem] flex justify-center items-center h-fit  space-x-[3rem]">
                                    {data[0]?.chat.users.map(item => ((item._id === id) && 
                                        <div key={item._id}>
                                            <img src={item.pic} className="w-[7rem] object-cover rounded-full h-[7rem]"/>
                                        </div>
                                    ))}
                                    <div>
                                        <DotPulse size={40} speed={1.3} color="#758d9e9a" />
                                    </div>
                                    {data[0]?.chat.users.map(item => ((item._id !== id) && 

                                        <div key={item._id} >
                                            <img src={item.pic} className="w-[7rem] object-cover rounded-full h-[7rem]"/>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center text-xl font-[400] ">Connecting...</div>
                                <div className="flex justify-center text-[16px] pt-1">
                                    <div className="border border-red-600 text-red-600 w-fit px-4 py-1 rounded-lg cursor-pointer" onClick={() => {
                                        setShowCalling(false)
                                        setTimeout(() => {
                                            setMyStream(old => old.getTracks().forEach(function(track) {
                                                track.stop();
                                            }))
                                        }, 150);
                                    }}>Hung Up</div>
                                </div>
                            </div>
                        }  

                        {showCalling && 
                            <div className="absolute rounded-l-2xl right-[31.25rem] top-5 z-20 flex justify-center">
                                <div className="w-fit rounded-r-2xl overflow-hidden -scale-x-100">
                                    <ReactPlayer playing muted width="334px" height="249.5px" url={myStream} />
                                </div>
                            </div>
                        }
                        

                        {incomingCall?._id !== id && (showIncomingCall &&
                            <div className="absolute w-[30rem] rounded-r-2xl shadow-[0px_0px_10px_2px] shadow-neutral-300 top-5 right-5 bg-white z-20 space-y-3 flex flex-col py-6 justify-around">
                                <div className="w-[30rem] flex justify-center items-center h-fit">
                                        <div>
                                            <img src={incomingCall?.pic} className="w-[7rem] object-cover rounded-full h-[7rem]"/>
                                        </div>
                                </div>
                                <div className="text-center text-xl font-[400] capitalize">Incoming Call- {incomingCall?.name}</div>
                                <div className="flex justify-center text-[16px] pt-1">
                                    <div className="border border-red-600 text-red-600 w-fit px-4 py-1 rounded-lg cursor-pointer" onClick={() => {
                                        setShowIncomingCall(false)
                                        setTimeout(() => {
                                            setMyStream(old => old.getTracks().forEach(function(track) {
                                                track.stop();
                                            }))
                                        }, 150);
                                    }}>Hung Up</div>
                                    <div className="border border-theme text-theme ml-6 w-fit px-4 py-1 rounded-lg cursor-pointer" onClick={handelCallAccept}>Accept</div>
                                </div>
                            </div>
                        )}  

                        {incomingCall?._id !== id && (showIncomingCall && 
                            <div className="absolute rounded-l-2xl right-[31.25rem] top-5 z-20 flex justify-center">
                                <div className="w-fit rounded-r-2xl overflow-hidden -scale-x-100">
                                    <ReactPlayer playing muted width="334px" height="249.5px" url={myStream} />
                                </div>
                            </div>
                        )}

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
                            </div>
                        </div>

                        <form onSubmit={sendMessage}>
                            <div className="w-full h-[9vh] border-l-2 bg-[#F8FAFF] flex items-center px-4">
                                <div className="w-full px-4 flex items-center bg-theme bg-opacity-10 h-[2.5rem] rounded-lg">
                                    <img
                                        alt="ERROR"
                                        src="https://res.cloudinary.com/de2rges3m/image/upload/v1693508429/Chat%20App/Home%20Page/Link_vjmo8j.png"
                                        className="w-[1.5rem] h-[1.5rem] object-cover"
                                    />
                                    <input
                                        value={newMessage}
                                        className="outline-none bg-transparent w-full ml-3 placeholder:text-theme placeholder:text-opacity-70"
                                        placeholder="Write a Message..."
                                        onChange={(e) => typingHandler(e)}
                                        readOnly={isSending ? true : false}
                                    />
                                    <div>
                                        <HiOutlineFaceSmile size={24} className="text-theme bg-opacity-70" onClick={() => setShowEmoji(!showEmoji)} />
                                        {showEmoji && <div className="fixed bottom-[5rem] right-[1.3rem] "><EmojiPicker emojiStyle="native" width={350} height={450} onEmojiClick={(e) => setNewMessage(old => old + e.emoji)} /></div>}
                                    </div>
                                </div>
                                <button className="w-[6.5rem] h-[2.5rem] ml-4 flex items-center justify-center rounded-lg bg-theme text-white">
                                    <div>
                                        Send
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div> 
                    <RightSlider 
                        media={media} 
                        reciver={reciver} 
                        name={data[0]?.chat.isGroupChat ? data[0].chat.chatName : reciver.name} 
                        data={data[0]?.chat.isGroupChat ? data[0].chat.users : ''}
                        isGroupChat = {data[0]?.chat.isGroupChat ? true : false}
                    />
                </div>
        </div>
    );
};

export default MainContainer;
