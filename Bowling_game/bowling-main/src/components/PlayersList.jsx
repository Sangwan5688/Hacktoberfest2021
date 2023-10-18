import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {removePlayer} from "../features/player/playerSlice.js";

export function PlayersList() {
    const players = useSelector(state => state.player.players);
    const dispatch = useDispatch();


    return (
        <>
            <h1 className="text-2xl font-bold mb-5">
                Players
            </h1>
            {players.map(player => (
                <div key={player.id} className="flex flex-row m-2 content-center items-center justify-around outline outline-cyan-500 rounded">
                    <div className="text-lg">
                        {player.name}
                    </div>
                    <button className="bg-red-500" onClick={()=> dispatch(removePlayer(player.id))}>Remove Player</button>
                </div>
            ))}
        </>
    );
}

