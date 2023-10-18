import { useRef, useState } from "react";
import "./App.css";

import Board from "../components/Board";

function App() {
  const [board, setBoard] = useState([
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 9, 0, 0],
  ]);
  const [playerPosition, setPlayerPosition] = useState("0:2");
  const touchStart = useRef(null);

  const touchDownHandle = (e) => {
    touchStart.current = e.touches[0];
  };

  // Detach app ref
  const resetTouch = () => {
    touchStart.current = null;
  };

  // Captures the touch distance on the App component
  // and sets the player based on it's movements
  const touchMoveHandle = (e) => {
    if (!touchStart.current) {
      return;
    }

    const touchEnd = e.touches[0];
    const swipeDistanceX = touchEnd.clientX - touchStart.current.clientX;
    const swipeDistanceY = touchEnd.clientY - touchStart.current.clientY;

    if (Math.abs(swipeDistanceX) >= Math.abs(swipeDistanceY)) {
      if (swipeDistanceX > 9) {
        movePlayer("RIGHT");
      } else if (swipeDistanceX < 9) {
        movePlayer("LEFT");
      }
    } else {
      if (swipeDistanceY > 9) {
        movePlayer("DOWN");
      } else if (swipeDistanceY < -9) {
        movePlayer("UP");
      }
    }

    resetTouch();
  };

  // Captures the key pressed on the App component
  // and sets the player based on it's movements
  const appKeyUphandle = (e) => {
    const pressedKey = e.key;

    // Get the player current position
    let rowIndex = parseInt(playerPosition.split(":")[0]);
    let columnIndex = parseInt(playerPosition.split(":")[1]);

    // Conditions for player movement and restrictions
    if (pressedKey === "a" || pressedKey === "ArrowLeft") {
      movePlayer("LEFT");
    } else if (pressedKey === "w" || pressedKey == "ArrowUp") {
      movePlayer("UP");
    } else if (pressedKey === "s" || pressedKey === "ArrowDown") {
      movePlayer("DOWN");
    } else if (pressedKey === "d" || pressedKey === "ArrowRight") {
      movePlayer("RIGHT");
    }
  };

  // Sets player movements and update board
  const movePlayer = (direction) => {
    // Get the player current position
    let rowIndex = parseInt(playerPosition.split(":")[0]);
    let columnIndex = parseInt(playerPosition.split(":")[1]);
    if (direction === "UP" && rowIndex != 0) {
      const newRowIndex = rowIndex - 1;
      const newColumnIndex = columnIndex;
      setPlayerPosition(newRowIndex + ":" + newColumnIndex);

      updateBoard(rowIndex, columnIndex, newRowIndex, newColumnIndex);
    } else if (direction === "DOWN" && rowIndex != board.length - 1) {
      const newRowIndex = rowIndex + 1;
      const newColumnIndex = columnIndex;
      setPlayerPosition(newRowIndex + ":" + newColumnIndex);

      updateBoard(rowIndex, columnIndex, newRowIndex, newColumnIndex);
    } else if (
      direction === "RIGHT" &&
      columnIndex != board[rowIndex].length - 1
    ) {
      const newRowIndex = rowIndex;
      const newColumnIndex = columnIndex + 1;
      setPlayerPosition(newRowIndex + ":" + newColumnIndex);

      updateBoard(rowIndex, columnIndex, newRowIndex, newColumnIndex);
    } else if (direction === "LEFT" && columnIndex != 0) {
      const newRowIndex = rowIndex;
      const newColumnIndex = columnIndex - 1;
      setPlayerPosition(newRowIndex + ":" + newColumnIndex);

      updateBoard(rowIndex, columnIndex, newRowIndex, newColumnIndex);
    }
  };

  // Updates the board based on the player movement
  const updateBoard = (rowIndex, columnIndex, newRowIndex, newColumnIndex) => {
    const newBoard = board;
    newBoard[rowIndex][columnIndex] = 0;
    newBoard[newRowIndex][newColumnIndex] = 1;
    setBoard(newBoard);
  };

  //console.log(playerPosition);

  return (
    <div
      className="app-container"
      tabIndex="0"
      onTouchStart={touchDownHandle}
      onTouchMove={touchMoveHandle}
      onTouchEnd={resetTouch}
      onKeyUp={appKeyUphandle}
    >
      <Board boardSize={board} />
    </div>
  );
}

export default App;
