const gameBoard = (() =>{
    const board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];
    const isValidMove = (x,y) => board[x][y] === ''; 
    
    return {board, isValidMove}
})();