import homeBgImage from "../../assets/home/ieeeHome.jpg";

export const HomeComp = () => {
  return (
    <div
      className="flex flex-col bg-cover bg-center w-full h-screen"
      style={{ backgroundImage: `url(${homeBgImage})` }}
    >
      <div className="flex flex-col justify-center w-full h-full">
        <div className="flex flex-col justify-start ml-20 w-1/2 container ">
          <div className="text-4xl font-bold">
            <p>Fostering innovation through education </p>
            <p>technology, and professional</p>
            <p>development.</p>
          </div>
          <div className="flex mt-4 w-96 p-2 bg-white rounded-3xl">
            <input
              className="w-4/6 text-black placeholder-black pl-2 text-sm focus:outline-none bg-transparent"
              type="email"
              placeholder="Email address"
              autoComplete="email"
              aria-label="Email address"
            />
            <button className="w-2/6 text-sm bg-blue-950 rounded-3xl p-2">
              Join Us
            </button>
          </div>
          <div className="mt-4 text-sm font-normal">
            <p>Enter your email and become a member.</p>
            <p>No Credit Card Needed.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pb-4">
        <p>Join 120+ trusted distinguished partners.</p>
      </div>
    </div>
  );
};
