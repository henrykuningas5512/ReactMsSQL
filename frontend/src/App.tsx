import { useEffect, useState } from "react";
import type { Game } from "./types/Game";
import GameForm from "./components/GameForm";
import GameList from "./components/GameList";
import { addGame, deleteGame, getGames, updateGame } from "./api/gamesApi";
import "./App.css";

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const loadGames = async () => {
    const data = await getGames();
    setGames(data);
  };

  useEffect(() => {
    loadGames();
  }, []);

  const handleSubmit = async (game: Omit<Game, "Id">) => {
    if (selectedGame) {
      await updateGame(selectedGame.Id, game);
      setSelectedGame(null);
    } else {
      await addGame(game);
    }

    loadGames();
  };

  const handleDelete = async (id: number) => {
    await deleteGame(id);
    loadGames();
  };

  const handleEdit = (game: Game) => {
    setSelectedGame(game);
  };

  return (
    <div className="container">
      <h1>Games CRUD App</h1>

      <GameForm onSubmit={handleSubmit} selectedGame={selectedGame} />

      <GameList games={games} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default App;