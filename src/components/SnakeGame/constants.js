export const GRID_SIZE = 20;

export const CELL_SIZE = 30;

export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

export const INITIAL_DIRECTION = {
  x: 1,
  y: 0,
};

export const SPEED = {
  easy: 160,
  medium: 120,
  hard: 80,
};

export const COLORS = {
  background: "#0f172a",
  snakeHead: "#22c55e",
  snakeBody: "#16a34a",
  food: "#ef4444",
  grid: "#1e293b",
};

export const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
  W: { x: 0, y: -1 },
  S: { x: 0, y: 1 },
  A: { x: -1, y: 0 },
  D: { x: 1, y: 0 },
};
