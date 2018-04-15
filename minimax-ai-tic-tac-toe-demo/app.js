//  app javascript

let board;
const player = 'O'
const computer = 'X'
const winCombinations = [
  [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
]
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('#message')

startGame();

function startGame(){
  document.querySelector('#endgame').style.display = 'none';
  board = Array.from(Array(9).keys());
  for(let i = 0; i < cells.length; i++){
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
}

// human move
function turnClick(e){
  turn(e.target.id, player)
}

// update the boards state and display the move
function turn(squareId, player){
  board[squareId] = player;
  document.getElementById(squareId).innerText = player;
}
