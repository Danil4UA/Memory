const start = document.getElementById("start-game");
const createContainer = document.createElement("div");
createContainer.classList.add("grid-container");
document.body.appendChild(createContainer);

const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown"];

start.addEventListener("click", () => {
    createContainer.innerHTML = '';
    createBlocks();
    generateRandomArray();
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
            element.style.backgroundColor = originalColor; 
        });
    });
}