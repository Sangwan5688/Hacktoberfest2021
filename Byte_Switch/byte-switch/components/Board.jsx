import "./board-style.css";

// Board component
function Board({ boardSize }) {
  return (
    <div className="board-container">
      {boardSize.map((row, rowIndex) => (
        <Row key={rowIndex} row={row} />
      ))}
    </div>
  );
}

// Row component
function Row({ row }) {
  return (
    <div className="board-row">
      {row.map((cell, cellIndex) => (
        <Cell key={cellIndex} cell={cell} />
      ))}
    </div>
  );
}

// Cell Component
function Cell({ cell }) {
  if (cell === 0) {
    return <div className="board-cell zero"></div>;
  } else if (cell === 1) {
    return <div className="board-cell one"></div>;
  } else if (cell === 9) {
    return <div className="board-cell nine"></div>;
  }
}

export default Board;
