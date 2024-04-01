var board = document.getElementsByClassName('board')[0];

var boardx = {};

const imagePath = [
  './images/png/black-queen.png',
  './images/png/black-king.png',
  './images/png/black-rook.png',
  './images/png/black-pawn.png',
  './images/png/black-knight.png',
  './images/png/black-bishop.png',

  './images/png/white-queen.png',
  './images/png/white-king.png',
  './images/png/white-rook.png',
  './images/png/white-pawn.png',
  './images/png/white-knight.png',
  './images/png/white-bishop.png'
];
var Upright = true; 

function createBoard(ss) {
  board.innerHTML = '';
  var start = ss ? 1 : 8;
  var end = ss ? 9 : 0;
  var step = ss ? 1 : -1;

  for (let i = start; i !== end; i += step) {
    var row = document.createElement('div');
    row.classList.add('row');

    for (let j = start; j !== end; j += step) {
      var newD = document.createElement('div');


      newD.classList.add('fis');

      if ((i + j) % 2 === 0) {
        newD.classList.add('white');
      } else {
        newD.classList.add('black');
      }

      var id = String.fromCharCode(65 + j - 1) + (9 - i); 
      boardx[id] = 0;

      newD.id = id;
      row.appendChild(newD);
    }
    board.appendChild(row);
  }
}



createBoard(Upright);


class Piece {
    constructor(name, symbol, color) {
      this.name = name;
      this.symbol = symbol;
      this.color = color;
    }
  }
  class Rook extends Piece {
    constructor(color) {
      super('Rook', color== 'black'? imagePath[2] : imagePath[8] , color);
    }
  }
  class Pawn extends Piece {
    constructor(color) {
      super('Pawn', color== 'black'?imagePath[3] : imagePath[9] , color);
    }
  }
  class Knight extends Piece {
    constructor(color) {
      super('Knight', color== 'black'?imagePath[4] : imagePath[10] , color);
    }
  }
  class Bishop extends Piece {
    constructor(color) {
      super('Bishop', color== 'black'?imagePath[5] : imagePath[11] , color);
    }
  }
  class Queen extends Piece {
    constructor(color) {
      super('Queen', color== 'black'?imagePath[0] : imagePath[6] , color);
    }
  }
  class King extends Piece {
    constructor(color) {
      super('King', color== 'black'?imagePath[1] : imagePath[7] , color);
    }
  }

var feno = 'r4rk1/1pp2ppp/p1p5/6B1/2bP4/P3RN2/Pn3PPP/3R1K2';

function validateFen(fen) {
  var lines = fen.split(' ')[0].split('/');

  if (lines.length !== 8) return false;

  for (var xow of lines) {
    var count = 0;

    for (var iows of xow) {
      if (/[rnbqkp]/i.test(iows)) {
        count += 1;
      } else if (/[1-8]/.test(iows)) {
        count += parseInt(iows);
      } else {
        return false;
      }
    }

    if (count !== 8) return false;
  }

  return true;
}

function assignPiece(fen) {
  if (!validateFen(fen)) {
    alert("Invalid FEN");
    return;
  }

  var fenlines = fen.split('/');
  var rowsOfTheBoard = [ "A", "B", "C", "D", "E", "F", "G", "H" ];

  var si = 'white';

  for (let ui = 1; ui < 9; ui++) {
    let xi = 1; 

    for (let ci = 0; ci < fenlines[ui - 1].length; ci++) {
      var lett = fenlines[ui - 1][ci];

      if (/[a-z]/i.test(lett)) {
        si = /[a-z]/.test(lett) ? 'black' : 'white';
        var lett = lett.toLowerCase();

        let piece;

        switch (lett) {
          case 'p':
            piece = new Pawn(si);
            break;
          case 'r':
            piece = new Rook(si);
            break;
          case 'b':
            piece = new Bishop(si);
            break;
          case 'q':
            piece = new Queen(si);
            break;
          case 'n':
            piece = new Knight(si);
            break;
          case 'k':
            piece = new King(si);
            break;
          default:
            break;
        }

        boardx[rowsOfTheBoard[xi - 1] + (9 - ui)] = piece; // Corrected here
        xi++;
      } else if (/[1-9]/.test(lett)) {
        let numCount = parseInt(lett);

        for (let oi = 0; oi < numCount; oi++) {
          boardx[rowsOfTheBoard[xi + oi - 1] + (9 - ui)] = 0; // Corrected here
        }

        xi += numCount; 
      }
    }
  }
}


assignPiece(feno);

var fenboard = document.getElementById('fenboard');
fenboard.value = feno;

fenboard.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' ) {
    var newfen = fenboard.value;
    assignPiece(newfen);
    drawboard();
  }
})

// var selectedPiece = null;

function drawboard() {
  for (var square in boardx) {
    if (boardx[square] !== 0) {
      var piece = boardx[square];
      var divo = document.querySelector('#' + square);

      if (divo && piece) {
        var img = document.createElement('img');
        img.src = piece.symbol;
        divo.innerHTML = '';
        divo.appendChild(img);
      }
    } else {
      var divo = document.querySelector('#' + square);
      if (divo) {
        divo.innerHTML = '';
      }
    }
  }
}

assignPiece(feno);

drawboard()

function flipBoard(){
  Upright = !Upright;
  createBoard(Upright);
  assignPiece(feno);
  drawboard();
}





document.addEventListener('DOMContentLoaded', function() {

  function addClickListener(square) {

    square.addEventListener('click', function() {
      var squareId = square.id;
      var isOnBoard = boardx[squareId] == 0 ? false : true;
      document.getElementsByClassName('ale')[0].innerHTML = squareId + ' ' + isOnBoard;

      var squares = document.querySelectorAll('.fis');
      for (s of squares) {
        if (boardx[s.id] == 0 && boardx[squareId] != 0) {
          s.style.backgroundColor = "#FF0000";

          var dot = document.createElement('div');
          dot.innerHTML = "Haile";
          dot.classList.add('dot');
          s.appendChild(dot);
        } 
      }
    });
  }


  
  
  var squares = document.querySelectorAll('.fis');
  squares.forEach(addClickListener);

  // Create a MutationObserver instance
  var observer = new MutationObserver(function() {
    var squares = document.querySelectorAll('.fis');
    squares.forEach(addClickListener);
  });

  // Start observing the board for changes
  observer.observe(board, { childList: true, subtree: true });
});




// var slider = document.getElementById("slider");
// slider.addEventListener('input', function(){
//     var value = slider.value;
    
//     var f = document.getElementsByClassName('fis');
//     for(var k = 0; k < f.length; k++){
//         var fx = f[k];
//         fx.style.width = value + 'px';
//         fx.style.height = value + 'px';
//     }
// })


// function movePiece(sourceSquareId, targetSquareId) {
//   if (boardx.hasOwnProperty(sourceSquareId) && !boardx.hasOwnProperty(targetSquareId)) {
//     var piece = boardx[sourceSquareId];
//     delete boardx[sourceSquareId];
//     boardx[targetSquareId] = piece;
//     drawboard();
//   }
// }
