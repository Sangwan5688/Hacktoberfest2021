import { configureStore } from "@reduxjs/toolkit";
import playerReducer from '../features/player/playerSlice';
import turnReducer from '../features/turn/turnSlice';

export const store = configureStore({
    reducer: {
        player: playerReducer,
        turn: turnReducer, // Include other reducers as needed
    }
});
