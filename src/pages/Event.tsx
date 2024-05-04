import imgContainer from "../assets/images/eventarticlesImg.webp";
import arrowRightIcon from "../assets/right-arrow-svgrepo-com.svg";
import articlImg1 from "../assets/images/urn aaid sc US 360876a4-664a86-9505-fdd8c336159f;revision=0.webp";
//import articlImg3  from "../assets/images/urn aaid sc US 360876a4-a18b-4a86-9505-fdd8c336159f;revision=0.webp"
import { NavBar } from "../components/common/navbar";
export const Event = () => {
  return (
    <div className="flex-inline ">
      <div className="h-[150px]">
        <NavBar />
      </div>

      <div className="  w-full min-h-screen flex justify-center items-center  ">
        <div className="imgContainer relative w-[1733px] h-[988px]  rounded-[38px] object-fill overflow-hidden ">
          <div className="absolute z-10  w-full h-screen bg-gradient-to-t from-[#000B21A5] via-transparent bottom-0"></div>

          <div className="eventadress absolute bottom-[83px] z-10 left-[35px]">
            <div className="address z-20  text-[50px] font-seriframy font-black h-[66px]">
              <h2>{` Onboarding - Making minimal fun ;)`}</h2>
            </div>
            <div className="subaddress text-[24px] font-SFproramy ">
              <h2>{`Article • Design • Craig Fidrigie`}</h2>
            </div>
            <button className="w-[169px] h-[59px] text-[21px] bg-white text-black font-SFproramy font-bold rounded-[29px] mt-[45px]">
              View
            </button>
          </div>
          <img
            className="object-cover   w-full -translate-y-[125px]"
            src={imgContainer}
            alt=""
          />
        </div>
      </div>

      <div className="LatestArticlesSection mt-[100px]  border-2 w-full  flex-col justify-center">
        <div className="LatestArticlesViewall w-full  h-[54px]  flex justify-between  items-center">
          <h2 className="text-white text-[45px] font-SFproramy font-bold ml-[89px] ">
            Latest Articles
          </h2>
          <button className="mr-[89px] flex  items-center text-[30px] ">
            View all
            <img className="ml-[8px]" src={arrowRightIcon} width={24} alt="" />
          </button>
        </div>
        <div className="ArticlesContainer mt-[59px]  w-[1733px]  ">
          <div className="ArticlesImg w-[460px] h-[302px] mr-[58]">
            <img src={articlImg1} alt="articleImg" style={{ borderRadius: "16px" }} />
          </div>
          <div className="ArtivlesDetails">
            <div className="articleOwnerAndDate"></div>
            <div className="articleTitle"></div>
            <div className="articleSubTitle"></div>
            <div className="articleLabelAndIcons"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
