import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { BiSearch,BiVideo,BiVideoOff } from "react-icons/bi";
import { AiOutlineAudio, AiOutlineAudioMuted } from 'react-icons/ai'
import { BsCameraVideo } from "react-icons/bs";
import { HiOutlineFaceSmile} from 'react-icons/hi2'
import { FiChevronDown } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { RxCross2 } from 'react-icons/rx'
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
import Peer from 'simple-peer'
import sendSound from '../../sendSound.mp3'
import callSound from '../../VideoCall.mp3'
import {MdCallEnd} from 'react-icons/md'
import {IoIosCall} from 'react-icons/io'

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
    const [callAccepted, setCallAccepted] = useState()
    const [call, setCall ] = useState({})
    const [callDecline ,setCallDecline ] = useState(false)
    const [callFrom, setCallFrom] = useState()
    // eslint-disable-next-line
    const [showVideo, setShowVideo] = useState()
    const [showAudio, setShowAudio] = useState()
    const Dark = useSelector(state => state.darkMode)
    const [audio] = useState(new Audio(callSound))
    const [cantCall, setCantCall] = useState(false)
    
    const myVideo = useRef()
    const UserVideo = useRef()
    const connectionRef = useRef()

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

        return() => {
            socket.off("connected", () => setSocketConnected(true));
            socket.off("typing", () => setIsTyping(true))
            socket.off("stop typing", () => setIsTyping(false))
        }
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
            new Audio(sendSound).play()            
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

    const typingHandler = () => {
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

        setTimeout(() => {
            socket.emit("stop typing", chatId);
            setTyping(false)
        }, 2000) 
    }

    const stopVideo = () => {
        const videoTrack = myStream.getTracks().find(track => track.kind === 'video');
        if (videoTrack.enabled) {
            videoTrack.enabled = false;
            setShowVideo(true)
        } else {
            videoTrack.enabled = true;
            setShowVideo(false)
        }
    }

    const stopAudio = () => {
        const videoTrack = myStream.getTracks().find(track => track.kind === 'audio');
        if (videoTrack.enabled) {
            videoTrack.enabled = false;
            setShowAudio(true)
        } else {
            videoTrack.enabled = true;
            setShowAudio(false)
        }
    }
    
    const HandelCall = async() => {
        setShowCalling(true)
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
            setMyStream(currentStream);
            myVideo.current.srcObject = currentStream;
            
            const peer = new Peer({ initiator: true, trickle: false, stream:currentStream });
            
            peer.on('signal', (data) => {
                let ref = JSON.stringify(UserData)
                socket.emit('callUser', { userToCall: chatId, signalData: data ,userData: ref});
            });
            
            peer.on("stream", (currentStream) => {
                UserVideo.current.srcObject = currentStream
            });
            
            socket.on('callAccepted', ({signal}) => {
                peer.signal(signal);
                setCallAccepted(true)
                setShowCalling(false)
            });
            
            connectionRef.current = peer;
        });
        }
    
    const handelUserCall = async({from, signal, videoCall}) => {
        audio.currentTime = 0
        audio.play()
        audio.loop = true
        let ref = JSON.parse(from)
        setCallFrom(ref)
        setCallDecline(false)
        setCall({ isReceivingCall: true, from: from, signal:signal });
    }
    
    const answerCall = async() => {
        audio.pause()
        setCallAccepted(true);
        setShowCalling(false)
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
            setMyStream(currentStream);
            myVideo.current.srcObject = currentStream
            const peer = new Peer({ initiator: false, trickle: false, stream: currentStream});
        
            peer.on('signal', (data) => {
                socket.emit('answerCall', { signal: data, to: chatId });
            });
            
            peer.on("stream", (currentStream) => {
                UserVideo.current.srcObject = currentStream;
                setCall({isReceivingCall:false})
            });

            peer.signal(call.signal);
            connectionRef.current = peer;
        })
    };
    

    const leaveCall = () => {
        window.location.reload();
        setCall({isReceivingCall:false})
        setCallAccepted(false)
        socket.emit("hungUp", {to: chatId})
        // connectionRef.current.destroy();
    }; 

    const handelDecline = () => {
        setCallDecline(true)
    }
 
    const handelDisconnect = () => {
        setCallAccepted(false)
        leaveCall();
    }

    useEffect(() => {
        socket.on('callUser', handelUserCall)
        socket.on("CallDisconnected", handelDisconnect)
        socket.on("CallDeclined", handelDecline)
        
        return () => {
            socket.off('callUser', handelUserCall)
            socket.off("CallDisconnected", handelDisconnect)
            socket.off("CallDeclined", handelDecline)
        };
        // eslint-disable-next-line
    },[])


    return (
        <div className={`relative flex w-full h-[100vh] ${Dark && 'dark'}`}>
                <div className="flex w-full overflow-hidden">
                    <div className="w-full h-[100vh] flex flex-col relative">
                        <div className="w-full h-[9vh] dark:border-neutral-800 border-l-[1px] border-b-[1px] bg-[#F8FAFF] transition-colors dark:bg-[#111111] dark:text-neutral-200 flex items-center px-6 justify-between ">
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
                                <div className="border-r-2 dark:border-neutral-8 transition-colors00 flex space-x-2 text-xl px-3 py-2">
                                    <div className="transition-colors dark:hover:bg-neutral-800 hover:bg-neutral-200 px-3 py-2 rounded-md">
                                        <IoCallOutline />
                                    </div>
                                    <div className="transition-colors dark:hover:bg-neutral-800 hover:bg-neutral-200 px-3 py-2 rounded-md" onClick={!data[0]?.chat.isGroupChat ? HandelCall : () => setCantCall(true)}>
                                        <BsCameraVideo />
                                    </div>
                                    <div className="transition-colors dark:hover:bg-neutral-800 hover:bg-neutral-200 px-3 py-2 rounded-md">
                                        <BiSearch />
                                    </div>
                                </div>
                                <div className="text-xl dark:hover:bg-neutral-800 hover:bg-neutral-200 ml-3 rounded-md py-2 px-2 transition-colors" onClick={() => setMedia(!media)}>
                                    <FiChevronDown className={`${media && '-rotate-90 transition-all'}`} />
                                </div>
                            </div>
                        </div>

                        {cantCall && 
                            <div className="absolute w-[22rem] h-[8rem] bg-neutral-200 dark:bg-neutral-800 bottom-[40%] z-30 left-[35%] rounded-md flex flex-col items-center justify-center transition-colors">
                                    <div className="font-medium dark:text-neutral-200 text-neutral-800 transition-colors">Group Calling is restricted as of now.</div>
                                    <div className="bg-red-500 text-white cursor-pointer px-3 py-1 rounded-md mt-3" onClick={() => setCantCall(false)}>Close</div>
                            </div>
                        }

                        {showCalling &&
                        <div>
                            {callDecline ?
                            <div className="absolute w-[30rem] h-[15.58rem] rounded-r-2xl shadow-[0px_0px_10px_2px] shadow-neutral-300 top-5 right-5 dark:bg-neutral-900 bg-white dark:shadow-black transition-colors z-20 flex flex-col py-6 justify-around">
                                 <div className="w-[30rem] flex justify-center items-center h-fit  space-x-[3rem]">
                                    {data[0]?.chat.users.map(item => ((item._id === id) && 
                                        <div key={item._id}>
                                            <img alt="ERR" src={item.pic} className="w-[7rem] object-cover rounded-full h-[7rem]"/>
                                        </div>
                                    ))}
                                    <div className="text-3xl text-red-500 flex space-x-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#758d9e9a]"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#758d9e9a]"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#758d9e9a]"></div>
                                    </div>
                                    {data[0]?.chat.users.map(item => ((item._id !== id) && 

                                        <div key={item._id} >
                                            <img alt="ERR" src={item.pic} className="w-[7rem] object-cover rounded-full h-[7rem]"/>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="flex justify-center text-[16px]">
                                    <div className="bg-red-600 px-5 py-1 rounded-md text-white">Call Declined</div>
                                </div>
                                <div className="absolute right-3 top-2 text-xl dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors hover:bg-neutral-200 h-7 w-7 flex items-center justify-center rounded-full" onClick={() => {
                                        setMyStream(myStream.getTracks().forEach(function(track) {
                                            track.stop();
                                        }))
                                        setShowCalling(false)
                                        setCallDecline(false)
                                    }}><RxCross2/></div>
                            </div>
                            :
                            <div className="absolute w-[30rem] h-[15.58rem] rounded-r-2xl shadow-[0px_0px_10px_2px] shadow-neutral-300 dark:shadow-black top-5 right-5 dark:bg-neutral-900 transition-colors bg-white z-20 space-y-3 flex flex-col py-6 justify-around">
                                <div className="w-[30rem] flex justify-center items-center h-fit  space-x-[3rem]">
                                    {data[0]?.chat.users.map(item => ((item._id === id) && 
                                        <div key={item._id}>
                                            <img alt="ERR" src={item.pic} className="w-[7rem] object-cover rounded-full h-[7rem]"/>
                                        </div>
                                    ))}
                                    <div>
                                        <DotPulse size={40} speed={1.3} color="#758d9e9a" />
                                    </div>
                                    {data[0]?.chat.users.map(item => ((item._id !== id) && 

                                        <div key={item._id} >
                                            <img alt="ERR" src={item.pic} className="w-[7rem] object-cover rounded-full h-[7rem]"/>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center text-xl font-[400] transition-colors dark:text-neutral-200 ">Connecting...</div>
                                <div className="flex justify-center text-[16px] pt-1">
                                    <div className="bg-red-600 text-white w-fit px-6 py-2 rounded-lg cursor-pointer" onClick={() => {
                                        setShowCalling(false)
                                        setCallDecline(false)
                                        setMyStream(myStream.getTracks().forEach(function(track) {
                                            track.stop();
                                        }))
                                        socket.emit("DeclineCall", {to: chatId})
                                    }}>{<MdCallEnd/>}</div>
                                </div>
                            </div>
                            }
                        </div>
                        }  

                        {showCalling && 
                            <div className="absolute rounded-l-2xl right-[31.25rem] top-5 z-20 flex justify-center">
                                <div className="w-fit rounded-r-2xl overflow-hidden -scale-x-100">
                                <video muted ref={myVideo} className=' w-[334px] h-[249.5px]' autoPlay />
                                </div>
                            </div>
                        }

                        {call.isReceivingCall &&
                            <div>
                                {callDecline ? 
                                <div className="absolute w-[30rem] h-[15.58rem] rounded-2xl shadow-[0px_0px_10px_2px] dark:shadow-black
                                dark:bg-neutral-900 transition-colors shadow-neutral-300 top-5 right-5 bg-white z-20 space-y-3 flex flex-col py-6 justify-around">
                                    <div className="w-[30rem] flex justify-center items-center h-fit">
                                            <div>
                                                <img alt="ERR" src={callFrom.pic} className="w-[7rem] object-cover rounded-full h-[7rem]"/>
                                            </div>
                                    </div>
                                    <div className="text-center text-xl font-[400] capitalize dark:text-neutral-300 transition-colors">Incoming Call- {callFrom.name}</div>
                                    <div className="flex justify-center text-[16px]">
                                        <div className="bg-red-600 text-neutral-100 w-fit px-5 py-1 rounded-md cursor-pointer">Call Missed</div>
                                    </div>
                                    <div className="absolute right-5 top-0 text-xl hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:text-neutral-100 h-7 w-7 flex items-center justify-center rounded-full" onClick={() => {
                                        setCall({isReceivingCall: false})
                                        setCallDecline(false)
                                    }}><RxCross2/></div>
                                </div>
                                :
                                <div className="absolute w-[30rem] rounded-2xl shadow-[0px_0px_10px_2px] shadow-neutral-300 dark:shadow-black top-5 right-5 dark:bg-neutral-900 bg-white z-20 space-y-3 flex flex-col py-6 justify-around">
                                    <div className="w-[30rem] flex justify-center items-center h-fit">
                                            <div>
                                                <img alt="ERR" src={callFrom.pic} className="w-[7rem] object-cover rounded-full h-[7rem]"/>
                                            </div>
                                    </div>
                                    <div className="text-center text-xl font-[400] capitalize dark:text-neutral-200 transition-colors">Incoming Call- {callFrom.name}</div>
                                    <div className="flex justify-center text-[16px]">
                                        <div className=" bg-red-600 text-white w-fit px-6 py-2 rounded-lg cursor-pointer" onClick={() => {
                                            audio.pause()
                                            setCall({isReceivingCall: false})
                                            setCallDecline(false)
                                            socket.emit("DeclineCall", {to: chatId})
                                        }}>{<MdCallEnd/>}</div>
                                        <div className=" bg-green-500 text-white ml-6 w-fit px-6 py-2 rounded-lg cursor-pointer" onClick={answerCall}>{<IoIosCall/>}</div>
                                    </div>
                                </div>
                                }
                            </div>
                        }  

                        {call.isReceivingCall && 
                            <div className="absolute rounded-l-2xl right-[31.25rem] top-5 z-20 flex justify-center">
                                <div className="w-fit rounded-r-2xl overflow-hidden -scale-x-100">
                                    <video muted ref={myVideo} className=' w-[334px] h-[249.5px]' autoPlay />
                                </div>
                            </div>
                        }

                        {/* Chat Area */}
                            <div className=" h-[82vh] flex flex-col border-l justify-end bg-[#F0F4FA] dark:border-neutral-800 transition-colors dark:bg-[#111111fd]">
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
                                                        data={data}
                                                        index={index}
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
                                <div className="w-full h-[9vh] border-l-2 dark:bg-[#111111] transition-colors dark:border-neutral-800 bg-[#F8FAFF] flex items-center px-4 z-10">
                                    <div className="w-full px-4 flex items-center bg-black dark:bg-white dark:bg-opacity-10 bg-opacity-10 h-[2.5rem] rounded-lg dark:text-neutral-200">
                                        {/* <img
                                            alt="ERROR"
                                            src="https://res.cloudinary.com/de2rges3m/image/upload/v1693508429/Chat%20App/Home%20Page/Link_vjmo8j.png"
                                            className="w-[1.5rem] h-[1.5rem] object-cover"
                                            /> */}
                                        <input
                                            value={newMessage}
                                            className="outline-none bg-transparent w-full  placeholder:text-opacity-70"
                                            placeholder="Write a Message..."
                                            onChange={(e) => {
                                                setNewMessage(e.target.value)
                                                typingHandler()
                                            }}
                                            readOnly={isSending ? true : false}
                                        />
                                        <div>
                                            <HiOutlineFaceSmile size={24} className="text-neutral-700 dark:text-neutral-300 bg-opacity-70" onClick={() => setShowEmoji(!showEmoji)} />
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
                        chatId={chatId}
                    />
                </div>

                {callAccepted && 
                <div className="absolute w-full h-full backdrop-blur-md bg-opacity-50 z-50 flex items-center">
                        <div className="w-fit rounded-lg overflow-hidden ml-3 -scale-x-100">
                            <video ref={UserVideo} className='w-[55rem]' autoPlay />
                        </div>
                    
                    <div className="flex-1 h-full flex flex-col justify-between">
                        <div className="flex flex-col pt-7 px-5 text-white space-y-4">
                            <div className={`w-full flex justify-center bg-opacity-70 ${!showVideo ? 'bg-theme' : 'bg-red-500' } py-2 rounded-md`} onClick={stopVideo}>
                                {!showVideo ? 
                                <div className="flex items-center">
                                    <BiVideoOff className="text-lg mr-2"/>
                                    Stop Video
                                </div>
                                : 
                                <div className="flex items-center">
                                    <BiVideo className="text-lg mr-2"/>
                                    Start Video
                                </div>
                                }
                            </div>
                            <div className={`w-full flex justify-center bg-opacity-70 ${!showAudio ? 'bg-theme' : 'bg-red-500' } py-2 rounded-md`} onClick={stopAudio}>{!showAudio ? 
                                <div className="flex items-center">
                                    <AiOutlineAudioMuted className="text-lg mr-2"/>
                                    Mute
                                </div>
                                : 
                                <div className="flex items-center">
                                    <AiOutlineAudio className="text-lg mr-2"/>
                                    Unmute
                                </div>
                                }</div>
                            <div className="w-full text-center bg-red-500 bg-opacity-70 py-2 rounded-md" onClick={leaveCall}>End Call</div>
                        </div>
                        <div className="h-fit px-5">
                            <div className="my-7 rounded-md overflow-hidden -scale-x-100">
                            <ReactPlayer width={'210px'} height={'157px'} url={myStream} playing />
                            </div>
                        </div>
                    </div>
                </div>
                }
        </div>
    );
};

export default MainContainer;
