const tileContainer = document.querySelector(".tiles");
const colors = [
  "aqua",
  "aquamarine",
  "crimson",
  "blue",
  "dodgerblue",
  "gold",
  "greenyellow",
  "teal",
];

const colorPickList = [...colors, ...colors];
const tileCount = colorPickList.length;
const restartBtn = document.querySelector(".restart");

restartBtn.addEventListener("click", function () {
  window.location.reload();
});

function buildTile(color) {
  const element = document.createElement("div");

  element.classList.add("tile");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", () => {
    const isRevealed = element.getAttribute("data-revealed");

    if (awaitingEndOfMove || isRevealed === "true" || element === activeTile) {
      return;
    }

    element.style.backgroundColor = color;

    if (!activeTile) {
      activeTile = element;
      return;
    }

    const colorToMatch = activeTile.getAttribute("data-color");

    if (colorToMatch === color) {
      activeTile.setAttribute("data-revealed", "true");
      element.setAttribute("data-revealed", "true");

      awaitingEndOfMove = false;
      activeTile = null;
      revealedCount += 2;

      if (revealedCount === tileCount) {
        alert("You Won");
      }
      return;
    }

    awaitingEndOfMove = true;

    setTimeout(() => {
      element.style.backgroundColor = null;
      activeTile.style.backgroundColor = null;

      awaitingEndOfMove = false;
      activeTile = null;
    }, 1000);
  });

  return element;
}

//Game state

let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

//Build up tiles

for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * colorPickList.length);
  const color = colorPickList[randomIndex];
  const tile = buildTile(color);

  colorPickList.splice(randomIndex, 1);
  tileContainer.appendChild(tile);
}
