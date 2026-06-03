import type { Game } from "../types/Game";

type GameListProps = {
  games: Game[];
  onDelete: (id: number) => void;
  onEdit: (game: Game) => void;
};

function GameList({ games, onDelete, onEdit }: GameListProps) {
  return (
    <div>
      <h2>Mängude nimekiri</h2>

      {games.length === 0 ? (
        <p>Mänge ei ole.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nimi</th>
              <th>Žanr</th>
              <th>Hind</th>
              <th>Hinnang</th>
              <th>Tegevused</th>
            </tr>
          </thead>

          <tbody>
            {games.map((game) => (
              <tr key={game.Id}>
                <td>{game.Id}</td>
                <td>{game.Name}</td>
                <td>{game.Genre}</td>
                <td>{game.Price} €</td>
                <td>{game.Rating}</td>
                <td>
                  <button onClick={() => onEdit(game)}>Muuda</button>
                  <button onClick={() => onDelete(game.Id)}>Kustuta</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GameList;