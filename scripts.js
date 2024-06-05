const gameboard = (()=>{
    const gameboard = ["","","","","","","","",""];


    const render = () => {
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

    return {
        render,
        handleClick,
    }

})();

gameboard.render();