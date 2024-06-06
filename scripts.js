const gameboard = (()=>{
    let gameboard = ["","","","","","","","",""];

    const updateGameboard = (value,index) => {
        gameboard[index] = value;
    }

    const getGameboard = () => {
        return gameboard;
    }

    const render = () => {
        game.displayCurrentMove();
        // Displays the gameboard
        for(i=0;i<gameboard.length;i++) {
            const gameCell = document.createElement("div");
            gameCell.id = i; 
            gameCell.classList.add("gamecells");
            const gameboardContainer = document.querySelector("#gameboard");
            gameboardContainer.appendChild(gameCell);
        }

        //Adds event listeners to cells
        const gamecells = document.querySelectorAll(".gamecells");
        gamecells.forEach((gamecell)=>{
            gamecell.addEventListener('click', game.handleClick, {once: true});
        })
    }

    const resetGame = () => {
        const gameboardContainer = document.querySelector("#gameboard");
        gameboardContainer.innerHTML = "";
        
        const currentMoveContainer = document.querySelector("#currentMove");
        currentMoveContainer.innerHTML = "";

        const winnerField = document.querySelector(".winner"); 
        winnerField.innerHTML="";

        // Clears gameboard
        for(i=0;i<9;i++) {
            updateGameboard("",i)
        }

        game.startGame();
    }

    return {
        render,
        resetGame,
        updateGameboard,
        getGameboard,
    }

})();

const displayControls = (()=>{

    const startButton = document.querySelector("#start");
    const resetButton = document.querySelector("#reset");
    const player1field = document.querySelector("#player1");
    const player2field = document.querySelector("#player2");
    const player1label = document.querySelector("#player1label");
    const player2label = document.querySelector("#player2label");

    const render = () => {
        startButton.addEventListener('click', () => {
            const player1 = document.querySelector("#player1").value;
            const player2 = document.querySelector("#player2").value;
            game.startGame();
        })

        resetButton.addEventListener('click', gameboard.resetGame);

    }

    const hideControls = () => {
        startButton.classList.add('hideThis');
        player1field.classList.add('hideThis');
        player2field.classList.add('hideThis');
        player1label.classList.add('hideThis');
        player2label.classList.add('hideThis');
    }

    return {
        render,
        hideControls,
        player1,
        player2,
    }

})();

const game = (()=>{

    const player1 = createPlayer(displayControls.player1);
    const player2 = createPlayer(displayControls.player2);


    const currentMoveField = document.querySelector('#currentMove');

    // True if player1 turn, false if player2
    let currentMove = true;
    
    const startGame = () => {
        gameboard.render();
        displayControls.hideControls();
    }

    const displayCurrentMove = () => {
        const currentMoveDisplay = document.createElement("h3");
        if(currentMove==true) {
            currentMoveDisplay.innerHTML = player1.name.value + "'s Move!"
        } else {
            currentMoveDisplay.innerHTML = player2.name.value + "'s Move!"
        }
        currentMoveField.appendChild(currentMoveDisplay);
    }

    const handleClick = (e) => {

        const clickValue = e.target;
        const cellIndex = parseInt(clickValue.id);

        if(currentMove) {
            clickValue.classList.add("x");
            gameboard.updateGameboard("x",cellIndex);

        } else {
            clickValue.classList.add("o");
            gameboard.updateGameboard("o",cellIndex);
        }
       
        
        if(checkWin(gameboard.getGameboard())=="x") {
            announceWinner(player1.name.value);
        } else if (checkWin(gameboard.getGameboard())=="o") {
            announceWinner(player2.name.value);
        } else if (checkWin(gameboard.getGameboard())=="d") {
            announceWinner("nobody");
        } else {
            // Updates current move 
            currentMove=!currentMove;
            currentMoveField.innerHTML="";
            displayCurrentMove();
        } 
    }

    const announceWinner = (winner) => {
        const gameboardContainer = document.querySelector("#gameboard");
        const gameStatus = document.querySelector("#gameStatus");
        currentMoveField.innerHTML = "";
        const winnerField = document.createElement("div");

        if(winner=="nobody") {
            winnerField.innerHTML = "That's a draw! Play again?";
        } else {
            winnerField.innerHTML = "The winner is " + winner + "!";
        }

        winnerField.classList.add("winner");
        gameStatus.appendChild(winnerField);

        // Disable gameboard
        const gamecells = document.querySelectorAll(".gamecells");
        gamecells.forEach((gamecell)=>{
            gamecell.removeEventListener('click', game.handleClick, {once: true});
        })
    }


     const checkWin = (gameboard) => {

        if(gameboard[0]=="x"&&gameboard[1]=="x"&&gameboard[2]=="x" ||
        gameboard[3]=="x"&&gameboard[4]=="x"&&gameboard[5]=="x" ||
        gameboard[6]=="x"&&gameboard[7]=="x"&&gameboard[8]=="x" ||
        gameboard[0]=="x"&&gameboard[3]=="x"&&gameboard[6]=="x" ||
        gameboard[1]=="x"&&gameboard[4]=="x"&&gameboard[7]=="x" ||
        gameboard[2]=="x"&&gameboard[5]=="x"&&gameboard[8]=="x" ||
        gameboard[0]=="x"&&gameboard[4]=="x"&&gameboard[8]=="x" ||
        gameboard[2]=="x"&&gameboard[4]=="x"&&gameboard[6]=="x") {
            return "x";
        } else if(gameboard[0]=="o"&&gameboard[1]=="o"&&gameboard[2]=="o" ||
        gameboard[3]=="o"&&gameboard[4]=="o"&&gameboard[5]=="o" ||
        gameboard[6]=="o"&&gameboard[7]=="o"&&gameboard[8]=="o" ||
        gameboard[0]=="o"&&gameboard[3]=="o"&&gameboard[6]=="o" ||
        gameboard[1]=="o"&&gameboard[4]=="o"&&gameboard[7]=="o" ||
        gameboard[2]=="o"&&gameboard[5]=="o"&&gameboard[8]=="o" ||
        gameboard[0]=="o"&&gameboard[4]=="o"&&gameboard[8]=="o" ||
        gameboard[2]=="o"&&gameboard[4]=="o"&&gameboard[6]=="o") {
            return "o";
        } else if(gameboard.every(element => element !== '')) {
            return "d";
        }
     }

    return {
        startGame,
        currentMove,
        displayCurrentMove,
        handleClick,
    }

})();

function createPlayer(name) {
    const player = {};
    player.name = name;
    return player;
}


displayControls.render();
