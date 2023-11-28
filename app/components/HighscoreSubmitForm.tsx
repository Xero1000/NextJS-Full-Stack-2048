import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { highscoreNameSchema } from "../validationSchemas";
import { z } from "zod";

interface Props {
  score: number;
}

// HighscoreForm interface is generated based on properties of 
// highscoreNameSchema
type HighscoreForm = z.infer<typeof highscoreNameSchema>

const HighscoreSubmitForm = ({ score }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<HighscoreForm>({
    // integrate react hook form with zod
    resolver: zodResolver(highscoreNameSchema)
  });

  const onSubmit = async (formData: HighscoreForm) => {
    const dataToSend = { ...formData, score };
    await axios.post("/api/highscores", dataToSend);
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
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </>
  );
};

export default HighscoreSubmitForm;
