import { GRID_SIZE, INITIAL_SNAKE, INITIAL_DIRECTION } from "./constants";

export function createFood(snake) {
  while (true) {
    const food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    const exists = snake.some((cell) => cell.x === food.x && cell.y === food.y);

    if (!exists) return food;
  }
}

export function moveSnake(snake, direction, food) {
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  if (isCollision(head, snake))
    return {
      gameOver: true,
      snake,
      ateFood: false,
    };

  const newSnake = [head, ...snake];

  let ateFood = false;

  if (head.x === food.x && head.y === food.y) {
    ateFood = true;
  } else {
    newSnake.pop();
  }

  return {
    snake: newSnake,
    ateFood,
    gameOver: false,
  };
}

export function isCollision(head, snake) {
  if (head.x < 0 || head.y < 0 || head.x >= GRID_SIZE || head.y >= GRID_SIZE)
    return true;

  return snake.some((cell) => cell.x === head.x && cell.y === head.y);
}

export function resetGame() {
  return {
    snake: INITIAL_SNAKE,
    direction: INITIAL_DIRECTION,
    score: 0,
    gameOver: false,
  };
}
