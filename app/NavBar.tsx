import React, { useState } from "react";

interface Props {
  onHighscoreClick: () => void;
}

const NavBar = ({ onHighscoreClick }: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="navbar bg-base-100 fixed z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            onClick={toggleDropdown}
          >
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
          </label>
          {dropdownOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={() => { onHighscoreClick(); closeDropdown(); }}>Highscores</button>
              </li>
              <li>
                <a>Save Game</a>
              </li>
              <li>
                <a>Load Game</a>
              </li>
              <li>
                <a>Restart</a>
              </li>
            </ul>
          )}
        </div>
        <a className="btn btn-ghost text-xl">2048</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <button onClick={onHighscoreClick}>Highscores</button>
          </li>
          <li>
            <a>Save Game</a>
          </li>
          <li>
            <a>Load Game</a>
          </li>
          <li>
            <a>Restart</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default NavBar;
