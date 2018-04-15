//  app javascript

let origBoard;
const human = 'O'
const computer = 'X'
const winCombinations = [
  [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
]
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('#message')

startGame();

function startGame(){
  document.querySelector('#endgame').style.display = 'none';
  origBoard = Array.from(Array(9).keys());
  for(let i = 0; i < cells.length; i++){
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
}

// human move
function turnClick(e){
  turn(e.target.id, human)
}

// update the boards state and display the move
function turn(squareId, player){
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(origBoard, player);
  if (gameWon) gameOver(gameWon)
}

function checkWin(board, player){
  // iterate through the board array to see if the player has a winning combination
  let plays = board.reduce(function(combo, elm, index){
    return (elm === player)? combo.concat(index) : combo;
  }, [])

  let gameWon = null;
  for(let[index, win] of winCombinations.entries()){
    if (win.every(elem => plays.indexOf(elem) > -1)){
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;
}


function gameOver(gameWon){
  for(let index of winCombinations[gameWon.index]){
    document.getElementById(index).style.backgroundColor = 
      (gameWon.player == human)? 'blue' : 'red';
  }
  for(let i = 0; i < cells.length; i++){
    // remove the event listener so no more cells can be clicked
    cells[i].removeEventListener('click', turnClick, false);
  }
}
