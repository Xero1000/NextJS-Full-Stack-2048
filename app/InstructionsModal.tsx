import React from "react";
import useIsModalOpen from "./hooks/useIsModalOpen";

interface Props {
  isInstructionsModalOpen: boolean;
  setIsInstructionsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InstructionsModal = ({
  isInstructionsModalOpen,
  setIsInstructionsModalOpen,
}: Props) => {

  useIsModalOpen(isInstructionsModalOpen);

  const sharedHeadingClasses = "font-bold text-xl text-center py-5";
  const sharedUlClasses = "list-disc py-5 space-y-3";

  return (
    <dialog
      id="instructions_modal"
      className="modal"
      open={isInstructionsModalOpen}
    >
      <div className="modal-box mt-14">
        <h3 className="font-bold text-2xl text-center py-8">How to Play</h3>
        <div className="px-5 max-h-128 overflow-y-auto">
          <h4 className={sharedHeadingClasses}>Objective</h4>
          <ul className={sharedUlClasses}>
            <li>
              To merge the tiles on the board repeatedly to create a tile with
              the value of 2048.
            </li>
            <li>
              If the board fills up with tiles and no valid moves remain to be
              made, the game is lost.
            </li>
          </ul>
          <h4 className={sharedHeadingClasses}>New Tiles</h4>
          <ul className={sharedUlClasses}>
            <li>
              At the start of each game, two tiles will be generated in random
              spots within the 4x4 board
            </li>
            <li>
              After each move, a new tile will be generated in a random empty
              space on the board with either a value of 2 or 4.
            </li>
            <li>
              Newly generated tiles will have a 90% chance of holding a value of
              2 and 10% it will be 4.
            </li>
          </ul>
          <h4 className={sharedHeadingClasses}>Moving Tiles</h4>
          <ul className={sharedUlClasses}>
            <li>
              W, A, S, D keys to move all tiles on the board to the left, right,
              top, or bottom of the board.
            </li>
            <li>W = Up</li>
            <li>S = Down</li>
            <li>A = Left</li>
            <li>D = Right</li>
          </ul>
          <h4 className={sharedHeadingClasses}>Merging Tiles</h4>
          <ul className={sharedUlClasses}>
            <li>
              With each move, tiles with the same value and no other tiles
              between them in the direction of the move made will become a
              single tile.
            </li>
            <li>
              This new tile's value will be double the value held by the merged
              two tiles.
            </li>
          </ul>
          <h4 className={sharedHeadingClasses}>Score</h4>
          <ul className={sharedUlClasses}>
            <li>
              When two tiles merge, the new value will be added to the player's
              score.
            </li>
            <li>
              Whether you win or lose, if you achieve a highscore, you will have
              the option of entering your name and submitting it.
            </li>
          </ul>
          <h4 className={sharedHeadingClasses}>Save and Load Game</h4>
          <ul className={sharedUlClasses}>
            <li>
              To save and load your game, you must log in with your Google
              account.
            </li>
          </ul>
        </div>
        <p className="text-center pt-6">(Click outside to close)</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setIsInstructionsModalOpen(false)}>close</button>
      </form>
    </dialog>
  );
};

export default InstructionsModal;
