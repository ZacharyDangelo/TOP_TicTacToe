

const gameBoard = (() =>{
    const board = document.querySelectorAll(".space");
    const boardArr = [
        ['','',''],
        ['','',''],
        ['','','']
    ]
    function checkForWin(symbol){
        if(checkHorizontalWin(symbol)) return true;
        if(checkVerticalWin(symbol)) return true;
        if(checkDiagonolWin(symbol)) return true;
    }

    function checkTie(){
        let counter =0;
        for(let x =0;x<3;x++){
            for(let y=0;y<3;y++){
                if(boardArr[x][y]) counter++;
            }
        }
        if(counter == 9) return true;
        else return false;
    }

    function checkHorizontalWin(symbol){
        let xCounter =0;
        for(let y =0; y<3;y++){
            for(let x =0; x<3;x++){
                if(boardArr[x][y] == symbol)
                xCounter++;
            }
            if(xCounter == 3) return true;
            else xCounter = 0;
        }

    }
    function checkVerticalWin(symbol){
        let yCounter =0;
        for(let x=0; x<3;x++){
            for(let y=0; y<3;y++){
                if(boardArr[x][y] == symbol)
                yCounter++;
            }
            if(yCounter == 3) return true;
            else yCounter = 0;
        }
    }

    function checkDiagonolWin(symbol){
        if(boardArr[1][1] != symbol) return false;
        if(boardArr[0][0] == symbol && boardArr[2][2] == symbol) return true;
        if(boardArr[0][2] == symbol && boardArr[2][0] == symbol) return true;
        return false;
    }


    function placeSymbol(symbol,x,y){
        boardArr[x][y] = symbol;
    }

    function resetBoard(){
        let counter =0;
        for(let x =0;x<3;x++){
            for(let y=0;y<3;y++){
                boardArr[x][y] = '';
            }
        }
    }

    return {board, checkForWin, checkTie, placeSymbol, resetBoard};
})();


const Player = (playerSymbol, playerName) =>{
    const symbol = playerSymbol;
    var name = playerName
    return {symbol, name};
};

const displayController = ((document) =>{
    const boardSpaces = document.querySelectorAll(".space");

    function registerClickEvents(){
        gameBoard.board.forEach((elem) =>{
            elem.addEventListener("click", () =>{
                gameState.playerMove(elem, elem.dataset.x,elem.dataset.y);
            })
        });

        const resetButton = document.querySelector("#reset-button");
        resetButton.addEventListener("click", () =>{
            gameState.resetGame();
            const gameOverContainer = document.querySelector(".sidebar-game-over").classList.add("invisible");
        });

        const gameOverButton = document.querySelector("#reset-button-gameover");
        gameOverButton.addEventListener("click", () =>{
            gameState.resetGame();
            const gameOverContainer = document.querySelector(".sidebar-game-over").classList.add("invisible");
        });
    }

    function registerInputEvents(playerOne, playerTwo){
        const playerOneInput = document.querySelector("#player-one-input");
        const playerTwoInput = document.querySelector("#player-two-input");

        playerOneInput.addEventListener("input", () =>{
            if(playerOneInput.value) playerOne.name = playerOneInput.value;
            else playerOne.name = "Player One";
        });
        playerTwoInput.addEventListener("input", () =>{
            if(playerTwoInput.value) playerTwo.name = playerTwoInput.value;
            else playerTwo.name = "Player Two";
            
        });
    }

    const updateDisplay = () => {
        let x = 0;
        let y = 0;
        gameBoard.board.forEach((elem)=>{
           elem.textContent = gameBoard.board[y][x];
           x++;
           if(x >= 3){
               x = 0;
               y++;
           }
        });
    }

    function displayWinner(player){
        const gameOverContainer = document.querySelector(".sidebar-game-over").classList.remove("invisible");
        const winnerHeader = document.querySelector("#winner-header");
        winnerHeader.textContent = `${player.name} wins!`;
    }

    return {updateDisplay, registerClickEvents, displayWinner, registerInputEvents};
})(document);

const gameState = (() =>{
    const playerOne = Player('X', 'PlayerOne');
    const playerTwo = Player('O', 'PlayerTwo');
    var gameOver = false;
    var currentPlayer = "";
    (function startGame(){
        displayController.updateDisplay();
        currentPlayer = playerOne;
    })();

    function playerMove(spaceElem,x,y){
        if(spaceElem.textContent || gameOver) return;
        else{
            spaceElem.textContent = currentPlayer.symbol;
            gameBoard.placeSymbol(currentPlayer.symbol,x,y)
            if(gameBoard.checkForWin(currentPlayer.symbol)){
                displayController.displayWinner(currentPlayer);
                gameOver=true;
            }
            else if(gameBoard.checkTie()){
                displayController.displayWinner({name: "No one"});
            }
            else{
                currentPlayer = (currentPlayer == playerOne) ? playerTwo : playerOne;
            }
        }

    }

    function computerMove(){

    }

    function resetGame(){
        gameOver = false;
        gameBoard.resetBoard();
        currentPlayer = playerOne;
        displayController.updateDisplay();
    }

    return{playerMove, resetGame, playerOne, playerTwo}
})();

displayController.registerClickEvents();
displayController.registerInputEvents(gameState.playerOne, gameState.playerTwo);