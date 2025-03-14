import Logo from '../../assets/IEEEAAST.ico';
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

export const LogoButton = () => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [isTimerComplete, setIsTimerComplete] = useState(false);

  const handleMouseEnter = () => {
    const hoverTimer = setTimeout(() => {
      setIsTimerComplete(true);
    }, 2000); // 2 seconds delay

    // Cleanup timer if mouse leaves before 2 seconds
    return () => clearTimeout(hoverTimer);
  };

  const handleMouseLeave = () => {
    setIsTimerComplete(false); // Reset when the hover ends
  };

  if (userData?.roles?.includes('admin')) {
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative ml-[40vw] sm:ml-[20px]"
      >
        <img
          src={Logo}
          alt="IEEE branch logo"
          height={90}
          width={90}
          className={`transition-transform duration-1000 ease-in-out cursor-pointer ${
            isTimerComplete ? 'transform -translate-x-20 -rotate-180' : ''
          }`}
          onClick={() => {
            navigate('/')
          }}
        />
        <button
          onClick={() => {
            navigate('/admin')
          }}
          className={`absolute top-0 left-2 bg-blue-500 text-white px-4 py-2 rounded-full transition-opacity duration-500 text-xs text-center ${
            isTimerComplete ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            pointerEvents: isTimerComplete ? 'auto' : 'none', // Prevent clicks when hidden
          }}
        >
          Super Secret Admin Tools 🤫
        </button>
      </div>
    );
  } else {
    // Non-admin version
    return (
      <div className="ml-[40vw] sm:ml-[20px]">
        <a href="/">
          <img src={Logo} alt="IEEE branch logo" height={90} width={90} />
        </a>
      </div>
    );
  }
};
