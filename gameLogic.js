let LegalSquares = [];
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
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    const piece = document.getElementById(data);
    const pieceColor=piece.getAttribute("color");
    if(isWhiteTurn && pieceColor=="White" || !isWhiteTurn && pieceColor=="Black"){
        console.log("Piece:", piece);
        const destinationSquare = ev.currentTarget;
        destinationSquare.appendChild(piece);
        isWhiteTurn = !isWhiteTurn
    }    
}