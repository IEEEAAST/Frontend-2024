import globe from "../../assets/public-visitor-globe-black.png"
import member from "../../assets/members-people-black.png"

export const Joinus = () => {
  return (
    <>
    <div className='flex flex-col gap-4 w-full px-6 md:px-14 lg:px-7 container mx-auto' >
    <p className="text-[45px] font-bold my-[30px] mt-20">Take Action.Join Us.</p>
    <div className=" flex sm:flex-col w-full container mx-auto">
        <div className="bg-orange-100 rounded-3xl h-[433px] p-2 mb-[10px] ">
            <div className="flex items-start h-full ">
                <div className="flex flex-col center w-1/2 h-full p-2 justify-between">

                <div className="flex flex-col justify-start md:gap-28 gap-3 mt-4">
                    <img src={globe} height="55px" width="55px" className=" ml-[20px]" ></img>
                    <div>
                    <p className="text-black text-2xl font-bold   ml-[20px]">For Public Visitors</p>
                    <p className="text-black text-lg w-2/3 ml-[20px]">Become a member and get latest updates from us, about us, about latest in tech.</p>
                    </div>
                </div>
                    <button className="text-black font-bold text-xs border-2 mb-4 border-black ml-[15px] max-w-fit p-1 px-3 rounded-3xl " >Become A Member</button>
                </div>
                <div className='h-full w-[1.5px] bg-orange-200 opacity-75 rounded-3xl'></div>
                <div className="flex flex-col  center w-1/2 h-full p-2 justify-between">

                <div className="flex flex-col justify-start md:gap-28 gap-4 mt-4">
                    <img src={member} height="55px" width="55px" className=" ml-[20px]"></img>
                    <div >
                    <p className="text-black text-2xl font-bold   ml-[20px]">For Members</p>
                    <p className="text-black text-lg w-2/3 ml-[20px]">For the next generation of builders, you get to contribute your ideas, collaborate and build.</p>
                    </div>
                </div>
                    <button className="text-black font-bold text-xs border-2 mb-4 border-black ml-[20px] max-w-fit  p-1 px-5 rounded-3xl">Volunteer</button>
                </div>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}
