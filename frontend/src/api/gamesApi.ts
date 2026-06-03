import axios from "axios";
import type { Game } from "../types/Game";

const API_URL = "http://localhost:5000/api/games";

export const getGames = async () => {
  const response = await axios.get<Game[]>(API_URL);
  return response.data;
};

export const addGame = async (game: Omit<Game, "Id">) => {
  await axios.post(API_URL, game);
};

export const updateGame = async (id: number, game: Omit<Game, "Id">) => {
  await axios.put(`${API_URL}/${id}`, game);
};

export const deleteGame = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};