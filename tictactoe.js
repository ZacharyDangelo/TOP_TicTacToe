

const gameBoard = (() =>{
    const board = document.querySelectorAll(".space");
    function checkForWin(){
        if (checkPlayerWin()){
            console.log("winner");
            return true;
        } 
        //if (checkComputerWin()) return;
        //if (checkTie()) return;
    }

    function checkPlayerWin(){
        if(checkHorizontalWin('X')) return true;
        if(checkVerticalWin('Y')) return true;
    }

    function checkHorizontalWin(symbol){
        let x = 0;
        let xCounter = 0;
        board.forEach(elem=>{
            if(elem.textContent == symbol){
                xCounter++;
            }
            x++;
            if(xCounter == 3) return true;
            if(x >= 3){
                x = 0;
                xCounter = 0;
            }
        });
    }
    function checkVerticalWin(symbol){
        let x = 0;
        let y = 0;
    }

    return {board, checkForWin};
})();


const Player = (playerSymbol) =>{
    const symbol = playerSymbol;
    return {symbol};
};

const displayController = ((document) =>{
    const boardSpaces = document.querySelectorAll(".space");

    function registerClickEvents(){
        gameBoard.board.forEach((elem) =>{
            elem.addEventListener("click", () =>{
                console.log(elem.textContent);
                gameState.playerMove(elem)
            })
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

    return {updateDisplay, registerClickEvents};
})(document);

const gameState = (() =>{
    const playerOne = Player('X');
    const playerTwo = Player('O');
    var currentPlayer = "";
    (function startGame(){
        displayController.updateDisplay();
        currentPlayer = playerOne;
    })();

    function playerMove(spaceElem){
        if(spaceElem.textContent) return;
        else{
            spaceElem.textContent = currentPlayer.symbol;
            currentPlayer = (currentPlayer == playerOne) ? playerTwo : playerOne; 
        }
        if(gameBoard.checkForWin()){
            console.log("Winner!");
        }
    }

    function computerMove(){

    }

    return{playerMove}
})();

displayController.registerClickEvents();