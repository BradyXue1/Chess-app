import { Rook } from "./rook.js";
import { Knight } from "./knight.js";
import { Bishop } from "./bishop.js";
import { Queen } from "./queen.js";
import { King } from "./king.js";
import { Pawn } from "./pawn.js";
import { isSquareOccupied } from "./util.js";
export class Board {
    constructor() {
        this.squares = Array.from(document.getElementsByClassName("square"));
        this.pieceElements = Array.from(document.getElementsByClassName('piece')); 
        this.pieces = []; 
        this.isWhiteTurn = true;
        this.isWhiteInCheck = false;
        this.isBlackInCheck = false;
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
        for (let element of this.pieceElements) {
            let type = element.getAttribute("type");
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
                    continue; 
            }
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
        const pieceInstance = this.pieces.find(p => p.id === data);
        const possibleMoves = pieceInstance.getPossibleMoves(pieceInstance.parentSquare.id, pieceInstance);
        if ((this.isWhiteTurn && pieceColor === "White") || (!this.isWhiteTurn && pieceColor === "Black")) {
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
                if(pieceInstance.getType() === "White-Pawn" && pieceInstance.getRow() === 8 && pieceInstance.promoted === false){
                    this.promote(pieceInstance, destinationSquare);
                    pieceInstance.promoted = true;
                }
                if(pieceInstance.getType() === "Black-Pawn" && pieceInstance.getRow() === 1 && pieceInstance.promoted === false){
                    this.promote(pieceInstance, destinationSquare);
                    pieceInstance.promoted = true;
                }
                if(pieceInstance.getType() === "White-King" || pieceInstance.getType() === "Black-King"){
                    pieceInstance.setMoved();
                }
            }
            if(pieceInstance.getType() === "White-King" && destinationSquare.id === "g1"){
                let rook = this.pieces.find(p => p.getType() === "White-Rook" && p.element.getAttribute("color") === "White" && p.getCol() === 7);
                this.castle(pieceInstance, rook, "Black", 7, this.pieces);
            }
            if(pieceInstance.getType() === "White-King" && destinationSquare.id === "c1"){
                let rook = this.pieces.find(p => p.getType() === "White-Rook" && p.element.getAttribute("color") === "White" && p.getCol() === 0);
                this.castle(pieceInstance, rook, "Black", 0, this.pieces);
            }
            if(pieceInstance.getType() === "Black-King" && destinationSquare.id === "g8"){
                let rook = this.pieces.find(p => p.getType() === "Black-Rook" && p.element.getAttribute("color") === "Black" && p.getCol() === 7); 
                this.castle(pieceInstance, rook, "White", 7, this.pieces);
            }
            if(pieceInstance.getType() === "White-King" && destinationSquare.id === "c8"){
                let rook = this.pieces.find(p => p.getType() === "Black-Rook" && p.element.getAttribute("color") === "Black" && p.getCol() === 0);
                this.castle(pieceInstance, rook, "White", 0, this.pieces);
            }
            this.isInCheck("White", this.pieces);
            this.isInCheck("Black", this.pieces);
        }
    }

    promote(pawn, square){
        let type = prompt("Promote to Queen, Rook, Bishop, or Knight?");
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
                type="Queen"
                newPiece=new Queen(pawn.element);
                break;
        }
        newPiece.element.src = `images/${pawn.element.getAttribute("color")}-${type}.png`;
        newPiece.element.setAttribute("type",type);
        square.appendChild(newPiece.element);
        this.pieces = this.pieces.filter(p => p !== pawn);
        this.pieces.push(newPiece);
    }

    isUnderAttack(square, pieces, attackingColor) {
        for (let piece of pieces) {
            if (!piece || piece.element.getAttribute("color") !== attackingColor) continue;
            const possibleMoves = piece.getPossibleMoves(piece.parentSquare.id);
            if (possibleMoves.includes(square)) {
                return true;
            }
        }
        return false;
    }
    

    findKing(color){
        console.log(this.pieces.find(p => p.getType() === color+"-King"));
        return this.pieces.find(p => p.getType() === color+"-King");
    }

    isInCheck(color, pieces) {
        let king = this.findKing(color);
        const kingPosition = king.parentSquare.id; 
        console.log(`Is ${color} in check?`);
        console.log(this.isUnderAttack(kingPosition, pieces, color === "White" ? "Black" : "White"));
        return this.isUnderAttack(kingPosition, pieces, color === "White" ? "Black" : "White");
    }
    
    
    canCastle(rook, king, pieces, attackingColor) {    
        if (king.getMoved()===true || rook.getMoved()===true) {
            console.log("A piece has already moved. Cannot castle.");
            return false;
        }
        
        let kingRow = king.getRow();
        let rookCol = rook.getCol();
        let path = [];
        
        if (rookCol === 0) { 
            path = [`b${kingRow}`, `c${kingRow}`, `d${kingRow}`];
        } else if (rookCol === 7) { 
            path = [`f${kingRow}`, `g${kingRow}`];
        }

        for (let square of path) {
            if (isSquareOccupied(document.getElementById(square)) !== "empty") {
                console.log(`Square ${square} is not empty. Cannot castle.`);
                return false;
            }
        }

        if (this.isUnderAttack('e' + kingRow, pieces, attackingColor) || 
            this.isUnderAttack(path[0], pieces, attackingColor) || 
            this.isUnderAttack(path[1], pieces, attackingColor)) {
            console.log("A square in the castling path is under attack.");
            return false;
        }
        return true;
    }

    castle(king, rook, attackingColor, rookCol, pieces) {
        if(this.canCastle(rook, king, pieces, attackingColor)){
            let kingTarget, rookTarget;
            let kingRow = king.getRow();
            if (rookCol === 7) {
                kingTarget = document.getElementById(`g${kingRow}`);
                rookTarget = document.getElementById(`f${kingRow}`);
            } else if (rookCol === 0) { 
                kingTarget = document.getElementById(`c${kingRow}`);
                rookTarget = document.getElementById(`d${kingRow}`);
            } else {
                console.log("Invalid rook position for castling");
                return;
            }
            kingTarget.appendChild(king.element);
            rookTarget.appendChild(rook.element);
            king.parentSquare = kingTarget;
            rook.parentSquare = rookTarget;
            king.setMoved(true);
            rook.setMoved(true);
            this.isWhiteTurn = !this.isWhiteTurn;
        }
    } 
}
