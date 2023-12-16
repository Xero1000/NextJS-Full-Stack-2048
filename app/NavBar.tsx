import React, { useContext, useState } from "react";
import restartGameContext from "./state-management/contexts/restartGameContext";
import isModalOpenContext from "./state-management/contexts/isModalOpenContext";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Props {
  onHighscoreClick: () => void;
}

const NavBar = ({ onHighscoreClick }: Props) => {
  const { status, data: session } = useSession();

  const { setRestartGame } = useContext(restartGameContext);
  const { isModalOpen } = useContext(isModalOpenContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="navbar bg-base-100 fixed z-10 text-white">
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
                <button
                  className={`${
                    isModalOpen ? "cursor-not-allowed text-gray-400" : ""
                  }`}
                  onClick={() => {
                    onHighscoreClick();
                    closeDropdown();
                  }}
                  disabled={isModalOpen}
                >
                  Highscores
                </button>
              </li>
              <li>
                <a>Save Game</a>
              </li>
              <li>
                <a>Load Game</a>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRestartGame(true);
                    closeDropdown();
                  }}
                >
                  Restart
                </button>
              </li>
            </ul>
          )}
        </div>
        <a className="btn btn-ghost text-xl">2048</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <button
              className={`${
                isModalOpen ? "cursor-not-allowed text-gray-400" : ""
              }`}
              onClick={onHighscoreClick}
              disabled={isModalOpen}
            >
              Highscores
            </button>
          </li>
          <li>
            <a>Save Game</a>
          </li>
          <li>
            <a>Load Game</a>
          </li>
          <li>
            <button onClick={() => setRestartGame(true)}>Restart</button>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {status === "authenticated" && (
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={session.user!.image!} />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-5 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="pl-4 pb-2 border-b-2">{session.user!.email}</li>
              <li>
                <Link href="/api/auth/signout">Log Out</Link>
              </li>
            </ul>
          </div>
        )}
        {status === "unauthenticated" && (
          <Link className="btn" href="/api/auth/signin">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
