import { BsPeople } from "react-icons/bs"; 
import { AiFillCustomerService } from "react-icons/ai";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FcHome } from "react-icons/fc";
export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col">
        <span
          id="logo-title"
          className="font-poppins text-[48px] text-gray-900"
        >
          Sedap{" "}
          <b id="logo-dot" className="text-hijau">
            .
          </b>
        </span>
        <span id="logo-subtitle" className="font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      {/* List Menu */}
      <div id="sidebar-menu" className="mt-10">
        <ul id="menu-list" className="space-y-3">
          <li>
            <div
              id="menu-1"
              className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
            >
              <MdDashboard className="mr-4 text-xl" />
              Dashboard
            </div>
          </li>
          <li>
            <div
              id="menu-1"
              className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
            >
              <BsPeople className="mr-4 text-xl"/> 
              Customer
            </div>
          </li>
          <li>
            <div
              id="menu-2"
              className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
            >
              <FaMoneyBillAlt className="mr-4 text-xl" />
              Orders
            </div>
          </li>
          <li>
            <div
              id="menu-3"
              className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
            >
              <AiFillCustomerService className="mr-4 text-xl" />
              Customers
            </div>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div id="sidebar-footer" className="mt-auto">
        <div
          id="footer-card"
          className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center"
        >
          <div id="footer-text" className="text-white text-sm">
            <span>Please organize your menus through button below!</span>
            <div
              id="add-menu-button"
              className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2"
            >
              <span className="text-gray-600 flex items-center">Add Menus</span>
            </div>
          </div>
          <img
            id="footer-avatar"
            className="w-20 rounded-full"
            src="data:image/jpeg;base64,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"
          />
        </div>
        <span id="footer-brand" className="font-bold text-gray-400">
          Sedap Restaurant Admin Dashboard
        </span>
        <p id="footer-copyright" className="font-light text-gray-400">
          &copy; 2025 All Right Reserved
        </p>
      </div>
    </div>
  );
}
