import { TbMessage2Bolt } from "react-icons/tb";
import { RiSendPlaneFill } from "react-icons/ri";

const Title = () => {
    return (
        <div className='pl-10 pt-8 text-[65px] font-[800] text-neutral-600 transition-colors dark:text-neutral-300 flex flex-col'>
            <div><span className='text-theme'>ECHO</span>,Thoughts</div>
            <div className='flex items-center justify-around'>
                <div className='w-[3rem] h-[3rem] bg-white rounded-full flex items-center justify-center outline outline-neutral-600 dark:outline-neutral-500 transition-colors dark:text-black'>
                    <TbMessage2Bolt className='text-2xl' />
                </div>

                <div className='outline w-fit outline-[3px] outline-white rounded-full relative'>
                    <img alt="ERROR" src='https://res.cloudinary.com/de2rges3m/image/upload/v1660851654/samples/people/kitchen-bar.jpg' className='w-[3rem] h-[3rem] object-cover rounded-full' />
                    <div className='w-2.5 h-2.5 outline outline-[3px] outline-white bg-[#f68230] absolute rounded-full right-1 bottom-0'></div>
                </div>
                <div className=''>Flow Without</div>
            </div>
            <div className='flex items-center'>Friction<RiSendPlaneFill className='ml-4 text-theme mt-3' /></div>
        </div>
    )
}

export default Title
