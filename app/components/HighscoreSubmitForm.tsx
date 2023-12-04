import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { highscoreNameSchema } from "../validationSchemas";
import { z } from "zod";
import Spinner from "./Spinner";
import scoreContext from "../state-management/contexts/scoreContext";
import isModalOpenContext from "../state-management/contexts/isModalOpenContext";

// HighscoreForm interface is generated based on properties of
// highscoreNameSchema
type HighscoreForm = z.infer<typeof highscoreNameSchema>;

interface Props {
  handleClose: () => void
}

const HighscoreSubmitForm = ({ handleClose }: Props) => {
  const { setIsModalOpen } = useContext(isModalOpenContext)
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
      handleClose()
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-center text-xl mb-5">You got a highscore!</h2>
      <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter your name"
          className="input input-bordered w-full max-w-xs"
          {...register("name")}
        />
        <button
          type="submit"
          className={`btn ml-5 ${
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
