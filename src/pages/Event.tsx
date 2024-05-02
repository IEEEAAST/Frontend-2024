import imgContainer from "../assets/images/eventarticlesImg.webp"
import { NavBar } from "../components/common/navbar"
export const Event = () => {
  return  (
    
<div className="flex-inline justify-col">
  <div className="h-[150px]">

<NavBar/>
  </div>

  <div className="  w-full min-h-screen flex justify-center items-center  ">

    <div className="imgContainer relative w-[1733px] h-[988px]  rounded-[38px] object-fill overflow-hidden ">
    <div className="absolute z-10  w-full h-screen bg-gradient-to-t from-[#000B21A5] via-transparent bottom-0"></div>

      <div  className="eventadress absolute bottom-[83px] z-10 left-[35px]">
        <div className="address z-20  text-[50px] font-seriframy font-black h-[66px]">
        <h2>
       {` Onboarding - Making minimal fun ;)`}
        </h2>
        </div>
        <div className="subaddress text-[24px] font-SFproramy ">
        <h2>
       {`Article • Design • Craig Fidrigie`}
        </h2>
        </div>
        <button className="w-[169px] h-[59px] text-[21px] bg-white text-black font-SFproramy font-bold rounded-[29px] mt-[45px]">
          View
        </button>
      </div>
    <img  className="object-cover   w-full -translate-y-[125px]" src={imgContainer} alt="" />

    </div>
  </div>
</div>

  
  )
  
}

