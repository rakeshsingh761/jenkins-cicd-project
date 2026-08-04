import { DIRECTIONS } from "./constants";

export function setupKeyboard({
  directionRef,
  setDirection,
  gameStarted,
  gameOver,
  paused,
  setPaused,
  startGame,
}) {
  function handleKey(e) {
    if (
      [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        " ",
        "p",
        "P",
        "w",
        "a",
        "s",
        "d",
        "W",
        "A",
        "S",
        "D",
      ].includes(e.key)
    ) {
      e.preventDefault();
    }

    // Space starts the game
    if (e.key === " " && !gameStarted && !gameOver) {
      startGame();
      return;
    }

    // Pause / Resume
    if ((e.key === "p" || e.key === "P") && gameStarted && !gameOver) {
      setPaused((prev) => !prev);
      return;
    }

    // Ignore movement if paused
    if (paused) return;

    const next = DIRECTIONS[e.key];
    if (!next) return;

    const current = directionRef.current;

    // Prevent reversing direction
    if (current.x + next.x === 0 && current.y + next.y === 0) {
      return;
    }

    directionRef.current = next;
    setDirection(next);
  }

  window.addEventListener("keydown", handleKey, {
    passive: false,
  });

  return () => window.removeEventListener("keydown", handleKey);
}
