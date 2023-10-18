// turnSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPlayerIndex: 0, // Index of the player currently taking a turn
    currentFrame: 0, // Index of the active frame (0-9 for a typical game)
    currentRoll: 1, // 1 for the first roll, 2 for the second roll, 3 for the third roll (if applicable)
};

export const turnSlice = createSlice({
    name: 'turn',
    initialState,
    reducers: {
        nextPlayer: (state, action) => {
            // Increment the currentPlayerIndex and reset other turn-related values as needed
            state.currentPlayerIndex++;

            // If you reach the end of the player list, loop back to the first player
            if (state.currentPlayerIndex > action.payload.length - 1) {
                //where can I get the length of players array from another slice file?
                state.currentPlayerIndex = 0;
                state.currentFrame++;
            }
        },
        nextFrame: (state, action) => {
            // Logic to move to the next frame
        },
        nextRoll: (state, action) => {
            // Logic to move to the next roll within the frame
        },
    }
});

export const { nextPlayer, nextFrame, nextRoll } = turnSlice.actions;

export default turnSlice.reducer;
