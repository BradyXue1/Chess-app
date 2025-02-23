import {Piece} from "./piece.js"
import { isSquareOccupied } from "./util.js";
export class Rook extends Piece {
    constructor(element) {
        super(element);
    }
    getPossibleMoves(startSquare){
        const [column, row] = [startSquare.charCodeAt(0) - 97, parseInt(startSquare[1])];
        console.log(column, row);
        let moves = [];

        let up = true;
        let upRow=row;
        while(up){
            up=false;
            let potentialMove = `${String.fromCharCode(97+column)}${upRow + 1}`;
            console.log(potentialMove);
            upRow += 1;
            let potentialSquare=document.getElementById(potentialMove);
            if(potentialSquare && isSquareOccupied(potentialSquare) === "empty"){
                moves.push(potentialMove);
                up=true;
            }
            if(potentialSquare && isSquareOccupied(potentialSquare) === "Black" && this.color === "White"){
                moves.push(potentialMove);
            }
            if(potentialSquare && isSquareOccupied(potentialSquare) === "White" && this.color === "Black"){
                moves.push(potentialMove);
            }
        }

        let left = true;
        let leftCol=column;
        while(left){
            left=false;
            let potentialMove = `${String.fromCharCode(97+leftCol-1)}${row}`;
            leftCol -= 1;
            let potentialSquare=document.getElementById(potentialMove);
            if(potentialSquare && isSquareOccupied(potentialSquare) === "empty"){
                moves.push(potentialMove);
                left=true;
            }
            if(potentialSquare && isSquareOccupied(potentialSquare) === "Black" && this.color === "White"){
                moves.push(potentialMove);
            }
            if(potentialSquare && isSquareOccupied(potentialSquare) === "White" && this.color === "Black"){
                moves.push(potentialMove);
            }
        }

        let down = true;
        let downRow = row;
        while(down){
            down=false;
            let potentialMove = `${String.fromCharCode(97+column)}${downRow-1}`;
            downRow -= 1;
            let potentialSquare=document.getElementById(potentialMove);
            if(potentialSquare && isSquareOccupied(potentialSquare) === "empty"){
                moves.push(potentialMove);
                down=true;
            }
            if(potentialSquare && isSquareOccupied(potentialSquare) === "Black" && this.color === "White"){
                moves.push(potentialMove);
            }
            if(potentialSquare && isSquareOccupied(potentialSquare) === "White" && this.color === "Black"){
                moves.push(potentialMove);
            }
        }

        let right = true;
        let rightCol=column;
        while(right){
            right=false;
            let potentialMove = `${String.fromCharCode(97+rightCol+1)}${row}`;
            rightCol += 1;
            let potentialSquare=document.getElementById(potentialMove);
            if(potentialSquare && isSquareOccupied(potentialSquare) === "empty"){
                moves.push(potentialMove);
                right=true;
            }
            if(potentialSquare && isSquareOccupied(potentialSquare) === "Black" && this.color === "White"){
                moves.push(potentialMove);
            }
            if(potentialSquare && isSquareOccupied(potentialSquare) === "White" && this.color === "Black"){
                moves.push(potentialMove);
            }
        }

        console.log(moves);
        return moves;
    }
}