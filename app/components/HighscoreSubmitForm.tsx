import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { highscoreNameSchema } from "../validationSchemas";
import { z } from "zod";
import Spinner from "./Spinner";
import scoreContext from "../state-management/contexts/scoreContext";

// HighscoreForm interface is generated based on properties of
// highscoreNameSchema
type HighscoreForm = z.infer<typeof highscoreNameSchema>;

const HighscoreSubmitForm = () => {
  const { score } = useContext(scoreContext)
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HighscoreForm>({
    // integrate react hook form with zod
    resolver: zodResolver(highscoreNameSchema),
  });

  const onSubmit = async (formData: HighscoreForm) => {
    try {
      setSubmitting(true);
      const dataToSend = { ...formData, score };
      await axios.post("/api/highscores", dataToSend);
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2>You got a highscore!</h2>
      <h2>Enter your name: </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          {...register("name")}
        />
        <button
          type="submit"
          className={`btn ${
            isSubmitting ? "cursor-not-allowed opacity-95" : ""
          }`}
          disabled={isSubmitting}
        >
          Submit
          {isSubmitting && <Spinner />}
        </button>
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
      </form>
    </>
  );
};

export default HighscoreSubmitForm;
