import { Rook } from "./rook.js";
import { Knight } from "./knight.js";
import { Bishop } from "./bishop.js";
import { Queen } from "./queen.js";
import { King } from "./king.js";
import { Pawn } from "./pawn.js";
import { isSquareOccupied } from "./util.js";
console.log("Board is being run");
export class Board {
    constructor() {
        this.squares = Array.from(document.getElementsByClassName("square"));
        this.pieceElements = Array.from(document.getElementsByClassName('piece')); 
        console.log(this.pieceElements);
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
                if(pieceInstance.getType() === "White-Pawn" && pieceInstance.getRow() === 8){
                    console.log("promote me");
                    this.promote(pieceInstance, destinationSquare);
                }
                if(pieceInstance.getType() === "Black-Pawn" && pieceInstance.getRow() === 1){
                    console.log("promote me");
                    this.promote(pieceInstance, destinationSquare);
                }
            }
        }
    }

    promote(pawn, square){
        console.log("promoting")
        let type = prompt("Promote to Queen, Rook, Bishop, or Knight?", "Queen");
        console.log(type);
        let newPiece;
        switch(type){
            case "Queen":
                newPiece=new Queen(pawn.element);
                break;
            case "Rook":
                newPiece=new Rook(pawn.element);
                break;
            case "Bishop":
                newPiece=new Bishop(pawn.element);
                break;
            case "Knight":
                newPiece=new Knight(pawn.element);
                break;
            default:
                newPiece=new Queen(pawn.element);
                break;
        }
        newPiece.element.src = `images/${pawn.element.getAttribute("color")}-${type}.png`;
        newPiece.element.setAttribute("type",type);
        square.appendChild(newPiece.element);
        this.pieces = this.pieces.filter(p => p !== pawn);
        this.pieces.push(newPiece);
    }
}
