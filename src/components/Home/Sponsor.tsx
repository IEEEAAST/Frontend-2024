import logo from "../../assets/IEEELogoWhite.png";

export const Sponsor = () => {
  return (
    <div className="flex justify-center items-center gap-12 border-4 border-y-blue-950/55 w-full border-x-transparent h-40 overflow-x-auto overflow-y-hidden customScrollbar">
      <img src={logo} alt="logo" width="120"/>
      <img src={logo} alt="logo" width="120"/>
      <img src={logo} alt="logo" width="120"/>
      <img src={logo} alt="logo" width="120"/>
      <img src={logo} alt="logo" width="120"/>
      <img src={logo} alt="logo" width="120"/>
    </div>
  );
};
