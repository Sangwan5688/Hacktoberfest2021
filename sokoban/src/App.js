import { useEffect, useRef, useState } from "react";
import levels from "./levels.json";
/**
 *   # -> wall
 *  ' '-> floor
 *   $ -> box
 *   @ -> player
 *   . -> dock
 *   * -> box on dock
 *   + -> player on dock
 */

const directions = {
  up: 1,
  right: 2,
  down: 3,
  left: 4,
};

const types = {
  wall: 1,
  player: 2,
  box: 3,
  floor: 4,
  dock: 7,
  dockWithPlayer: 8,
  dockWithBox: 9,
};

const createGameFieldFromString = (str) => {
  const gameField = [];

  const rows = str.split("\n").filter((r) => r.length);

  const maxRowLength = Math.max(...rows.map((r) => r.length));

  let playerX;
  let playerY;

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];

    const emptyRow = Array.from({ length: maxRowLength }, () => " ");

    gameField.push(emptyRow);
    for (let x = 0; x < row.length; x++) {
      let value;
      switch (row[x]) {
        case "#":
          value = types.wall;
          break;
        case " ":
          value = types.floor;
          break;
        case "$":
          value = types.box;
          break;
        case "@":
          value = types.player;
          playerX = x;
          playerY = y;
          break;
        case ".":
          value = types.dock;
          break;
        case "*":
          value = types.dockWithBox;
          break;
        case "+":
          value = types.dockWithPlayer;
          playerX = x;
          playerY = y;
          break;
        default:
          break;
      }
      gameField[y][x] = value;
    }
  }

  return { gameField, playerX, playerY };
};

const App = () => {
  const [gameField, setGameField] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const gameFieldWrapperRef = useRef();

  const [beatenLevels, setBeatenLevels] = useState(() => {
    const localStorageData = localStorage.getItem(`beatenLevels`);

    if (localStorageData) {
      return JSON.parse(localStorageData);
    }

    return {};
  });

  const loadLevel = (levelIndex) => {
    const {
      gameField: _gameField,
      playerX,
      playerY,
    } = createGameFieldFromString(levels[levelIndex]);

    setGameField(_gameField);
    setPlayer({ x: playerX, y: playerY });
    setIsWon(false);
    setCurrentLevel(levelIndex);
  };

  useEffect(() => {
    loadLevel(currentLevel);
  }, [currentLevel]);

  const [player, setPlayer] = useState({
    x: 1,
    y: 2,
  });

  const getAdjacentCellByDirection = (sourceX, sourceY, dir) => {
    let x = sourceX;
    let y = sourceY;
    switch (dir) {
      case directions.up:
        y -= 1;
        break;
      case directions.right:
        x += 1;
        break;
      case directions.down:
        y += 1;
        break;
      case directions.left:
        x -= 1;
        break;
      default:
        break;
    }

    return { x, y, type: gameField[y][x] };
  };

  const movePlayerTo = (targetCell) => {
    const _gameField = JSON.parse(JSON.stringify(gameField));
    const playerCellType = _gameField[player.y][player.x];

    //set player's current position to floor or dock
    _gameField[player.y][player.x] =
      playerCellType === types.dockWithPlayer ? types.dock : types.floor;

    //set target position to player or dockWithPlayer
    _gameField[targetCell.y][targetCell.x] =
      targetCell.type === types.dock ? types.dockWithPlayer : types.player;

    setGameField(_gameField);
    setPlayer({ x: targetCell.x, y: targetCell.y });
  };

  useEffect(() => {
    if (
      gameField.length &&
      gameField.flat().filter((c) => c === types.box).length === 0
    ) {
      setIsWon(true);

      setBeatenLevels((prev) => {
        const newBeatenLevels = { ...prev, [currentLevel]: true };

        localStorage.setItem(`beatenLevels`, JSON.stringify(newBeatenLevels));

        return newBeatenLevels;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameField]);

  const tryToPushBoxToDir = (boxCell, dir) => {
    const _gameField = JSON.parse(JSON.stringify(gameField));
    const playerCellType = _gameField[player.y][player.x];
    const pushTarget = getAdjacentCellByDirection(boxCell.x, boxCell.y, dir);

    if (pushTarget.type === types.floor || pushTarget.type === types.dock) {
      //set player's current position to floor or dock
      _gameField[player.y][player.x] =
        playerCellType === types.dockWithPlayer ? types.dock : types.floor;

      //set target position to player or dockWithPlayer
      _gameField[boxCell.y][boxCell.x] =
        boxCell.type === types.dockWithBox
          ? types.dockWithPlayer
          : types.player;

      _gameField[pushTarget.y][pushTarget.x] =
        pushTarget.type === types.floor ? types.box : types.dockWithBox;

      setGameField(_gameField);
      setPlayer({ x: boxCell.x, y: boxCell.y });
    }
  };

  const handlePlayerInput = (dir) => {
    const targetCell = getAdjacentCellByDirection(player.x, player.y, dir);

    if (!isWon) {
      switch (targetCell.type) {
        case types.floor:
        case types.dock:
          movePlayerTo(targetCell);
          break;
        case types.box:
        case types.dockWithBox:
          tryToPushBoxToDir(targetCell, dir);
          break;
        default:
          break;
      }
    }
  };

  const handleKeyDown = (e) => {
    switch (e.code) {
      case "ArrowUp":
        return handlePlayerInput(directions.up);
      case "ArrowRight":
        return handlePlayerInput(directions.right);
      case "ArrowDown":
        return handlePlayerInput(directions.down);
      case "ArrowLeft":
        return handlePlayerInput(directions.left);
      case "KeyR":
        return loadLevel(currentLevel);
      case "KeyN":
        return onNextLevel();
      case "KeyP":
        return onPreviousLevel();
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, isWon]);

  useEffect(() => {
    const setAvailableGameFieldHeight = () => {
      document
        .querySelector("html")
        .style.setProperty(
          "--available-game-field-height",
          `${gameFieldWrapperRef.current.clientHeight}px`
        );
    };

    setAvailableGameFieldHeight();
    window.addEventListener("resize", setAvailableGameFieldHeight);
    return () =>
      window.removeEventListener("resize", setAvailableGameFieldHeight);
  }, []);

  useEffect(() => {
    const verticalCells = gameField.length;
    const horizontalCells = gameField[0]?.length ?? 0;

    const html = document.querySelector("html");
    html.style.setProperty("--vertical-cells", verticalCells);
    html.style.setProperty("--horizontal-cells", horizontalCells);
  }, [gameField]);

  const onPreviousLevel = () => {
    if (!currentLevel) return;
    setCurrentLevel(currentLevel - 1);
  };

  const onNextLevel = () => {
    if (currentLevel === levels.length - 1) return;
    setCurrentLevel(currentLevel + 1);
  };

  return (
    <div className="App">
      <select
        value={currentLevel}
        onChange={(e) => setCurrentLevel(Number(e.target.value))}
      >
        {levels.map((_, i) => (
          <option key={i} value={i}>
            {beatenLevels[i] ? "✅ " : ""}Level {i + 1}
          </option>
        ))}
      </select>

      <div className="buttons">
        <button disabled={!currentLevel} onClick={onPreviousLevel}>
          Previous (P)
        </button>
        <button onClick={() => loadLevel(currentLevel)}>Restart (R)</button>
        <button
          disabled={currentLevel === levels.length - 1}
          onClick={onNextLevel}
        >
          Next (N)
        </button>
      </div>
      <div ref={gameFieldWrapperRef} className="gameFieldWrapper">
        <div className={`gameField ${isWon ? "won" : ""}`}>
          {gameField.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, cellIndex) => (
                <div key={cellIndex} className={`cell cell_${cell}`} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="joystick">
        <div
          className="joystickButton"
          onClick={() => handlePlayerInput(directions.up)}
        />
        <div className="joystick_middle_row">
          <div
            className="joystickButton"
            onClick={() => handlePlayerInput(directions.left)}
          />
          <div
            className="joystickButton"
            onClick={() => handlePlayerInput(directions.right)}
          />
        </div>
        <div
          className="joystickButton"
          onClick={() => handlePlayerInput(directions.down)}
        />
      </div>
    </div>
  );
};

export default App;
