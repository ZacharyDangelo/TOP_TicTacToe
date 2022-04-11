const gameBoard = (() =>{
    const board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];
    const isValidMove = (x,y) => board[x][y] === ''; 
    
    return {board, isValidMove};
})();


const Player = (playerSymbol) =>{
    const symbol = playerSymbol;
    return {symbol};
};

const displayController = ((document) =>{
    const updateDisplay = () => {
        console.log(gameBoard.board);

    }

    return {updateDisplay};
})(document);


const playerOne = Player('X');
const playerTwo = Player('O');
displayController.updateDisplay();