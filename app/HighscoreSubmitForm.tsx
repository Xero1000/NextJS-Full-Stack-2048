import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { highscoreNameSchema } from "./validationSchemas";
import ButtonSpinner from "./ButtonSpinner";
import gameDataContext from "./state-management/contexts/gameDataContext";
import { useMutation } from "@tanstack/react-query";

interface Props {
  handleClose: () => void;
}

// HighscoreForm interface is generated based on properties of
// highscoreNameSchema
type HighscoreForm = z.infer<typeof highscoreNameSchema>;

const HighscoreSubmitForm = ({ handleClose }: Props) => {
  const { score } = useContext(gameDataContext);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HighscoreForm>({
    // integrate react hook form with zod
    resolver: zodResolver(highscoreNameSchema),
  });

  // mutation function
  const submitHighscore = async (formData: HighscoreForm) => {
    const data = { ...formData, score };
    await axios.post("/api/highscores", data);
  };

  // mutation hook
  const postHighscore = useMutation<void, Error, HighscoreForm>({
    mutationFn: submitHighscore,
    onSuccess: () => {
      // if highscore submission succeeds, modal will close after 1 second
      const id = setTimeout(() => {
        handleClose();
      }, 1000);
      setTimeoutId(id);
    },
    retry: 3,
  });

  // if the user closes the modal before 1 second passes after a
  // successful submission, the timeout will be cleared to avoid
  // issues with trying to update the state of an unmounted component
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const onSubmit = (formData: HighscoreForm) => {
    postHighscore.mutate(formData);
  };

  return (
    <>
      <h2 className="text-center text-xl mb-5">You got a highscore!</h2>
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Enter your name"
          className="input input-bordered w-full max-w-xs"
          {...register("name")}
        />
        <button
          type="submit"
          className={`btn ${
            postHighscore.status === "pending" ||
            postHighscore.status === "success"
              ? "cursor-not-allowed opacity-95"
              : ""
          }`}
          disabled={
            postHighscore.status === "pending" ||
            postHighscore.status === "success"
          }
        >
          {postHighscore.status === "pending" ? (
            <>
              Submitting
              <ButtonSpinner />
            </>
          ) : postHighscore.status === "success" ? (
            "Submitted"
          ) : (
            "Submit"
          )}
        </button>
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        {postHighscore.error && (
          <p className="text-red-600">Failed to submit highscore</p>
        )}
      </form>
    </>
  );
};

export default HighscoreSubmitForm;
