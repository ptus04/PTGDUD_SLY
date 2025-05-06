import React, { useState } from "react";

function Header() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    console.log("Fullscreen toggled");
  };

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow">
      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-64 rounded-lg border px-4 py-2 transition duration-200 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <img
            src="/img/search.png"
            alt="Search"
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-500 transition duration-200 hover:opacity-80"
          />
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-6">
        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="text-gray-600 transition duration-300 ease-in-out hover:text-blue-600 hover:shadow-lg"
        >
          <img
            src="/img/fullscreen.png"
            alt="Fullscreen"
            className="h-6 w-6 transition-transform duration-300 ease-in-out hover:scale-125"
          />
        </button>

        {/* Notifications */}
        <button className="relative text-gray-600 transition duration-300 ease-in-out hover:text-blue-600 hover:shadow-lg">
          <img
            src="/img/notification.png"
            alt="Notifications"
            className="h-6 w-6 transition-transform duration-300 ease-in-out hover:scale-125"
          />
          <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1 text-xs text-white transition duration-300 ease-in-out hover:bg-red-600">
            3
          </span>
        </button>

        {/* User Profile */}
        <img
          src="/img/user.png"
          alt="User"
          className="h-8 w-8 rounded-full border transition-transform duration-300 ease-in-out hover:scale-125 hover:border-blue-500 hover:shadow-lg"
        />
      </div>
    </header>
  );
}

export default Header;
