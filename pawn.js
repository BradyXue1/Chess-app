import {Piece} from "./piece.js"
import { isSquareOccupied } from "./util.js";
export class Pawn extends Piece {
    constructor(element) {
        super(element);
    }
    getPossibleMoves(startSquare) {
        const [column, row] = [startSquare.charCodeAt(0) - 97, parseInt(startSquare[1])]; // This gets the starting square coords
        console.log(column,row);
        let moves = [];
        let direction = this.color === "White" ? 1 : -1; // 1 if white -1 if Black
        let forward = `${String.fromCharCode(97 + column)}${row + direction}`; // Which move is forward?
        let forwardSquare = document.getElementById(forward);

        if (forwardSquare && isSquareOccupied(forwardSquare) === "empty") {
            moves.push(forward);
        }

        let initialRow = this.color === "White" ? 2 : 7; // Starting ranks for White and Black
        if (row === initialRow) {
            let doubleForward = `${String.fromCharCode(97 + column)}${row + (direction * 2)}`; // Calculate double forward move
            let doubleForwardSquare = document.getElementById(doubleForward);
            if (doubleForwardSquare && isSquareOccupied(doubleForwardSquare) === "empty") {
                moves.push(doubleForward);
            }
        }

        let diagonalLeft = `${String.fromCharCode(97 + column - 1)}${row + direction}`;
        let diagonalRight = `${String.fromCharCode(97 + column + 1)}${row + direction}`;
        let leftSquare = document.getElementById(diagonalLeft);
        let rightSquare = document.getElementById(diagonalRight);
        if (leftSquare && isSquareOccupied(leftSquare) === "Black" && this.color === "White") {
            moves.push(diagonalLeft); 
        }
        if (rightSquare && isSquareOccupied(rightSquare) === "Black" && this.color === "White") {
            moves.push(diagonalRight);
        }
        if (leftSquare && isSquareOccupied(leftSquare) === "White" && this.color === "Black") {
            moves.push(diagonalLeft);
        }
        if (rightSquare && isSquareOccupied(rightSquare) === "White" && this.color === "Black") {
            moves.push(diagonalRight);
        }
        console.log(moves)
        return moves;
    }
}
