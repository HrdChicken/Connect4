//Constants

const colorChange = {
    '1': 'red',
    '-1': 'yellow',
    null: 'black',
  }
  
  const winCombos= [
    [0,1,2,3], [6,7,8,9], [12,13,14,15], [18,19,20,21], [24,25,26,27], [30,31,32,33], [36,37,38,39], [2,3,4,5], [8,9,10,11], [14,15,16,17], [20,21,22,23], [26,27,28,29], [32,33,34,35], [38,39,40,41], [1,2,3,4], [7,8,9,10], [13,14,15,16,], [19,20,21,22], [25,26,27,28], [31,32,33,34], [37,38,39,40], [0,6,12,18], [1,7,13,19], [2,8,14,20], [3,9,15,21], [4,10,16,22], [5,11,17,23], [18,24,30,36], [19,25,31,37], [20,26,32,38], [21,27,33,39], [22,28,34,40], [23,29,35,41], [7,13,19,25], [8,14,20,26], [9,15,21,27], [10,16,22,28], [11,17,23,29], [13,19,25,31], [14,20,26,32], [15,21,27,33], [16,22,28,34], [17,23,29,35], [3,8,13,18], [4,9,14,19], [5,10,15,20], [0,7,14,21], [1,8,15,22], [2,9,16,23], [6,13,20,27], [7,14,21,28], [8,15,22,29], [11,16,21,26], [10,15,20,25], [9,14,19,24], [12,19,26,33], [13,20,27,34], [14,21,28,35], [17,22,27,32], [16,21,26,31], [15,20,25,30], [36,31,26,21], [37,32,27,22], [38,33,28,23], [41,34,27,20], [40,33,26,19], [39,32,25,18], [12,18,24,30], [6,12,18,24]
  ]
  
//State Variables
  
  let frame; 
  let playerTurn;
  let theWinner;
  
//Cached Elements
  
  const messageEl = document.querySelector('.message');
  const circlesEl = document.querySelectorAll('td');
  
//Event Listeners
  
  document.querySelector('.frame').addEventListener('click', move);
  document.querySelector('.resetBtn').addEventListener('click', init);
  
//Functions
  
  init();
  
  function init() {
    frame = new Array(42).fill(null);
    playerTurn = 1;
    theWinner = null;
    document.querySelector('.frame').addEventListener('click', move);
    render();
  };
  
  function render(){
      circlesEl.forEach(function(cir) {
      let cellIdx = cir.id.replace("c", "");
      cir.style.backgroundColor = colorChange[frame[cellIdx]];
    });
    if (theWinner === "Draw") {
      messageEl.textContent = "It's a draw! No one wins!";
    } else if (theWinner) {
       messageEl.textContent = `YO ${colorChange[theWinner]}! You win!`
       document.querySelector('.frame').removeEventListener('click', move); // has to get removed or else the clicks wont stop after a winner
    } else{
      messageEl.textContent = `It's player ${colorChange[playerTurn]}'s turn!`;
    }
    
    }
  
  function move(e){
    let colIdx = parseInt(e.target.id.replace("c", ""));

    colIdx = Math.floor(colIdx / 6); // 6 cell collums

    if ( isNaN(colIdx) ) return;

    let bottomColIdx = colIdx * 6;

    let set;

    for (set = 0; set < 6 ; set++ )  {
      if ( frame[bottomColIdx + set] === null) break;
    }
    if ( set === 6 ) return;
    frame[bottomColIdx + set] = playerTurn;
    playerTurn *= -1;
    theWinner = checkWinner();
    render();
   };
  
   function checkWinner(){
     for(let i= 0; i < winCombos.length; i++) {
       if (
         Math.abs(
            frame[winCombos[i][0]] + frame[winCombos[i][1]] + frame[winCombos[i][2]] + frame[winCombos[i][3]]
         ) === 4
       )
       return frame[winCombos[i][0]];
     }
     if (frame.includes(null)) return null;
     return "Draw";
   }