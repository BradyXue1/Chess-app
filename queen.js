import {Piece} from "./piece.js"
import { isSquareOccupied } from "./util.js";
export class Queen extends Piece {
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