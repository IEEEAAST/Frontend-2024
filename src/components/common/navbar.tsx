import { useState } from "react";
import Logo from "../../assets/IEEEAAST.ico";
import globe from "../../assets/navbar/globe.svg";
import arrowDown from "../../assets//navbar/arrow-down.svg";
export const NavBar = () => {
  const [lang, setLang] = useState<string>("english");
  const disLang: string[] = ["english", "arabic"];
  return (
    <div className="absolute flex items-center justify-between py-2 w-full ">
      {/* left */}
      <div className="ml-4 w-2/6">
        <img src={Logo} alt="IEEE branch logo" height={90} width={90} />
      </div>
      {/* mid */}
      <div className="flex justify-center text-3xl gap-8 w-2/6 ">
        <button>
          <a>Home</a>
        </button>
        <button>
          <a>About</a>
        </button>
        <button>
          <a>Contact</a>
        </button>
      </div>
      {/* end */}
      <div className="flex justify-end text-3xl gap-8 mr-8 text-black w-2/6  font-bold ">
        <div className="dropdown  dropdown-end  font-bold ">
          <div
            tabIndex={0}
            role="button"
            className=" btn m-1 bg-black rounded-full px-8 h-14"
          >
            <div className="flex justify-center items-center gap-2">
              <img className="text-white" src={globe} alt="globe" width="20" />
              <p className="text-l">{lang}</p>
              <img
                className="text-white"
                src={arrowDown}
                alt="globe"
                width="20"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
          >
            {disLang.map((txt, index) => {
              return (
                <li key={index} className="text-white">
                  <a onClick={() => setLang(txt)}>{txt}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <button className="font-bold text-base ">
          <a className="bg-white px-8 py-4 rounded-full text-l">Sign In</a>
        </button>
      </div>
    </div>
  );
};
