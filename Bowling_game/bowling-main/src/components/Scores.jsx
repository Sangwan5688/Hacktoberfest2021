import {useSelector} from "react-redux";
import {PlayerRow} from "./PlayerRow.jsx";

export function Scores() {
    const players = useSelector(state => state.player.players);
    const currentFrame = useSelector(state => state.turn.currentFrame);

    const headers = [
        'Player Name',
        'Frame 1',
        'Frame 2',
        'Frame 3',
        'Frame 4',
        'Frame 5',
        'Frame 6',
        'Frame 7',
        'Frame 8',
        'Frame 9',
        'Frame 10',
        'Total'
    ];

    return (
        <>
            <h1 className="text-2xl font-bold bg-cyan-500 rounded-t-lg">
                Scores
            </h1>
            <table className="min-w-full">
                <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th className={`outline outline-pink-600 p-2 ${(index - 1) === currentFrame ? 'bg-cyan-500' : ''}`} key={index}>
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {players.map((player, index) => (
                    <tr key={player.id}>
                       <PlayerRow player={player} rowIndex={index}/>
                    </tr>
                ))}
                </tbody>
            </table>

        </>
    )
}