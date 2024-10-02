import React, { useEffect, useState } from "react";
import getUserNotifications from "../../firebase/getUserNotifications";
import Bell from "../../assets/notify-me-bell-white.png";

export const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dummyEmail = "mariam.alaafathy@gmail.com"; // Use your dummy email here

  useEffect(() => {
    getUserNotifications(dummyEmail).then((data) => {
      setNotifications(data);
    });
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown}>
        <img className="h-10" src={Bell} alt="Bell" />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-300 rounded-md shadow-lg z-10">
          <h2 className="p-2 text-lg font-semibold">Notifications</h2>
          <div className="max-h-60 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notif, index) => (
                <div key={index} className="p-2 border-b">
                  <p>{notif}</p>
                  <span>{new Date().toLocaleString()}</span>{" "}
                </div>
              ))
            ) : (
              <p className="p-2">No notifications available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
