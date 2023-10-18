import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    players: []
};

// Helper function to initialize frame scores
const initializeFrameScores = () => {
    const frameScores = new Array(10).fill({ firstAttempt: 0, secondAttempt: 0, total: 0, id: nanoid() });
    frameScores[9].thirdAttempt = 0;
    return frameScores;
};

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        addPlayer: (state, action) => {
            const player = {
                id: nanoid(),
                name: action.payload,
                frameScores: initializeFrameScores()
            }
            state.players.push(player);
        },
        removePlayer: (state, action) => {
            state.players = state.players.filter(player => {
                return player.id !== action.payload
            })
        },
    }
});

export const {addPlayer, removePlayer} = playerSlice.actions;

export default playerSlice.reducer;