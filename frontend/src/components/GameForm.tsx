import { useEffect, useState } from "react";
import type { Game } from "../types/Game";

type GameFormProps = {
  onSubmit: (game: Omit<Game, "Id">) => void;
  selectedGame: Game | null;
};

function GameForm({ onSubmit, selectedGame }: GameFormProps) {
  const [Name, setName] = useState("");
  const [Genre, setGenre] = useState("");
  const [Price, setPrice] = useState("");
  const [Rating, setRating] = useState("");

  useEffect(() => {
    if (selectedGame) {
      setName(selectedGame.Name);
      setGenre(selectedGame.Genre);
      setPrice(String(selectedGame.Price));
      setRating(String(selectedGame.Rating));
    } else {
      setName("");
      setGenre("");
      setPrice("");
      setRating("");
    }
  }, [selectedGame]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const game = {
      Name,
      Genre,
      Price: Number(Price),
      Rating: Number(Rating),
    };

    onSubmit(game);

    setName("");
    setGenre("");
    setPrice("");
    setRating("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedGame ? "Muuda mängu" : "Lisa uus mäng"}</h2>

      <input
        type="text"
        placeholder="Mängu nimi"
        value={Name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Žanr"
        value={Genre}
        onChange={(e) => setGenre(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Hind"
        value={Price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <input
        type="number"
        step="0.1"
        placeholder="Hinnang"
        value={Rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />

      <button type="submit">
        {selectedGame ? "Salvesta muudatus" : "Lisa mäng"}
      </button>
    </form>
  );
}

export default GameForm;