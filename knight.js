import {Piece} from "./piece.js"
import { isSquareOccupied } from "./util.js";
export class Knight extends Piece {
    constructor(element) {
        super(element);
    }

    getPossibleMoves(startSquare){
        const [column, row] = [startSquare.charCodeAt(0) - 97, parseInt(startSquare[1])];
        let moves = [];

        let TUORMove = `${String.fromCharCode(97 + column + 1)}${row+2}`; //Two Up One Right
        let TUORSquare=document.getElementById(TUORMove);
        if(TUORSquare && isSquareOccupied(TUORSquare) === "empty"){
            moves.push(TUORMove);
        } 
        if(TUORSquare && isSquareOccupied(TUORSquare) === "Black" && this.color === "White"){
            moves.push(TUORMove);
        }
        if(TUORSquare && isSquareOccupied(TUORSquare) === "White" && this.color === "Black"){
            moves.push(TUORMove);    
        }

        let OUTRMove = `${String.fromCharCode(97 + column + 2)}${row+1}`; //One Up Two Right
        let OUTRSquare=document.getElementById(OUTRMove);
        if(OUTRSquare && isSquareOccupied(OUTRSquare) === "empty"){
            moves.push(OUTRMove);
        } 
        if(OUTRSquare && isSquareOccupied(OUTRSquare) === "Black" && this.color === "White"){
            moves.push(OUTRMove);
        }
        if(OUTRSquare && isSquareOccupied(OUTRSquare) === "White" && this.color === "Black"){
            moves.push(OUTRMove);    
        }

        let ODTRMove = `${String.fromCharCode(97 + column + 2)}${row-1}`; //One Down Two Right
        let ODTRSquare=document.getElementById(ODTRMove);
        if(ODTRSquare && isSquareOccupied(ODTRSquare) === "empty"){
            moves.push(ODTRMove);
        } 
        if(ODTRSquare && isSquareOccupied(ODTRSquare) === "Black" && this.color === "White"){
            moves.push(ODTRMove);
        }
        if(ODTRSquare && isSquareOccupied(ODTRSquare) === "White" && this.color === "Black"){
            moves.push(ODTRMove);    
        }

        let TDORMove = `${String.fromCharCode(97 + column + 1)}${row-2}`; //Two Down One Right
        let TDORSquare=document.getElementById(TDORMove);
        if(TDORSquare && isSquareOccupied(TDORSquare) === "empty"){
            moves.push(TDORMove);
        } 
        if(TDORSquare && isSquareOccupied(TDORSquare) === "Black" && this.color === "White"){
            moves.push(TDORMove);
        }
        if(TDORSquare && isSquareOccupied(TDORSquare) === "White" && this.color === "Black"){
            moves.push(TDORMove);    
        }

        let TDOLMove = `${String.fromCharCode(97 + column -1)}${row-2}`; //Two Down One Left
        let TDOLSquare=document.getElementById(TDOLMove);
        if(TDOLSquare && isSquareOccupied(TDOLSquare) === "empty"){
            moves.push(TDOLMove);
        } 
        if(TDOLSquare && isSquareOccupied(TDOLSquare) === "Black" && this.color === "White"){
            moves.push(TDOLMove);
        }
        if(TDOLSquare && isSquareOccupied(TDOLSquare) === "White" && this.color === "Black"){
            moves.push(TDOLMove);    
        }

        let ODTLMove = `${String.fromCharCode(97 + column - 2)}${row-1}`; //One Down Two Left
        let ODTLSquare=document.getElementById(ODTLMove);
        if(ODTLSquare && isSquareOccupied(ODTLSquare) === "empty"){
            moves.push(ODTLMove);
        } 
        if(ODTLSquare && isSquareOccupied(ODTLSquare) === "Black" && this.color === "White"){
            moves.push(ODTLMove);
        }
        if(ODTLSquare && isSquareOccupied(ODTLSquare) === "White" && this.color === "Black"){
            moves.push(ODTLMove);    
        }  

        let OUTLMove = `${String.fromCharCode(97 + column-2)}${row+1}`; //One Up Two Left
        let OUTLSquare=document.getElementById(OUTLMove);
        if(OUTLSquare && isSquareOccupied(OUTLSquare) === "empty"){
            moves.push(OUTLMove);
        } 
        if(OUTLSquare && isSquareOccupied(OUTLSquare) === "Black" && this.color === "White"){
            moves.push(OUTLMove);
        }
        if(OUTLSquare && isSquareOccupied(OUTLSquare) === "White" && this.color === "Black"){
            moves.push(OUTLMove);    
        }

        let TUOLMove = `${String.fromCharCode(97 + column -1)}${row+2}`; //Two Up One Left
        let TUOLSquare=document.getElementById(TUOLMove);
        if(TUOLSquare && isSquareOccupied(TUOLSquare) === "empty"){
            moves.push(TUOLMove);
        } 
        if(TUOLSquare && isSquareOccupied(TUOLSquare) === "Black" && this.color === "White"){
            moves.push(TUOLMove);
        }
        if(TUOLSquare && isSquareOccupied(TUOLSquare) === "White" && this.color === "Black"){
            moves.push(TUOLMove);    
        }
        return moves;
    }
}