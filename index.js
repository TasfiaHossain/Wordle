
const dictionary = ['house', 'water', 'earth', 'plane', 'pluto'];

const state = {
    
    secret:dictionary[Math.floor(Math.random() * dictionary.length)],
    
    grid: Array(6)
        .fill()
        .map(() => Array(5).fill('')),

    currentRow:0,
    currentCol:0,
};

function updateGrid(){
    for(let i=0; i<state.grid.length; i++){
        for(let j=0; j<state.grid[i].length; j++){
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}


function drawBox(container, row, col, letter = ''){
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.appendChild(box);
    return box;
}

function drawGrid(container){
    const grid = document.createElement('div');
    grid.className = 'grid';

    for(let i=0; i<6; i++) {
        for(let j=0; j<5; j++) {
            drawBox(grid, i, j);
        }
    }

    container.appendChild(grid);
}

function registerKeyboardEvent(){
    document.body.onkeydown = (e) => {
        const key = e.key;
        if (key === 'Enter'){
            if(state.currentColor === 5){
                const word = getCurrentWord();
                if(isWordValid(word)){
                    revealWord(word);
                    state.currentRow++;
                    state.currentCol = 0;
                }

                else {
                    alert("Invalid Word");
                }
            }
        }
       
        if (key === 'Backspace'){
            removeLetter();
        }

        if(isLetter(key)){
            addLetter(key);
        }

        updateGrid();
    };
}

function getCurrentWord() {
    return state.grid[state.currentRow].reduce((prev,curr) => prev + curr);
}

function isWordValid(word){
    return dictionary.includes(word);
}

function revealWord(guess){
    const row = state.currentRow;

    for(let i = 0; i<5; i++){
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;

        if(letter === state.secret[i]) {
            box.classList.add('CORRECT');
        }

        else if(state.secret.includes(letter)) {
            box.classList.remove('WRONG');
        }

        else {
            box.classList.add('EMPTY');
        }
    }

    const isWinner = state.secret === guess;
    const isGameOver = state.currentRow === 5;

    if(isWinner) {
        alert('Congratulations');
    }

    else if(isGameOver) {
        alert(`Game Over. The correct word is ${state.secret}.`);
    }
}

function isLetter(key){
    return key.length === 1 && key.match(/[a-z]/i);
}

function startup(){

        const game = document.getElementById('game');
        drawGrid(game);

        // state.grid = Array(6)
        //     .fill()
        //     .map(() => Array(5).fill('A'));
        
        // updateGrid();

        registerKeyboardEvent();
}

startup();
