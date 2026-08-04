import { useState } from "react";
import "./TicTacToe.css";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";

    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function restartGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  const isDraw = !winner && board.every((cell) => cell !== null);

  return (
    <div className="game-container">
      <h2>🎮 Tic-Tac-Toe</h2>

      <div className="status">
        {winner
          ? `🏆 Winner: ${winner}`
          : isDraw
            ? "🤝 It's a Draw!"
            : `Turn: ${isXNext ? "X" : "O"}`}
      </div>

      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <button className="restart-btn" onClick={restartGame}>
        🔄 Restart Game
      </button>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}
