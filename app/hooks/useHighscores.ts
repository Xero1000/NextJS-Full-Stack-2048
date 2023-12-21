import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Highscore } from "@prisma/client";

const fetchHighscores = () => {
  return axios.get<Highscore[]>("/api/highscores").then(res => res.data);
};

export const useHighscores = () => {
  return useQuery<Highscore[]>({
    queryKey: ["highscores"],
    queryFn: fetchHighscores,
  });
};