const colors = [
    "red", "blue", "green", "yellow",
    "purple", "orange", "pink", "brown",
    "cyan", "magenta", "lime", "indigo",
    "violet", "coral", "teal", "gold"
];

const start16 = document.getElementById("start-game-16");
const start32 = document.getElementById("start-game-32");
const gameContainer = document.getElementById("game-container");
let openBlocks = [];
let blockClicksDisabled = false;

start16.addEventListener("click", () => {
    startGame(16);
});

start32.addEventListener("click", () => {
    startGame(32);
});

function startGame(blockCount) {
    gameContainer.innerHTML = '';
    const gridClass = blockCount === 16 ? 'grid-container' : 'grid-container-32';
    gameContainer.className = gridClass;
    createBlocks(blockCount);
    generateRandomArray(blockCount / 2);
    openBlocks = [];
    blockClicksDisabled = false;
}

function createBlocks(amountOfBlocks) {
    for (let i = 0; i < amountOfBlocks; i++) {
        const createBlock = document.createElement("div");
        createBlock.classList.add("grid-item");
        createBlock.style.backgroundColor = "grey";
        gameContainer.appendChild(createBlock);
    }
}

function data(amountOfColors) {
    const randomNumbers = [];
    while (randomNumbers.length < amountOfColors) {
        const randomNumber = Math.floor(Math.random() * amountOfColors);
        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
        }
    }
    return randomNumbers;
}

function generateRandomArray(amountOfUniqueColors) {
    const randomArray = data(amountOfUniqueColors).concat(data(amountOfUniqueColors));
    randomArray.sort(() => Math.random() - 0.5);
    console.log(randomArray);

    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach((element, index) => {
        const originalColor = colors[randomArray[index]];
        element.addEventListener("click", () => {
            if (blockClicksDisabled || openBlocks.includes(element)) {
                return;
            }

            element.style.backgroundColor = originalColor;
            openBlocks.push(element);

            if (openBlocks.length === 2) {
                blockClicksDisabled = true;
                const [firstBlock, secondBlock] = openBlocks;
                if (firstBlock.style.backgroundColor === secondBlock.style.backgroundColor) {
                    openBlocks = [];
                    blockClicksDisabled = false;
                } else {
                    setTimeout(() => {
                        firstBlock.style.backgroundColor = "grey";
                        secondBlock.style.backgroundColor = "grey";
                        openBlocks = [];
                        blockClicksDisabled = false;
                    }, 400);
                }
            }
        });
    });
}