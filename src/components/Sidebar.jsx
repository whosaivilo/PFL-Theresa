import { BiNote } from "react-icons/bi"; 
import { AiOutlineMenu } from "react-icons/ai"; 
import { AiOutlineDropbox } from "react-icons/ai"; 
import { BsPeople } from "react-icons/bs";
import { AiFillCustomerService } from "react-icons/ai";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdDashboard, MdExtension } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
  const { role } = useAuth();

  const menuClass = ({ isActive }) => {
    return `flex cursor-pointer items-center rounded-xl p-4 font-medium transition-all duration-200 ${
      isActive
        ? "bg-green-200 text-hijau font-extrabold shadow-sm"
        : "text-gray-600 hover:bg-green-100 hover:text-hijau"
    }`;
  };

  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg "
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col font-bold ">
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
            <NavLink to="/" className={menuClass}>
              <MdDashboard className="mr-4 text-xl" />
              Dashboard
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/products" className={menuClass}>
              <AiOutlineDropbox className="mr-4 text-xl" />
              Produk
            </NavLink>
          </li>
          
          {role === 'admin' && (
            <>
              <li>
                <NavLink to="/customers" className={menuClass}>
                  <BsPeople className="mr-4 text-xl" />
                  Customer
                </NavLink>
              </li>
              <li>
                <NavLink to="/orders" className={menuClass}>
                  <FaMoneyBillAlt className="mr-4 text-xl" />
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="/components" className={menuClass}>
                  <MdExtension className="mr-4 text-xl" />
                  Components
                </NavLink>
              </li>
              <li>
                <NavLink to="/service" className={menuClass}>
                  <AiFillCustomerService className="mr-4 text-xl" />
                  Service
                </NavLink>
              </li>
              <li>
                <NavLink to="/FiturXyz" className={menuClass}>
                  <AiOutlineMenu  className="mr-4 text-xl" />
                  Fitur Xyz
                </NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink to="/notes" className={menuClass}>
              <BiNote  className="mr-4 text-xl" />
              Note
            </NavLink>
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
