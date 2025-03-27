import {Piece} from "./piece.js"
import { isSquareOccupied } from "./util.js";
export class King extends Piece {
    constructor(element) {
        super(element);
        this.hasBeenMoved=false;
    }
    getPossibleMoves(startSquare){
        const [column, row] = [startSquare.charCodeAt(0) - 97, parseInt(startSquare[1])];
        let moves = [];

        let upMove = `${String.fromCharCode(97 + column)}${row+1}`;
        let upSquare=document.getElementById(upMove);
        if(upSquare && isSquareOccupied(upSquare) === "empty"){
            moves.push(upMove);
        } 
        if(upSquare && isSquareOccupied(upSquare) === "Black" && this.color === "White"){
            moves.push(upMove);
        }
        if(upSquare && isSquareOccupied(upSquare) === "White" && this.color === "Black"){
            moves.push(upMove);    
        }

        let upAndRightMove = `${String.fromCharCode(97 + column + 1)}${row+1}`;
        let upAndRightSquare=document.getElementById(upMove);
        if(upAndRightSquare && isSquareOccupied(upAndRightSquare) === "empty"){
            moves.push(upAndRightMove);
        } 
        if(upAndRightSquare && isSquareOccupied(upAndRightSquare) === "Black" && this.color === "White"){
            moves.push(upAndRightMove);
        }
        if(upAndRightSquare && isSquareOccupied(upAndRightSquare) === "White" && this.color === "Black"){
            moves.push(upAndRightMove);    
        }

        let rightMove = `${String.fromCharCode(97 + column + 1)}${row}`;
        let rightSquare=document.getElementById(rightMove);
        if(rightSquare && isSquareOccupied(rightSquare) === "empty"){
            moves.push(rightMove);
        } 
        if(rightSquare && isSquareOccupied(rightSquare) === "Black" && this.color === "White"){
            moves.push(rightMove);
        }
        if(rightSquare && isSquareOccupied(rightSquare) === "White" && this.color === "Black"){
            moves.push(rightMove);    
        }

        let downAndRightMove = `${String.fromCharCode(97 + column + 1)}${row-1}`;
        let downAndRightSquare=document.getElementById(downAndRightMove);
        if(downAndRightSquare && isSquareOccupied(downAndRightSquare) === "empty"){
            moves.push(downAndRightMove);
        } 
        if(downAndRightSquare && isSquareOccupied(downAndRightSquare) === "Black" && this.color === "White"){
            moves.push(downAndRightMove);
        }
        if(downAndRightSquare && isSquareOccupied(downAndRightSquare) === "White" && this.color === "Black"){
            moves.push(downAndRightMove);    
        }

        let downMove = `${String.fromCharCode(97 + column)}${row-1}`;
        let downSquare=document.getElementById(downMove);
        if(downSquare && isSquareOccupied(downSquare) === "empty"){
            moves.push(downMove);
        } 
        if(downSquare && isSquareOccupied(downSquare) === "Black" && this.color === "White"){
            moves.push(downMove);
        }
        if(downSquare && isSquareOccupied(downSquare) === "White" && this.color === "Black"){
            moves.push(downMove);    
        }

        let downAndLeftMove = `${String.fromCharCode(97 + column - 1)}${row-1}`;
        let downAndLeftSquare=document.getElementById(downAndLeftMove);
        if(downAndLeftSquare && isSquareOccupied(downAndLeftSquare) === "empty"){
            moves.push(downAndLeftMove);
        } 
        if(downAndLeftSquare && isSquareOccupied(downAndLeftSquare) === "Black" && this.color === "White"){
            moves.push(downAndLeftMove);
        }
        if(downAndLeftSquare && isSquareOccupied(downAndLeftSquare) === "White" && this.color === "Black"){
            moves.push(downAndLeftMove);    
        }

        let leftMove = `${String.fromCharCode(97 + column-1)}${row}`;
        let leftSquare=document.getElementById(leftMove);
        if(leftSquare && isSquareOccupied(leftSquare) === "empty"){
            moves.push(leftMove);
        } 
        if(leftSquare && isSquareOccupied(leftSquare) === "Black" && this.color === "White"){
            moves.push(leftMove);
        }
        if(leftSquare && isSquareOccupied(leftSquare) === "White" && this.color === "Black"){
            moves.push(leftMove);    
        }

        let upAndLeftMove = `${String.fromCharCode(97 + column -1)}${row+1}`;
        let upAndLeftSquare=document.getElementById(upAndLeftMove);
        if(upAndLeftSquare && isSquareOccupied(upAndLeftSquare) === "empty"){
            moves.push(upAndLeftMove);
        } 
        if(upAndLeftSquare && isSquareOccupied(upAndLeftSquare) === "Black" && this.color === "White"){
            moves.push(upAndLeftMove);
        }
        if(upAndLeftSquare && isSquareOccupied(upAndLeftSquare) === "White" && this.color === "Black"){
            moves.push(upAndLeftMove);    
        }
        return moves;
    }

    getMoved(){
        return this.hasBeenMoved;
    }

    setMoved(){
        this.hasBeenMoved=true;
    }
}
