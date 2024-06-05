const gameboard = (()=>{
    const gameboard = ["","","","","","","","",""];

    const render = () => {
        game.displayCurrentMove();
        // Displays the gameboard
        for(i=0;i<gameboard.length;i++) {
            const gameCell = document.createElement("div");
            gameCell.classList.add("gamecells");
            const gameboardContainer = document.querySelector("#gameboard");
            gameboardContainer.appendChild(gameCell);
        }

        //Adds event listeners to cells
        const gamecells = document.querySelectorAll(".gamecells");
        gamecells.forEach((gamecell)=>{
            gamecell.addEventListener('click', handleClick);
        })

    }

    const handleClick = () => {
        alert("fuck yeah");
        // Functionality to update the array field as well as update board here 
        // Also switch user turns
        // Maybe game should handle it 
    }

    const resetGame = () => {
        const gameboardContainer = document.querySelector("#gameboard");
        gameboardContainer.innerHTML = "";
        const gameboard = ["","","","","","","","",""];
        game.startGame();
    }

    return {
        render,
        handleClick,
        resetGame,
    }

})();

const displayControls = (()=>{

    const startButton = document.querySelector("#start");
    const resetButton = document.querySelector("#reset");
    const player1field = document.querySelector("#player1");
    const player2field = document.querySelector("#player2");

    const render = () => {
        startButton.addEventListener('click', () => {
            const player1 = document.querySelector("#player1").value;
            const player2 = document.querySelector("#player2").value;
            game.startGame();
        })
        resetButton.addEventListener('click', gameboard.resetGame)
        
    }

    const hideControls = () => {
        startButton.classList.add('hideThis');
        player1field.classList.add('hideThis');
        player2field.classList.add('hideThis');

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
    const currentMove = true;
    

    const startGame = () => {
        gameboard.render();
        displayControls.hideControls();

    }

    const displayCurrentMove = () => {
        const currentMoveDisplay = document.createElement("h3");
        if(currentMove==true) {
            currentMoveDisplay.innerHTML = "Player 1's Move!"
        } else {
            currentMoveDisplay.innerHTML = "Player 2's Move!"
        }
        currentMoveField.appendChild(currentMoveDisplay);
    }

    return {
        startGame,
        currentMove,
        displayCurrentMove,
    }

})();




function createPlayer(name) {
    const player = {};
    player.name = name;
    return player;
}






displayControls.render();
