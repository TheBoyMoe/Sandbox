// app javascript

let origBoard;
const human = 'O'
const computer = 'X'
const winCombinations = [
  [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
]
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const endGame = document.getElementById('endgame');

startGame();

function startGame(){
  endGame.style.display = 'none';
  origBoard = Array.from(Array(9).keys());
  for(let i = 0; i < cells.length; i++){
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
}

// human move
function turnClick(element){
  let squareId = element.target.id;
  // check if that square has been clicked in, does that array position contain a number
  if(typeof origBoard[squareId] == 'number'){
    let result = turn(squareId, human);
    if (!result && !checkTie()) turn(bestSpot(), computer);
  }
}

// update the boards state and display the move
function turn(squareId, player){
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(origBoard, player);
  if (gameWon){
    gameOver(gameWon);
    return true;
  }
  else {
    return false;
  }
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
  declareWinner(gameWon.player == human? 'You win!' : 'You lose.');
}

function bestSpot(){
  // basic ai, return the first empty square found
  return emptySquares()[0];

  // return the spot the computer should play next using minmax algorithm
  // return minimax(origBoard, computer).index;
}

function emptySquares(){
  // return an array of squares still containing numbers
  return origBoard.filter(function(square){
    return typeof square == 'number'
  })
}

function checkTie(){
  if (emptySquares().length == 0) {
    for(let i = 0; i < cells.length; i++){
      cells[i].style.backgroundColor = 'green';
      cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner('Tie Game!');
    return true;
  }
  return false;
}

function declareWinner(str){
  endGame.style.display = 'block';
  message.textContent = str;
}


/////////////////////////////////////////////////////////////////////////////
// Minimax algorithm function																							 //
/////////////////////////////////////////////////////////////////////////////

function minimax(newBoard, player) {
	// return available spots
	var availSpots = emptySquares();

	// check for terminal states, someone winning
	if (checkWin(newBoard, human)) {
		return {score: -10}; // player won
	} else if (checkWin(newBoard, computer)) {
		return {score: 10}; // computer won
	} else if (availSpots.length === 0) {
		return {score: 0}; // otherwise a tie
	}

	// collect the empty board positions
	// and collect each spots index and score and save in 'move'
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == computer) {
			var result = minimax(newBoard, human);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, computer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;
		moves.push(move);
	}

	// algorithm eveluates the best move
	// choose the highest score when the computer is playing
	// and lowest score when the human is playing
	var bestMove;
	if(player === computer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}

