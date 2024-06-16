const start = document.getElementById("start-game");
const createContainer = document.createElement("div");
createContainer.classList.add("grid-container");
document.body.appendChild(createContainer);

const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown"];

let openBlocks = [];
let blockClicksDisabled = false;

start.addEventListener("click", () => {
    createContainer.innerHTML = '';
    createBlocks();
    generateRandomArray();
    openBlocks = [];
    blockClicksDisabled = false;
});

function createBlocks() {
    for (let i = 0; i < 16; i++) { 
        const createBlock = document.createElement("div");
        createBlock.classList.add("grid-item");
        createBlock.style.backgroundColor = "grey";
        createContainer.appendChild(createBlock);
    }
}

const data = () => {
    const randomNumbers = [];
    while(randomNumbers.length < 8) {
        const randomNumber = Math.floor((Math.random() * 8));
        if(!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
        }
    }
    return randomNumbers;
}

function generateRandomArray() {
    const randomArray = data().concat(data());
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
                    // Если цвета совпадают, оставляем блоки открытыми
                    openBlocks = [];
                    blockClicksDisabled = false;
                } else {
                    // Если цвета не совпадают, закрываем блоки обратно через 1 секунду
                    setTimeout(() => {
                        firstBlock.style.backgroundColor = "grey";
                        secondBlock.style.backgroundColor = "grey";
                        openBlocks = [];
                        blockClicksDisabled = false;
                    }, 200);
                }
            }
        });
    });
}