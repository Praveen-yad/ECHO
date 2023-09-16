import React, { useEffect, useState } from "react";
import { TbArrowRight } from "react-icons/tb";
import { Illustration, Login, Signup, Title, VerifyOtp } from "../Components/LandingPage";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showVerify, setShowVerify] = useState(false);
    const [mail, setMail] = useState('')
    const navigate = useNavigate()

    // useEffect(()=>{
    //     (localStorage.getItem('token')) && navigate('/home')
    // },[])

    return (
        <div className="relative w-[100vw] font-Inconsolata h-[100vh] flex bg-[#edf3fa]">
            <div className=" w-[42%] h-full p-8">
                <div className="font-semibold text-4xl relative flex items-center text-neutral-800 ">
                    <span className="z-10 pl-1">
                        <span className="font-bold">E</span>CHO
                    </span>
                    <span className="absolute bg-[#5B96F7] h-[33px] w-[40px] rounded-2xl left-0 -translate-x-[7px]"></span>
                </div>
                <Title/>
                <div className="ml-10 mt-8 w-[24rem]">
                    <div>
                        Echo is a cutting-edge chat application that redefines the way you
                        connect with friends, family, and colleagues. With seamless text,
                        audio, and video call features, Echo is your all-in-one
                        communication solution.
                    </div>
                    <Link to={'/home'}>
                    <div className="mt-7 text-lg font-medium flex items-center text-neutral-700">
                        Proceed
                        <TbArrowRight />
                    </div>
                    </Link>
                    <div className="flex space-x-6 mt-2">
                        <div
                            className="flex cursor-pointer items-center bg-neutral-600 text-[#f3f3f3] rounded-md w-fit px-4 py-1"
                            onClick={() => setShowLogin(true)}
                        >
                            Login
                        </div>
                        <div
                            className="flex cursor-pointer items-center bg-neutral-600 text-[#f3f3f3] rounded-md w-fit px-4 py-1"
                            onClick={() => setShowSignup(true)}
                        >
                            Signup
                        </div>
                    </div>
                </div>
            </div>

            <Illustration />

            {showLogin && (
                <div className="absolute z-20 w-[100vw] h-[100vh] backdrop-blur-lg flex items-center justify-center overflow-hidden" >
                    <div className="z-0 absolute w-full h-full"onClick={() => setShowLogin(false)}></div>
                    <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup} setShowVerify={setShowVerify} setMail={setMail}  />
                </div>
            )}

            {showSignup && (
                <div className="absolute z-20 w-[100vw] h-[100vh] backdrop-blur-lg flex items-center justify-center overflow-hidden">
                    <div className="z-0 absolute w-full h-full"onClick={() => setShowSignup(false)}></div>
                    <Signup setShowSignup={setShowSignup} setShowLogin={setShowLogin} setShowVerify={setShowVerify} setMail={setMail}/>
                </div>
            )}

            {showVerify && (
                <div className="absolute z-20 w-[100vw] h-[100vh] backdrop-blur-lg flex items-center justify-center overflow-hidden">
                    <div className="z-0 absolute w-full h-full"onClick={() => setShowVerify(false)}></div>
                    <VerifyOtp setShowSignup={setShowSignup} setShowLogin={setShowLogin} setShowVerify={setShowVerify} mail={mail}/>
                </div>
            )}
        </div>
    );
};

export default Landing;
