import { NavBar } from "../components/common/navbar.tsx";
import { Link } from "react-router-dom";

export const Verifying = () => {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-center p-16 h-screen">
        <div className="max-w-[600px] ">
          <h1 className="text-4xl sm:text-6xl pb-2">Verifying your email</h1>
          <p className="pt-4 pb-8 text-left ">Won’t take long…</p>
          <div className="fixed bottom-0 w-80 h-auto right-0 p-4">
            <img src="src\assets\bg-triangle-ellipse@2x.png" alt="Triangle" />
          </div>
          <Link to="/onboard">
            <button className="bg-white text-black text-sm font-bold py-2 px-4 w-36 border-2 border-white rounded-full m-2 ">
              Finish
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
