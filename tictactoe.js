

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

    return {board, checkForWin, checkTie, placeSymbol};
})();


const Player = (playerSymbol, playerName) =>{
    const symbol = playerSymbol;
    const name = playerName
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
    const playerOne = Player('X', 'PlayerOne');
    const playerTwo = Player('O', 'PlayerTwo');
    var currentPlayer = "";
    (function startGame(){
        displayController.updateDisplay();
        currentPlayer = playerOne;
    })();

    function playerMove(spaceElem,x,y){
        if(spaceElem.textContent) return;
        else{
            spaceElem.textContent = currentPlayer.symbol;
            gameBoard.placeSymbol(currentPlayer.symbol,x,y)
            if(gameBoard.checkForWin(currentPlayer.symbol)){
                console.log(`${currentPlayer.name} wins!`);
            }
            else if(gameBoard.checkTie()){
                console.log("It's a tie!");
            }
            else{
                currentPlayer = (currentPlayer == playerOne) ? playerTwo : playerOne;

            }
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