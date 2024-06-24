import Logo from "../../assets/IEEEAAST.ico";
import { LangSelector } from "./langSelector";
export const NavBar = () => {
  const disLang: string[] = ["English", "Arabic"];
  return (
    <div className="absolute flex items-center justify-between py-2 w-full z-10">
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
      <div className="flex items-center justify-end text-3xl gap-8 mr-8 text-black w-2/6">
        
        <LangSelector/>
        <button className="font-bold text-base ">
          <a className="bg-white px-8 py-4 rounded-full text-l">Sign In</a>
        </button>
      </div>
      
    </div>
  );
};
