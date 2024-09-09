import React from "react";
import renaissanceLogo from "../assets/logo.png";
import { IoIosLogOut } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";

const handleLogout = () => {
  localStorage.clear("token");
  window.location.href = "/";
};

const Navbar = ({ userData }) => {
  if (Object.keys(userData).length > 0) {
    return (
      <div className="navbar bg-neutral px-10 py-3">
        <div className="navbar-start">
          <a href="/" className="btn btn-ghost normal-case text-xl p-0">
            <img
              src={renaissanceLogo}
              alt="Renaissance Logo"
              className="h-full max-h-12 w-auto object-contain hover:scale-105 duration-300"
            />
          </a>
        </div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>About Us</a>
            </li>
          </ul>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/aboutus">About Us</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end dropdown-content">
          <details className="dropdown">
            <summary className="btn m-1 bg-slate-900">
              Hello {userData.firstName}
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-30 p-2 shadow">
              <li>
                <a onClick={handleLogout}>
                  Logout <IoIosLogOut />
                </a>
              </li>
              <li>
                <a>
                  Settings <IoIosSettings />
                </a>
              </li>
            </ul>
          </details>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar bg-neutral px-10 py-3">
        <div className="navbar-start">
          <a href="/" className="btn btn-ghost normal-case text-xl p-0">
            <img
              src={renaissanceLogo}
              alt="Renaissance Logo"
              className="h-full max-h-12 w-auto object-contain hover:scale-105 duration-300"
            />
          </a>
        </div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>About Us</a>
            </li>
            <li>
              <a>Try Now !</a>
              <ul className="p-2">
                <li>
                  <a>Maintainance Calories</a>
                </li>
                <li>
                  <a>Macros Calculator</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/aboutus">About Us</a>
            </li>
            <li>
              <details>
                <summary>Try Now !</summary>
                <ul className="p-2">
                  <li>
                    <a>Maintainance Calories</a>
                  </li>
                  <li>
                    <a>Macros Calculator</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a href="/signup" className="btn bg-slate-900">
            {" "}
            Login / Signup{" "}
          </a>
        </div>
      </div>
    );
  }
};

export default Navbar;
