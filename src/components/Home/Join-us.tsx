import globe from "../../assets/public-visitor-globe-black.png"
import member from "../../assets/members-people-black.png"
export const Joinus = () => {
  return (
    <>
    <p className="px-[190px] text-2xl font-bold my-[30px]">Take Action.Join Us.</p>
    <div className=" flex w-full px-[190px] container mx-auto">
        <div className="bg-orange-100 rounded-3xl h-[433px] p-2 mb-[10px] ">
            <div className="flex items-center h-full">
                <div className="flex flex-col justify-start center w-1/2 h-full p-2 content-between">
                    <img src={globe} height="55px" width="55px" className="mt-[30px] ml-[20px]" ></img>
                    <p className="text-black text-xl font-bold mt-[77px] ml-[20px]">For Public Visitors</p>
                    <p className="text-black text-l w-2/3 ml-[20px]">Become a member and get latest updates from us, about us, about latest in tech.</p>
                    <button className="text-black text-xs border-2 border-black ml-[20px] max-w-fit mt-[80px] p-1 px-3 rounded-3xl">Become A Member</button>
                </div>
                <div className='h-full w-[1.5px] bg-orange-200 opacity-75 rounded-3xl'></div>
                <div className="flex flex-col justify-start center w-1/2 h-full p-2 content-between">
                    <img src={member} height="55px" width="55px" className="mt-[30px] ml-[20px]"></img>
                    <p className="text-black text-xl font-bold mt-[90px] ml-[20px]">For Members</p>
                    <p className="text-black text-l w-2/3 ml-[20px]">For the next generation of builders, you get to contribute your ideas, collaborate and build.</p>
                    <button className="text-black text-xs border-2 border-black ml-[20px] max-w-fit mt-[75px] p-1 px-5 rounded-3xl">Volunteer</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
