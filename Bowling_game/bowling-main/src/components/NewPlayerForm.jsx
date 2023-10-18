import {useState} from "react";
import {useDispatch} from "react-redux";
import {addPlayer} from "../features/player/playerSlice.js";

export function NewPlayerForm(){
    const [playerName, setPlayerName] = useState("");
    const dispatch = useDispatch();
    const addPlayerHandler = e => {
        e.preventDefault();

        dispatch(addPlayer(playerName));
        setPlayerName('')
    }

    return (
        <form className="new-player-form" onSubmit={addPlayerHandler}>
            <div className="flex gap-x-4 items-center">
                <label htmlFor="item">Add Player:</label>
                <input className="" value={playerName} onChange={e => setPlayerName(e.target.value)} type="text" id="item" />
                <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add</button>
            </div>
        </form>
    )
}