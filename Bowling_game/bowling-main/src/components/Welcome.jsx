import {useSelector} from "react-redux";
import {NewPlayerForm} from "./NewPlayerForm.jsx";
import {PlayersList} from "./PlayersList.jsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export function Welcome() {
    const players = useSelector(state => state.player.players);
    const navigate = useNavigate(); // Initialize history

    const startGame = () => {
        navigate('/game-mode');
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-5">
                Welcome, Bowlers!
            </h1>
            <NewPlayerForm />
            <PlayersList />
            {players.length > 0 && <button className="bg-blue-500" onClick={() => startGame()}>Start Game</button>}
        </>
    )
}