import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { GoQuestion } from "react-icons/go";
import gameDataContext from "./state-management/contexts/gameDataContext";
import isModalOpenContext from "./state-management/contexts/isModalOpenContext";
import restartGameContext from "./state-management/contexts/restartGameContext";

interface Props {
  setIsInstructionsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHighScoreModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSaveGameModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoadGameModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// The navigation bar at the top of the page.
const NavBar = ({
  setIsInstructionsModalOpen,
  setIsHighScoreModalOpen,
  setIsSaveGameModalOpen,
  setIsLoadGameModalOpen,
}: Props) => {
  // Session hook from next-auth
  const { status, data: session } = useSession();

  // CONTEXTS

  // Context for game data
  const { gameOver } = useContext(gameDataContext);

  // Context for restarting the game
  const { setRestartGame } = useContext(restartGameContext);

  // Context for tracking if a modal is open
  const { isModalOpen } = useContext(isModalOpenContext);

  // STATES

  // State for tracking if dropdown menu is open
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  // State for tracking if Google avatar is missing when logged in
  const [avatarMissing, setAvatarMissing] = useState<boolean>(false);

  // User's Google avatar if they are logged in
  const avatar = session?.user!.image!;

  // Function for opening the dropdown menu
  const openDropdown = () => {
    setDropdownOpen(true);
  };

  // Function for closing hte dropdown menu
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Function for setting avatarMissing to true
  const handleAvatarMissing = () => {
    setAvatarMissing(true);
  };

  return (
    <div className="navbar bg-base-100 fixed z-10 text-white">
      <div className="navbar-start">
        {/* Dropdown menu
            Menu is hidden if screen width 
            is greater than 1024 pixels */}
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            onClick={openDropdown}
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
          {/* Menu content when dropdown is open */}
          {/* If a modal is currently open, the buttons
              will be disabled */}
          {dropdownOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/* Button for opening Instructions modal */}
              <li>
                <button
                  className={`${
                    isModalOpen ? "cursor-not-allowed text-gray-400" : ""
                  }`}
                  onClick={() => setIsInstructionsModalOpen(true)}
                  disabled={isModalOpen}
                >
                  Instructions
                </button>
              </li>
              {/* Button for opening Highscores modal */}
              <li>
                <button
                  className={`${
                    isModalOpen ? "cursor-not-allowed text-gray-400" : ""
                  }`}
                  onClick={() => {
                    setIsHighScoreModalOpen(true);
                    closeDropdown();
                  }}
                  disabled={isModalOpen}
                >
                  Highscores
                </button>
              </li>
              {/* Button for opening Save Game Modal */}
              {/* Disabled if player is not logged in or
                  the current game is over */}
              <li>
                <button
                  className={`${
                    status === "unauthenticated" || isModalOpen || gameOver
                      ? "cursor-not-allowed text-gray-400"
                      : ""
                  }`}
                  onClick={() => {
                    setIsSaveGameModalOpen(true);
                    closeDropdown();
                  }}
                  disabled={
                    status === "unauthenticated" || isModalOpen || gameOver
                  }
                >
                  Save Game
                </button>
              </li>
              {/* Button for opening Load Game modal */}
              {/* Button is disabled if player is not logged in or 
                  the current game is over */}
              <li>
                <button
                  className={`${
                    status === "unauthenticated" || isModalOpen
                      ? "cursor-not-allowed text-gray-400"
                      : ""
                  }`}
                  onClick={() => {
                    setIsLoadGameModalOpen(true);
                    closeDropdown();
                  }}
                  disabled={status === "unauthenticated" || isModalOpen}
                >
                  Load Game
                </button>
              </li>
              {/* Button to restart the game
                  Button is disabled if a modal is currently open */}
              <li>
                <button
                  className={`${
                    isModalOpen ? "cursor-not-allowed text-gray-400" : ""
                  }`}
                  onClick={() => {
                    setRestartGame(true);
                    closeDropdown();
                  }}
                  disabled={isModalOpen}
                >
                  Restart
                </button>
              </li>
            </ul>
          )}
        </div>
        <h3 className="ml-5 font-bold text-xl">2048</h3>
      </div>
      <div className="navbar-center hidden lg:flex">
        {/* Buttons for when browser width is greater than 1024 pixels */}
        <ul className="menu menu-horizontal px-1">
          {/* Button for opening Instructions Modal */}
          <li>
            <button
              className={`${
                isModalOpen ? "cursor-not-allowed text-gray-400" : ""
              }`}
              onClick={() => setIsInstructionsModalOpen(true)}
              disabled={isModalOpen}
            >
              Instructions
            </button>
          </li>
          {/* Button for opening Highscores modal */}
          <li>
            <button
              className={`${
                isModalOpen ? "cursor-not-allowed text-gray-400" : ""
              }`}
              onClick={() => setIsHighScoreModalOpen(true)}
              disabled={isModalOpen}
            >
              Highscores
            </button>
          </li>
          {/* Button for opening Save Game Modal */}
          {/* Disabled if player is not logged in or
              the current game is over */}
          <li>
            <button
              className={`${
                status === "unauthenticated" || isModalOpen || gameOver
                  ? "cursor-not-allowed text-gray-400"
                  : ""
              }`}
              onClick={() => {
                setIsSaveGameModalOpen(true);
                closeDropdown();
              }}
              disabled={status === "unauthenticated" || isModalOpen || gameOver}
            >
              Save Game
            </button>
          </li>
          {/* Button for opening Load Game modal */}
          {/* Button is disabled if player is not logged in or 
              the current game is over */}
          <li>
            <button
              className={`${
                status === "unauthenticated" || isModalOpen
                  ? "cursor-not-allowed text-gray-400"
                  : ""
              }`}
              onClick={() => {
                setIsLoadGameModalOpen(true);
                closeDropdown();
              }}
              disabled={status === "unauthenticated" || isModalOpen}
            >
              Load Game
            </button>
          </li>
          {/* Button to restart the game
              Button is disabled if a modal is currently open */}
          <li>
            <button
              className={`${
                isModalOpen ? "cursor-not-allowed text-gray-400" : ""
              }`}
              onClick={() => setRestartGame(true)}
              disabled={isModalOpen}
            >
              Restart
            </button>
          </li>
        </ul>
      </div>
      {/* Right end of the navbar */}
      <div className="navbar-end">
        {/* If player is logged in, their Google Avatar will appear
            If their avatar can't be retrieved, a question mark icon 
            will appear instead */}
        {status === "authenticated" && (
          <div className="dropdown dropdown-bottom dropdown-end mr-3">
            <div tabIndex={0} role="button">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  {!avatarMissing ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      onError={handleAvatarMissing}
                    />
                  ) : (
                    <div className="flex h-10 justify-center items-center">
                      <GoQuestion size={40} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Dropdown menu that opens when user clicks their avatar 
                The menu will display the user's email and a Log Out button */}
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
        {/* If user is not logged in, a Log In button will be shown */}
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
