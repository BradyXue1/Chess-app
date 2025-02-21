let isWhiteTurn = true;
const boardSquares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");

document.addEventListener("DOMContentLoaded", () => {
    const chessBoard = new Board();
});

class Piece {
    constructor(element) {
        this.element = element;
        this.type = element.className.split(" ")[1]; 
        this.color = element.getAttribute("color");
        this.id = this.type + "-" + element.parentElement.id;
        this.element.id = this.id;
        this.parentSquare = element.parentElement;

        this.element.setAttribute("draggable", true);
        this.element.addEventListener("dragstart", (ev) => this.drag(ev));

        const img = this.element.querySelector("img");
        if (img) img.setAttribute("draggable", false);
    }

    drag(ev) {
        ev.dataTransfer.setData("text", this.id);
        getPossibleMoves(this.parentSquare.id, this);
    }
}

class Board {
    constructor() {
        this.squares = Array.from(boardSquares);
        this.pieces = [];
        this.isWhiteTurn = true;
        this.setUpSquares();
        this.setUpPieces();
    }

    setUpSquares() {
        this.squares.forEach((square, i) => {
            square.addEventListener("dragover", this.allowDrop);
            square.addEventListener("drop", (ev) => this.drop(ev));

            let row = 8 - Math.floor(i / 8);
            let column = String.fromCharCode(97 + (i % 8));
            square.id = column + row;
        });
    }

    setUpPieces() {
        for (let element of pieces) {
            let piece = new Piece(element);
            this.pieces.push(piece);
        }
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drop(ev) {
        ev.preventDefault();
        let data = ev.dataTransfer.getData("text");
        const piece = document.getElementById(data);
        const pieceColor = piece.getAttribute("color");
        const destinationSquare = ev.currentTarget;

        if ((this.isWhiteTurn && pieceColor === "White") || (!this.isWhiteTurn && pieceColor === "Black")) {
            if (isSquareOccupied(destinationSquare) === "empty") {
                destinationSquare.appendChild(piece);
                this.isWhiteTurn = !this.isWhiteTurn;
            } else {
                while (destinationSquare.firstChild) {
                    destinationSquare.removeChild(destinationSquare.firstChild);
                }
                destinationSquare.appendChild(piece);
                this.isWhiteTurn = !this.isWhiteTurn;
            }
        }
    }
}

// Helper Functions
function getPossibleMoves(startSquare, piece) {
    console.log(`Calculating moves for ${piece.type} at ${startSquare}`);
}

function isSquareOccupied(square) {
    if (square.querySelector(".piece")) {
        return square.querySelector(".piece").getAttribute("color");
    }
    return "empty";
}
