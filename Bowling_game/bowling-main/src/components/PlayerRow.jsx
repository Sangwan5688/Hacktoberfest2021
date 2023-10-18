import {nanoid} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
export function PlayerRow({player, rowIndex}) {
    const currentPlayerIndex = useSelector(state => state.turn.currentPlayerIndex);
    const hideWhenZero = (score) => {
        return score ? '' : 'invisible';
    }

    return (
        <>
            <td className={`${rowIndex === currentPlayerIndex ? 'bg-pink-500' : ''} outline outline-cyan-500`}>
                {player.name} {rowIndex} {currentPlayerIndex}
            </td>
            {player.frameScores.map((frame, index) => (
                <td className="outline outline-cyan-500" key={nanoid()}>
                    <div className="flex flex-col">
                        <div className="flex flex-row gap-1">
                            <div className="outline outline-cyan-500">
                                <div className={hideWhenZero(frame.firstAttempt)}>
                                    {frame.firstAttempt}
                                </div>
                            </div>
                            <div className="outline outline-cyan-500">
                                <div className={hideWhenZero(frame.secondAttempt)}>
                                    {frame.secondAttempt}
                                </div>
                            </div>
                            {index === 9 && <div className="outline outline-cyan-500">
                                <div className={hideWhenZero(frame.thirdAttempt)}>
                                    {frame.thirdAttempt}
                                </div>
                            </div>}
                        </div>
                        <div className="flex">
                            <div className={hideWhenZero(frame.thirdAttempt)}>
                                {frame.total}
                            </div>
                        </div>
                    </div>

                </td>
            ))}
            <td>Game total</td>
        </>
    )
}