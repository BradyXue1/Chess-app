let isWhiteTurn = true;
const boardSquares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");
const piecesImages = document.getElementsByTagName("img")

document.addEventListener("DOMContentLoaded", () => {
    console.log("Pieces:", pieces); // Debug: Check if pieces exist
    setUpSquares();
    setUpPieces();
});
function setUpSquares() {
    for(let i=0; i<boardSquares.length; i++){
        boardSquares[i].addEventListener("dragover", allowDrop);
        boardSquares[i].addEventListener("drop", drop);
        let row = 8-Math.floor(i/8);
        let column = String.fromCharCode(97+(i%8));
        let square = boardSquares[i];
        square.id= column + row;
    }
}

function setUpPieces() {
    console.log("setting up pieces");
    for (let i = 0; i < pieces.length; i++) {
        console.log("Setting up piece:", pieces[i]);
        pieces[i].setAttribute("draggable", true);  
        pieces[i].addEventListener("dragstart", drag);
        const pieceType = pieces[i].className.split(" ")[1]; 
        const parentId = pieces[i].parentElement.id;
        pieces[i].id = pieceType + '-' + parentId;
        const img = pieces[i].querySelector("img");  
        if (img) {
            img.setAttribute("draggable", false);  
        }
    }
}


function allowDrop(ev){
    ev.preventDefault();
}

function drag(ev) {
    const piece = ev.target;
    ev.dataTransfer.setData("text", piece.id); 
    const startingSquareID = piece.parentNode.id;
    getPossibleMoves(startingSquareID,piece);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    const piece = document.getElementById(data);
    const pieceColor=piece.getAttribute("color");
    const destinationSquare = ev.currentTarget;
    let destinationSquareId = destinationSquare.id;
    if(isWhiteTurn && pieceColor=="White" || !isWhiteTurn && pieceColor=="Black"){
        if(isSquareOccupied(destinationSquare)=="empty"){
            destinationSquare.appendChild(piece);
            isWhiteTurn = !isWhiteTurn;
            console.log(isWhiteTurn); //debug
        }
        else if(isSquareOccupied(destinationSquare) !== "empty"){
            while(destinationSquare.firstChild){
                destinationSquare.removeChild(destinationSquare.firstChild);
            }
            destinationSquare.appendChild(piece);
            isWhiteTurn = !isWhiteTurn;
            console.log(isWhiteTurn); //debug
        }
    }    
}

function getPossibleMoves(startSquare,piece){
    const pieceColor=piece.getAttribute("color");
}

function isSquareOccupied(square){
    if(square.querySelector(".piece")){
        const color = square.querySelector(".piece").getAttribute("color");
        return color;
    }
    else {
        return "empty";
    }
}