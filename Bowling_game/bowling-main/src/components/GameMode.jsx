import {useSelector} from "react-redux";
import {Scores} from './Scores.jsx';
import {Roll} from './Roll.jsx';

export function GameMode() {

    return (
        <>
            <h1 className="text-3xl font-bold mb-5">
                Let's get ready to Bowl!
            </h1>
            <Scores />
            <Roll />
        </>
    )
}