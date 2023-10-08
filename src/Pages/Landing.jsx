import React, { useState } from "react";
import { TbArrowRight } from "react-icons/tb";
import { Illustration, Login, Signup, Title, VerifyOtp } from "../Components/LandingPage";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showVerify, setShowVerify] = useState(false);
    const [mail, setMail] = useState('')
    const Dark = useSelector(state => state.darkMode)

    return (
        <div className={`${Dark && 'dark'}`}>
            <div className="relative w-[100vw] font-Inconsolata h-[100vh] flex transition-colors bg-[#edf3fa] dark:bg-[#111111]">
                <div className=" w-[42%] h-full p-8">
                    <div className="font-semibold text-4xl relative flex items-center text-neutral-800 dark:text-neutral-300 transition-colors">
                        <span className="z-10 pl-1">
                            <span className="font-bold">E</span>CHO
                        </span>
                        <span className="absolute bg-theme h-[33px] w-[40px] rounded-2xl left-0 -translate-x-[7px]"></span>
                    </div>
                    <Title Dark={Dark}/>
                    <div className="ml-10 mt-8 w-[24rem] dark:text-neutral-400 transition-colors">
                        <div>
                            Echo is a cutting-edge chat application that redefines the way you
                            connect with friends, family, and colleagues. With seamless text,
                            audio, and video call features, Echo is your all-in-one
                            communication solution.
                        </div>
                        <div className="mt-7 text-lg font-medium flex items-center text-neutral-700 dark:text-neutral-400 transition-colors">
                            Proceed
                            <TbArrowRight />
                        </div>
                        <div className="flex space-x-6 mt-2">
                            <div
                                className="flex cursor-pointer items-center dark:bg-neutral-800 bg-neutral-600 dark:text-neutral-200 text-[#f3f3f3] rounded-md w-fit px-4 py-1 transition-colors"
                                onClick={() => setShowLogin(true)}
                                >
                                Login
                            </div>
                            <div
                                className="flex cursor-pointer items-center bg-neutral-600 text-[#f3f3f3] rounded-md w-fit px-4 py-1 dark:text-neutral-200 dark:bg-neutral-800 transition-colors"
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
        </div>
    );
};

export default Landing;
