import { useState, useEffect, useRef } from "react";

import "./SnakeGame.css";

import {
  GRID_SIZE,
  CELL_SIZE,
  INITIAL_SNAKE,
  INITIAL_DIRECTION,
  SPEED,
  COLORS,
} from "./constants";

import { moveSnake, createFood } from "./GameEngine";

import { setupKeyboard } from "./Controls";

export default function SnakeGame() {
  const canvasRef = useRef(null);

  const directionRef = useRef(INITIAL_DIRECTION);

  const [snake, setSnake] = useState(INITIAL_SNAKE);

  const [food, setFood] = useState(createFood(INITIAL_SNAKE));

  const [direction, setDirection] = useState(INITIAL_DIRECTION);

  const [difficulty, setDifficulty] = useState("medium");

  const [score, setScore] = useState(0);

  const [highScore, setHighScore] = useState(
    () => Number(localStorage.getItem("snakeHighScore")) || 0,
  );

  const [gameStarted, setGameStarted] = useState(false);

  const [paused, setPaused] = useState(false);

  const [gameOver, setGameOver] = useState(false);

  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    const cleanup = setupKeyboard({
      directionRef,

      setDirection,

      gameStarted,

      gameOver,

      paused,

      setPaused,

      startGame,
    });

    return cleanup;
  }, [gameStarted, paused, gameOver]);

  function startGame() {
    restart();

    let value = 3;

    setCountdown(3);

    const timer = setInterval(() => {
      value--;

      setCountdown(value);

      if (value === 0) {
        clearInterval(timer);

        setGameStarted(true);
      }
    }, 1000);
  }

  function restart() {
    setSnake(INITIAL_SNAKE);

    setDirection(INITIAL_DIRECTION);

    directionRef.current = INITIAL_DIRECTION;

    setFood(createFood(INITIAL_SNAKE));

    setScore(0);

    setPaused(false);

    setGameOver(false);

    setGameStarted(false);
  }

  useEffect(() => {
    if (!gameStarted) return;

    if (paused) return;

    if (gameOver) return;

    const interval = setInterval(() => {
      const result = moveSnake(
        snake,

        directionRef.current,

        food,
      );

      if (result.gameOver) {
        setGameOver(true);

        return;
      }

      setSnake(result.snake);

      if (result.ateFood) {
        const newScore = score + 10;

        setScore(newScore);

        if (newScore > highScore) {
          setHighScore(newScore);

          localStorage.setItem("snakeHighScore", newScore);
        }

        setFood(createFood(result.snake));
      }
    }, SPEED[difficulty]);

    return () => clearInterval(interval);
  }, [
    snake,
    food,
    score,
    difficulty,
    gameStarted,
    paused,
    gameOver,
    highScore,
  ]);
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = GRID_SIZE * CELL_SIZE;

    canvas.height = GRID_SIZE * CELL_SIZE;

    function draw() {
      // Background
      ctx.fillStyle = COLORS.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = COLORS.grid;

      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();

        ctx.moveTo(i * CELL_SIZE, 0);

        ctx.lineTo(i * CELL_SIZE, canvas.height);

        ctx.stroke();

        ctx.beginPath();

        ctx.moveTo(0, i * CELL_SIZE);

        ctx.lineTo(canvas.width, i * CELL_SIZE);

        ctx.stroke();
      }

      // Food
      ctx.beginPath();

      ctx.fillStyle = COLORS.food;

      ctx.shadowBlur = 18;

      ctx.shadowColor = COLORS.food;

      ctx.arc(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 3,
        0,
        Math.PI * 2,
      );

      ctx.fill();

      ctx.shadowBlur = 0;

      // Snake

      snake.forEach((cell, index) => {
        ctx.fillStyle = index === 0 ? COLORS.snakeHead : COLORS.snakeBody;

        ctx.beginPath();

        ctx.roundRect(
          cell.x * CELL_SIZE + 2,
          cell.y * CELL_SIZE + 2,
          CELL_SIZE - 4,
          CELL_SIZE - 4,
          8,
        );

        ctx.fill();

        // Snake Head Eyes

        if (index === 0) {
          ctx.fillStyle = "white";

          const centerX = cell.x * CELL_SIZE + CELL_SIZE / 2;

          const centerY = cell.y * CELL_SIZE + CELL_SIZE / 2;

          let eye1 = {
            x: -6,
            y: -6,
          };

          let eye2 = {
            x: 6,
            y: -6,
          };

          if (direction.x === -1) {
            eye1 = {
              x: -6,
              y: -6,
            };

            eye2 = {
              x: -6,
              y: 6,
            };
          }

          if (direction.x === 1) {
            eye1 = {
              x: 6,
              y: -6,
            };

            eye2 = {
              x: 6,
              y: 6,
            };
          }

          if (direction.y === -1) {
            eye1 = {
              x: -6,
              y: -6,
            };

            eye2 = {
              x: 6,
              y: -6,
            };
          }

          if (direction.y === 1) {
            eye1 = {
              x: -6,
              y: 6,
            };

            eye2 = {
              x: 6,
              y: 6,
            };
          }

          ctx.beginPath();

          ctx.arc(centerX + eye1.x, centerY + eye1.y, 3, 0, Math.PI * 2);

          ctx.fill();

          ctx.beginPath();

          ctx.arc(centerX + eye2.x, centerY + eye2.y, 3, 0, Math.PI * 2);

          ctx.fill();
        }
      });
    }

    draw();
  }, [snake, food, direction]);
  return (
    <div className="snake-wrapper">
      <h1>🐍 Snake Game</h1>

      <div className="score-board">
        <span>Score: {score}</span>
        <span>🏆 High Score: {highScore}</span>
      </div>

      {!gameStarted && !gameOver && countdown === 3 && (
        <div className="menu">
          <h2>Select Difficulty</h2>

          <div className="difficulty-buttons">
            <button
              className={difficulty === "easy" ? "active" : ""}
              onClick={() => setDifficulty("easy")}
            >
              Easy
            </button>

            <button
              className={difficulty === "medium" ? "active" : ""}
              onClick={() => setDifficulty("medium")}
            >
              Medium
            </button>

            <button
              className={difficulty === "hard" ? "active" : ""}
              onClick={() => setDifficulty("hard")}
            >
              Hard
            </button>
          </div>

          <button className="start-btn" onClick={startGame}>
            ▶ Start Game
          </button>

          <p className="instruction">⌨ Arrow Keys / WASD</p>

          <p className="instruction">Press P to Pause</p>
        </div>
      )}

      {!gameStarted && countdown < 3 && countdown > 0 && (
        <div className="countdown">{countdown}</div>
      )}

      {gameStarted && (
        <div className="canvas-container">
          <canvas ref={canvasRef} className="game-canvas" />
        </div>
      )}

      {paused && (
        <div className="overlay">
          <h2>⏸ Paused</h2>

          <p>Press P to Continue</p>
        </div>
      )}

      {gameOver && (
        <div className="overlay">
          <h2>💀 Game Over</h2>

          <h3>Your Score : {score}</h3>

          <button className="start-btn" onClick={startGame}>
            🔄 Play Again
          </button>
        </div>
      )}

      {/* Mobile Controls */}

      {gameStarted && (
        <div className="mobile-controls">
          <button onClick={() => setDirection({ x: 0, y: -1 })}>▲</button>

          <div>
            <button onClick={() => setDirection({ x: -1, y: 0 })}>◀</button>

            <button onClick={() => setDirection({ x: 1, y: 0 })}>▶</button>
          </div>

          <button onClick={() => setDirection({ x: 0, y: 1 })}>▼</button>
        </div>
      )}
    </div>
  );
}
