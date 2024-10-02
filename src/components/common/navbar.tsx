import { useState, useRef, useEffect, useContext } from "react";
import Logo from "../../assets/IEEEAAST.ico";
import searchIcon from "../../assets/search-magnifier-white@2x.png";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll, scroller } from 'react-scroll';
import { UserContext } from "../../App"
import SignOut from "../../firebase/signout"
import ProfileMenu from "./profileMenu";
import getCollection from "../../firebase/getCollection.js";
import "../common/styles/Navbar.css";
import Home from "../../assets/home.png";
import Browse from "../../assets/browse.png";
import Bookmark from "../../assets/save.png";
import Write from "../../assets/write.png"
import Bell from "../../assets/bell.png"
import { LogoButton } from "./LogoButton.js";



interface ArticleData {
  article: string;
  author: string;
  caption: string;
  description: string;
  image: string;
  likes : number;
  publishdate: string;
  title: string;
}
interface EventData {
  coverPhoto : string;
  description: string;
  enddtime: any;
  formLink: string;
  gallary: string[];
  speakers: string[];
  sponsors: string[];
  starttime: any;
  title: string;
  type: string;
}

export const NavBar : React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation(); // Get the current location
  const { userData } = useContext(UserContext);
  const [searched, setSearched] = useState(''); //search
  const [article, setArticle] = useState<ArticleData[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);

  const navigate = useNavigate(); 

  useEffect(()=>{
    getCollection("articles").then((res) => {
      if (res.result){
        const article = res.result as ArticleData[];
        setArticle(article);
      }
    })
  },[]);

  useEffect(()=>{
    getCollection("events").then((res) => {
      if (res.result){
        const events = res.result as EventData[];
        setEvents(events);
      }
    })
  },[]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(e.target.value);
  };

  const titles = article.map(articleTitles => articleTitles.title)
  const filterArticles = searched ? titles.filter((t) =>
    t.toLowerCase().includes(searched.toLowerCase())
  ):null;


  const EventTitle = events.map(e => e.title)

    const filterEvents = searched ? EventTitle.filter((t) =>
    t.toLowerCase().includes(searched.toLowerCase())
  ) : null;


  const handleClick = (handled: string) => {
    if (filterArticles?.includes(handled)) {
      navigate(`/article/${handled}`);
    } else if (filterEvents?.includes(handled)) {
      navigate(`/event/${handled}`);
    }else{
      console.log("no nav found")
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
      <div className="wrapper absolute flex items-start sm:items-center justify-between py-2 w-full z-50">
      
        {/* left */}        
        <LogoButton />
        
        {/* mid */}
        <div className="flex-1 justify-start hidden sm:flex">
          <div className="flex justify-center gap-3 ml-5 w-full">
            <button>
              <Link to="/" >
              <div className="border-2 rounded-full border-white w-[40px]">
                <img src={Home} alt="Home" height={90} width={45}  />
              </div>
              </Link>
            </button>
            <button>
              <Link to="/browse" >
              <div className="border-2 rounded-full border-white w-[40px] p-1">
                <img src={Browse} alt="Browse" height={90} width={45}  />
              </div>
              </Link>
            </button>

            {/*search bar*/}
            <div className="nav-search">
              <div className="search-bar">
                <img src={searchIcon} alt="search icon"/>
                <input      
                  type="text"
                  placeholder="Search articles, events..."
                  value={searched}
                  onChange={handleSearch}
                  className="w-full"
                />
                </div>
                <div className={`search-results ${((filterArticles?.length==0&&filterEvents?.length==0)||searched.length==0)&&'hidden'}`}>
                  {filterArticles?.map((a)=>(
                    <div className="result" onClick={() => handleClick(a)}>{a}</div>
                  ))}
                  {filterEvents?.map((e)=>(
                    <div className="result" onClick={() => handleClick(e)}>{e}</div>
                  ))}
                </div>
            </div>
            <div className="flex gap-2 mr-4">
            {
              (userData?.roles?.includes("admin") || userData?.roles?.includes("author")) &&
            <button>
              <Link to="/write" >
              <div className="border-2 rounded-full border-white w-[40px] p-1">
                <img src={Write} alt="Write Article" height={90} width={45}  />
              </div>
              </Link>
            </button>
            }
            <button>
              <div className="border-2 rounded-full border-white w-[40px] p-[7px]">
                <img src={Bookmark} alt="Bookmarks" height={90} width={45}  />
              </div>
            </button>
            <button>
              <div className="border-2 rounded-full border-white w-[40px] p-1">
                <img src={Bell} alt="Notifications" height={90} width={45}  />
              </div>
            </button>
            </div>

          </div>
        </div>
        <div className="items-center justify-end text-3xl gap-8 mr-8 text-black hidden sm:flex">
          {!userData ? <button className="font-bold text-base">
            <Link to={"/signin"} className="text-base bg-white px-8 py-4 rounded-full">{"Sign In"}</Link>
          </button> : <ProfileMenu />
          }
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
                window.open("/browse", "_self");
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
