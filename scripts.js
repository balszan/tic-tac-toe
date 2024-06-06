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
            gameboard.updateGameboard("X",cellIndex);

        } else {
            clickValue.classList.add("o");
            gameboard.updateGameboard("O",cellIndex);
        }
       
        console.log(gameboard.getGameboard());

        if(checkWin()) {
            alert("Winner!")
            // tutaj jeszcze zresetuj gre albo wqyswietl screen
        }
        
        if(checkDraw()) {
            alert("Draw!")
             // tutaj jeszcze zresetuj gre albo wqyswietl screen
        }

         // Updates current move 
         currentMove=!currentMove;
         currentMoveField.innerHTML="";
         displayCurrentMove();



    }


     const checkWin = () => {
//add logic 
// return true if win
     }

     const checkDraw = () => {
//add logic 
// return true if draw
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
