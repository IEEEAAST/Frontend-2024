import { useState, useRef, useEffect, useContext } from "react";
import Logo from "../../assets/IEEEAAST.ico";
import { LangSelector } from "./langSelector";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll, scroller } from "react-scroll";
import { UserContext } from "../../App";
import SignOut from "../../firebase/signout";
import ProfileMenu from "./profileMenu";
import { NotificationDropdown } from "./NotificationDropdown"; // Ensure this path is correct

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation(); // Get the current location
  const { userData } = useContext(UserContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    const hash = location.hash;
    if (hash === "#contactSection") {
      setTimeout(() => {
        animateScroll.scrollToBottom({ duration: 0, smooth: "easeInOutQuart" });
        window.history.replaceState(null, "", location.pathname);
      }, 700);
    } else if (hash) {
      scroller.scrollTo(hash.substring(1), {
        duration: 0,
        smooth: "easeInOutQuart",
        offset: 100,
      });
      window.history.replaceState(null, "", location.pathname);
    }
  }, [location]);

  return (
    <>
      <div className="absolute flex items-start sm:items-center justify-between py-2 w-full z-50">
        {/* left */}
        <div className="ml-[40vw] sm:ml-auto">
          <Link to="/">
            <img src={Logo} alt="IEEE branch logo" height={90} width={90} />
          </Link>
        </div>

        {/* mid */}
        <div className="flex-1 justify-center hidden sm:flex">
          <div className="flex justify-center text-3xl gap-8">
            <button>
              <Link to="/" className="text-2xl md:text-3xl">
                Home
              </Link>
            </button>
            <button>
              <Link to="/home" className="text-2xl md:text-3xl">
                Browse
              </Link>
            </button>
            <button>
              <ScrollLink to="aboutSection" smooth={true} duration={0}>
                <button
                  className="cursor-pointer text-2xl md:text-3xl"
                  onClick={() => {
                    if (window.location.pathname !== "/") {
                      window.location.href = "/#aboutSection";
                    }
                  }}
                >
                  About
                </button>
              </ScrollLink>
            </button>
            <button>
              <ScrollLink to="contactSection" smooth={true} duration={0}>
                <button
                  className="cursor-pointer text-2xl md:text-3xl"
                  onClick={() => {
                    if (window.location.pathname !== "/") {
                      window.location.href = "/#contactSection";
                    }
                  }}
                >
                  Contact
                </button>
              </ScrollLink>
            </button>
            <NotificationDropdown />
          </div>
        </div>
        {/* end */}
        <div className="items-center justify-end text-3xl gap-8 mr-8 text-black hidden sm:flex">
          <LangSelector />
          {!userData ? (
            <button className="font-bold text-base">
              <Link
                to={"/signin"}
                className="text-base bg-white px-8 py-4 rounded-full"
              >
                {"Sign In"}
              </Link>
            </button>
          ) : (
            <ProfileMenu />
          )}
        </div>

        {/* Hamburger menu for small screens */}
        <div className="sm:hidden flex items-center ml-4 z-50">
          <div
            ref={menuRef}
            className={`${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            } fixed inset-y-0 left-0 w-3/4 transition-transform duration-300 ease-in-out z-40 flex flex-col sm:hidden`}
            style={{
              background: "linear-gradient(0deg, #1f396e 0%, #000b21 100%)",
              boxShadow: menuOpen ? "4px 0px 4px rgba(0, 0, 0, 0.5)" : "none",
              opacity: 0.98,
            }}
          >
            <button
              className="w-full h-12 border-solid border-b my-2 flex justify-center items-center text-2xl"
              style={{ borderColor: "#00050f" }}
              onClick={() => {
                setMenuOpen(false);
                window.location.pathname === "/"
                  ? animateScroll.scrollToTop({ duration: 0 })
                  : window.open("/", "_self");
              }}
            >
              Home
            </button>
            <button
              className="w-full h-12 border-solid border-b my-2 flex justify-center items-center text-2xl"
              style={{ borderColor: "#00050f" }}
              onClick={() => {
                setMenuOpen(false);
                window.open("/home", "_self");
              }}
            >
              Browse
            </button>
            <ScrollLink
              to="aboutSection"
              className="cursor-pointer text-2xl"
              smooth={true}
              duration={0}
            >
              <button
                className="w-full h-12 border-solid border-b my-2 flex justify-center items-center"
                style={{ borderColor: "#00050f" }}
                onClick={() => {
                  setMenuOpen(false);
                  if (window.location.pathname !== "/") {
                    window.location.href = "/#aboutSection";
                  }
                }}
              >
                About
              </button>
            </ScrollLink>
            <ScrollLink
              to="contactSection"
              className="cursor-pointer text-2xl"
              smooth={true}
              duration={0}
            >
              <button
                className="w-full h-12 border-solid border-b my-2 flex justify-center items-center"
                style={{ borderColor: "#00050f" }}
                onClick={() => {
                  setMenuOpen(false);
                  if (window.location.pathname !== "/") {
                    window.location.href = "/#contactSection";
                  }
                }}
              >
                Contact
              </button>
            </ScrollLink>
            <Link to={userData ? "" : "/signin"}>
              <button
                className="w-full h-12 border-solid border-b my-2 flex justify-center items-center text-2xl"
                style={{ borderColor: "#00050f" }}
                onClick={() => {
                  setMenuOpen(false);
                  if (userData) {
                    SignOut();
                    window.location.reload();
                  }
                }}
              >
                {userData ? "Sign Out" : "Sign In"}
              </button>
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            className="text-black top-2 left-2 p-1 rounded-lg fixed"
            style={{
              backgroundColor: "#000b21",
              boxShadow: "0px 0px 4px rgba(255, 255, 255, 1.0)",
              opacity: "0.8",
            }}
          >
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <div
            className="fixed top-2 right-2 w-fit rounded-full"
            style={{ boxShadow: "0 0 5px 3px #000B21" }}
          >
            <ProfileMenu />
          </div>
        </div>
      </div>
    </>
  );
};
