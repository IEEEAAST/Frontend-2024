import imgContainer from "../assets/images/eventarticlesImg.webp";
import arrowRightIcon from "../assets/right-arrow-svgrepo-com.svg";
import articlImg1 from "../assets/images/urn aaid sc US 360876a4-664a86-9505-fdd8c336159f;revision=0.webp";
import saveicon from "../assets/bookmark-ribbon-white.png";
import optionIcon from "../assets/more-ellipsis-white.png";
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

      <div className="LatestArticlesSection    mt-[100px]  border-2 w-full  ">
        <div className="LatestArticlesViewall w-full  h-[54px]  flex justify-between  items-center">
          <h2 className="text-white text-[45px] font-SFproramy font-bold ml-[89px] ">
            Latest Articles
          </h2>
          <button className="mr-[89px] flex  items-center text-[30px] ">
            View all
            <img className="ml-[8px]" src={arrowRightIcon} width={24} alt="" />
          </button>
        </div>
        <div className="ArticlesContainer mt-[59px]  w-[1733px] border-2 flex ">
          <div className="ArticlesImg w-[460px] h-[302px] mr-[58px]">
            <img
              src={articlImg1}
              alt="articleImg"
              style={{ borderRadius: "16px" }}
            />
          </div>
          <div className="ArtivlesDetails">
            <div className="articleOwnerAndDate text-[15px] font-sansramy color[#F4F4F4] mb-[33px]">
              <h5>--Natalie • Yesterday 􀫸 Member-only</h5>
            </div>
            <div className="articleTitle text-[27px] font-seriframy">
              <h1>Swiftly approaching, an all new reality kit!</h1>
            </div>
            <div className="articleSubTitle w-[1133px] text-[22px] mb-[32px]">
              <h3>
                ultivating active, vibrant, and honest exchange among
                cross-disciplinary and interdisciplinary global communities of
                technical industry professionals is essential for fostering
                innovation, collaboration, and progress. Here are some key
                points to consider when working towards this goa
              </h3>
            </div>
            <div className="articleLabelAndIcons flex items-center justify-between">
              <div className="label">

              <button className="text-[15px] font-sansramy w-[90px] h-[35px] bg-[#151F33] rounded-[20px] mr-[10px] ">
                Swift
              </button>
              <p>• 5 min read</p>
              </div>
              <div className="iconsContainer">
                <button className=" mr-[39px]">
                  <img src={saveicon} alt="" />
                </button>
                <button>
                  <img src={optionIcon} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
