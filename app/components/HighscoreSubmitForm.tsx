import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface Props {
  score: number;
}

interface HighscoreForm {
  name: string;
}

const HighscoreSubmitForm = ({ score }: Props) => {
  const { register, handleSubmit } = useForm<HighscoreForm>();

  const onSubmit = (formData: HighscoreForm) => {
    const dataToSend = { ...formData, score };
    axios.post("/api/highscores", dataToSend);
  };

  return (
    <>
      <h2>You got a highscore!</h2>
      <h2>Enter your name: </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          {...register("name")}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </>
  );
};

export default HighscoreSubmitForm;
