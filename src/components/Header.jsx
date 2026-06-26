import { GiPresent } from "react-icons/gi";
import { FaBell, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { profile, logout } = useAuth();

  return (
    <div
      id="header-container"
      className="flex justify-between items-center p-4 bg-white border-b border-slate-100"
    >
      {/* Search Bar */}
      <div id="search-bar" className="relative w-full max-w-lg">
        <input
          id="search-input"
          type="text"
          placeholder="Search Here..."
          className="border border-gray-100 p-2 pr-10 bg-slate-50 w-full max-w-lg rounded-md outline-none focus:ring-2 focus:ring-green-500"
        />

        <FaSearch
          id="search-icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
        />
      </div>

      {/* Icon & Profile Section */}
      <div id="icons-container" className="flex items-center space-x-4">
        {/* Notification */}
        <div
          id="notification-icon"
          className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer"
        >
          <FaBell />

          <span
            id="notification-badge"
            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs"
          >
            50
          </span>
        </div>

        {/* Package */}
        <div
          id="package-icon"
          className="p-3 bg-orange-100 rounded-2xl cursor-pointer"
        >
          <GiPresent className="text-orange-500" />
        </div>

        {/* Settings */}
        <div
          id="settings-icon"
          className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer"
        >
          <SlSettings />
        </div>

        {/* Profile Section */}
        <div
          id="profile-container"
          className="flex items-center space-x-4 border-l border-gray-300 pl-4"
        >
          <span id="profile-text" className="hidden md:inline-block">
            Hi, <b>{profile?.full_name || 'User'}</b>
          </span>

          <img
            id="profile-avatar"
            src={`https://ui-avatars.com/api/?name=${profile?.full_name || 'U'}&background=random`}
            className="w-10 h-10 rounded-full border border-slate-200"
            alt="Profile"
          />

          <button 
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors text-sm font-semibold"
            title="Logout"
          >
            <FaSignOutAlt /> <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}