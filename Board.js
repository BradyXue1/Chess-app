import { Rook } from "./Rook.js";
import { Knight } from "./Knight.js";
import { Bishop } from "./Bishop.js";
import { Queen } from "./Queen.js";
import { King } from "./King.js";
import { Pawn } from "./Pawn.js";
import { isSquareOccupied } from "./util.js";
console.log("Board is being run");
export class Board {
    constructor() {
        this.squares = Array.from(document.getElementsByClassName("square"));
        this.pieceElements = Array.from(document.getElementsByClassName('piece')); 
        console.log(this.pieceElements);
        this.pieces = []; // Initialize as an empty array to hold piece instances
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
        for (let element of this.pieceElements) { // Iterate over piece elements
            let type = element.getAttribute("type"); 
            console.log(type);
            let piece;

            switch (type) {
                case "Rook":
                    piece = new Rook(element);
                    break;
                case "Knight":
                    piece = new Knight(element);
                    break;
                case "Bishop":
                    piece = new Bishop(element);
                    break;
                case "Queen":
                    piece = new Queen(element);
                    break;
                case "King":
                    piece = new King(element);
                    break;
                case "Pawn":
                    piece = new Pawn(element);
                    break;
                default:
                    console.error(`Unknown piece type: ${type}`);
                    continue; // Skip unknown pieces
            }

            this.pieces.push(piece); // Add the piece instance to the pieces array
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
        const pieceInstance = this.pieces.find(p => p.id === data);
        const possibleMoves = pieceInstance.getPossibleMoves(pieceInstance.parentSquare.id, pieceInstance);
        
        if ((this.isWhiteTurn && pieceColor === "White") || (!this.isWhiteTurn && pieceColor === "Black")) {
            console.log(destinationSquare.id);
            if(possibleMoves.includes(destinationSquare.id)){
                pieceInstance.parentSquare = destinationSquare;
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
}
