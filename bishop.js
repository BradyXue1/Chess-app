import {Piece} from "./piece.js"
import { isSquareOccupied } from "./util.js";
export class Bishop extends Piece {
    constructor(element) {
        super(element);
    }
    getPossibleMoves(startSquare){ //Bus code
        const [column, row] = [startSquare.charCodeAt(0) - 97, parseInt(startSquare[1])]; // This gets the starting square coords
        console.log(column,row);
        let moves = [];

        let upAndLeft=true;
        let UALCol=column;
        let UALRow=row;
        while(upAndLeft){
            upAndLeft=false;
            let potentialMove=`${String.fromCharCode(97 + UALCol-1)}${UALRow + 1}`;
            UALCol -= 1;
            UALRow += 1;
            let potentialSquare=document.getElementById(potentialMove);
            if(potentialSquare && isSquareOccupied(potentialSquare) === "empty"){
                moves.push(potentialMove);
                upAndLeft=true;
            }
            if(potentialSquare && isSquareOccupied(potentialSquare) === "Black" && this.color === "White"){
                moves.push(potentialMove);
            }
            if(potentialSquare && isSquareOccupied(potentialSquare) === "White" && this.color === "Black"){
                moves.push(potentialMove);
            }
        }

        let upAndRight=true;
        let UARCol=column;
        let UARRow=row;
        while(upAndRight){
            upAndRight=false;
            let potentialMove=`${String.fromCharCode(97 + UARCol+1)}${UARRow + 1}`;
            UARCol += 1;
            UARRow += 1;
            let potentialSquare=document.getElementById(potentialMove);
            if(potentialSquare && isSquareOccupied(potentialSquare) === "empty"){
                moves.push(potentialMove);
                upAndRight=true; 
            }
            if(potentialSquare && isSquareOccupied(potentialSquare) === "Black" && this.color === "White"){
                moves.push(potentialMove);
            }
            if(potentialSquare && isSquareOccupied(potentialSquare) === "White" && this.color === "Black"){
                moves.push(potentialMove);
            }
        }

        let DALCol=column;
        let DALRow=row;
        let downAndLeft=true;
        while(downAndLeft){
            downAndLeft=false;
            let potentialMove=`${String.fromCharCode(97 + DALCol-1)}${DALRow - 1}`;
            DALCol -= 1;
            DALRow -= 1;
            let potentialSquare=document.getElementById(potentialMove);
            if(potentialSquare && isSquareOccupied(potentialSquare) === "empty"){
                moves.push(potentialMove);
                downAndLeft=true;
            }
            if(potentialSquare && isSquareOccupied(potentialSquare) === "Black" && this.color === "White"){
                moves.push(potentialMove);
            }
            if(potentialSquare && isSquareOccupied(potentialSquare) === "White" && this.color === "Black"){
                moves.push(potentialMove);
            }
        }

        let DARCol=column;
        let DARRow=row;
        let downAndRight=true;
        while(downAndRight){
            downAndRight=false;
            let potentialMove=`${String.fromCharCode(97 + DARCol+1)}${DARRow - 1}`;
            DARCol += 1;
            DARRow -= 1;
            let potentialSquare=document.getElementById(potentialMove);
            if(potentialSquare && isSquareOccupied(potentialSquare) === "empty"){
                moves.push(potentialMove);
                downAndRight=true;
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
