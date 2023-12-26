import React from 'react'
import {TbVolume2,TbMessage2,TbBellFilled,TbPhoneCall} from 'react-icons/tb'
import {BiSearch, BiSolidPhoneCall} from 'react-icons/bi'
import {BsCameraVideoFill} from 'react-icons/bs'
import {PiNumberCircleThreeLight} from 'react-icons/pi'
import {BsFillChatLeftTextFill} from 'react-icons/bs'

const Illustration = () => {
  return (
    <div className="flex flex-1">
      {/* First Block */}
      <div className="relative h-full flex flex-col justify-end overflow-visible z-20">
        <div className="h-[20rem] absolute w-[19rem] pl-10 pt-10">
          <div className="flex">
            <div>
              <div className="outline outline-[3px] outline-white rounded-full relative w-[3rem] h-[3rem]">
                <img
                  alt="ERROR"
                  src="https://res.cloudinary.com/de2rges3m/image/upload/v1693402839/Chat%20App/Login%20page/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417_sgu0rq.avif"
                  className="w-[3rem] h-[3rem] object-cover rounded-full"
                />
                <div className="w-2.5 h-2.5 outline outline-[1px] outline-white bg-[#f68230] absolute rounded-full right-0 mr-[5px] bottom-0 animate-ping duration-1000"></div>
                <div className="w-2.5 h-2.5 outline outline-[3px] outline-white bg-[#f68230] absolute rounded-full right-1 bottom-0 "></div>
              </div>
            </div>

            <div className="ml-4 mt-2 space-y-3">
              <div className="bg-[#f3f3f3] shadow-lg px-4 py-2 rounded-xl w-fit dark:bg-neutral-800 dark:text-neutral-300 transition-colors">
                Hey
              </div>
              <div className="bg-[#f3f3f3] shadow-lg px-4 py-2 rounded-xl w-fit dark:bg-neutral-800 dark:text-neutral-300 transition-colors">
                Nice to meet you!
              </div>
              <div className="bg-[#f3f3f3] shadow-lg px-4 py-2 rounded-xl w-[13rem] dark:bg-neutral-800 dark:text-neutral-300 transition-colors">
                Hope you're doing fine
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Block */}
      <div className="relative flex items-center justify-center -mt-[5rem] translate-x-16 ml-auto ">
        <img src='https://res.cloudinary.com/de2rges3m/image/upload/v1700552629/Chat%20App/Home%20Page/blob_2_ssifxb.svg' className='absolute scale-[1.3] translate-x-7 translate-y-14 '/>
        {/* <div className='bg-[#5B96F7] w-[33rem] h-[14rem] rounded-full -rotate-45 absolute overflow-hidden z-0 translate-y-6 translate-x-4'>
                <div className='h-full w-[15%] outline outline-white z-40 bg-[#f68230]'></div>
            </div> */}
        <img
          alt="Error"
          src="https://res.cloudinary.com/de2rges3m/image/upload/v1693388089/Chat%20App/Login_Image_avrppq.png"
          className="w-[30rem] h-[30rem] object-cover z-10 -translate-y-14 "
        />
      </div>

      {/* Third Block */}
      <div className="h-full w-[18rem] z-10">
        <div className="flex flex-col items-end pr-8 mt-10 text-2xl text-neutral-600 dark:text-neutral-300 transition-colors space-y-2">
          <BsFillChatLeftTextFill />
          <BiSolidPhoneCall />
          <BsCameraVideoFill />
          <div className="w-1 h-1 bg-black dark:bg-neutral-300 transition-colors rounded-full mr-3 animate-[ping_1.5s_ease-in-out_infinite] "></div>
          <div className="w-1 h-1 bg-black dark:bg-neutral-300 transition-colors rounded-full mr-3 animate-[ping_1.5s_ease-in-out_infinite_300ms] delay-500"></div>
          <div className="w-1 h-1 bg-black dark:bg-neutral-300 transition-colors rounded-full mr-3 animate-[ping_1.5s_ease-in-out_infinite_600ms]"></div>
        </div>
        <div className="w-[14rem] dark:bg-neutral-800 transition-colors bg-[#f3f3f3] shadow-lg -ml-8 mr-24 rounded-[20px] flex flex-col p-6 space-y-3 mt-[6.5rem]">
          <div className="flex w-full h-fit items-center justify-between text-slate-400 font-[450]">
            <span className="text-xl">Active</span>
            <div className="flex items-center mt-1.5">
              <TbVolume2 size={19} />
              <div className="bg-[#f68230] flex justify-end w-[20px] h-[12px] rounded-full py-[3px] px-[3px]">
                <span className=" bg-[#f3f3f3] w-[7px] rounded-full "></span>
              </div>
            </div>
          </div>

          <div className="w-full h-12 bg-[#4b8cf5] rounded-xl flex justify-between px-[1.4rem] items-center">
            <div className="outline rounded-full outline-white">
              <img
                alt="Error"
                src="https://res.cloudinary.com/de2rges3m/image/upload/v1693395561/Chat%20App/Login%20page/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967_jmbcjj.jpg"
                className="w-[2.2rem] h-[2.2rem] object-cover rounded-full"
              />
            </div>
            <div className="outline rounded-full outline-white">
              <img
                alt="Error"
                src="https://res.cloudinary.com/de2rges3m/image/upload/v1693395561/Chat%20App/Login%20page/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o_duczsv.jpg"
                className="w-[2.2rem] h-[2.2rem] object-cover rounded-full"
              />
            </div>
            <div className="outline rounded-full outline-white">
              <img
                alt="Error"
                src="https://res.cloudinary.com/de2rges3m/image/upload/v1693395562/Chat%20App/Login%20page/getty_481292845_77896_h4gvea.jpg"
                className="w-[2.2rem] h-[2.2rem] object-cover rounded-full "
              />
            </div>
          </div>

          <div className="w-[80%] h-[22px] flex items-center bg-neutral-200 dark:bg-neutral-700 transition-colors rounded-full text-neutral-300 px-1.5">
            <BiSearch />
            <div className="w-[60%] h-1 bg-neutral-300 ml-1 rounded-full"></div>
          </div>

          <div className="flex w-full justify-end text-neutral-400 space-x-2">
            <TbMessage2 />
            <TbPhoneCall />
            <TbBellFilled className="text-[#f68230]" />
          </div>

          <div className="w-full h-12 bg-neutral-200 rounded-xl dark:bg-neutral-700 transition-colors flex px-2.5 items-center text-neutral-400">
            <div className="w-[2.2rem] h-[2.2rem] bg-purple-500 rounded-full flex items-center justify-center text-neutral-300 font-[500]">
              L
            </div>
            <div className="text-sm font-medium ml-2 flex flex-col items-center -translate-y-0.5">
              <span>Lakshmi Roy</span>
              <span className="bg-neutral-300 w-[50%] h-[3px] rounded-full"></span>
            </div>
            <PiNumberCircleThreeLight
              size={23}
              className="text-[#f68230] ml-auto"
            />
          </div>
        </div>

        <div className="w-full -translate-x-[12rem] mt-12 flex relative">
          <div className="flex flex-col items-end w-fit space-y-3 justify-end z-10">
            <div className="bg-[#f3f3f3] shadow-lg px-4 py-2 rounded-xl w-fit dark:bg-neutral-800 dark:text-neutral-300 transition-colors">
              Hi Anika
            </div>
            <div className="bg-[#f3f3f3] shadow-lg px-4 py-2 rounded-xl w-fit dark:bg-neutral-800 dark:text-neutral-300 transition-colors">
              How can I help you today?
            </div>
          </div>
          <div className="w-[8rem] h-[5.5rem] absolute -top-4 -right-12 bg-[#a068a0] rounded-full -rotate-45 overflow-hidden">
            <img
              alt="ERROR"
              src="https://res.cloudinary.com/de2rges3m/image/upload/v1693407473/Chat%20App/Login%20page/istockphoto-1049768416-612x612-PhotoRoom.png-PhotoRoom_w4etz0.png"
              className="rotate-45 w-[18rem] scale-110 -translate-x-7 "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Illustration
