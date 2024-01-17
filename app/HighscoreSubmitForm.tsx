import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { highscoreNameSchema } from "./validationSchemas";
import ButtonSpinner from "./ButtonSpinner";
import gameDataContext from "./state-management/contexts/gameDataContext";
import { useMutation } from "@tanstack/react-query";
import useClearTimeout from "./hooks/useClearTimeout";

interface Props {
  handleClose: () => void;
}

// HighscoreForm interface is generated based on properties of
// highscoreNameSchema
type HighscoreForm = z.infer<typeof highscoreNameSchema>;

// Form that appears on the EndGameModal if the player gets a highscore
// The form allows the player to submit their highscore.
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
  useClearTimeout(timeoutId);

  // Function to call the mutation function
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
        {/* Submit button is disabled when highscore is submitting
            or is successfully submitted */}
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
          {/* Submit button will display Submitting 
              and a spinner after being clicked.
              If submission succeeds, button will display
              Submitted.
              While button is not clicked, it will just say Submit */}
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
        {/* If the submission fails, an error message will be shown */}
        {errors.name && <p className="text-red">{errors.name.message}</p>}
        {postHighscore.error && (
          <p className="text-red">Failed to submit highscore</p>
        )}
      </form>
    </>
  );
};

export default HighscoreSubmitForm;
