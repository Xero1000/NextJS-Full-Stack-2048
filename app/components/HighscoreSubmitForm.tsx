import React, { useState } from "react";

interface Props {
    score: number
}

const HighscoreSubmitForm = ({ score }: Props) => {
  const [name, setName] = useState("");

  return (
    <>
      <h2>You got a highscore!</h2>
      <h2>Enter your name: </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(name, score)
        }}
      >
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn">Submit</button>
      </form>
    </>
  );
};

export default HighscoreSubmitForm;
