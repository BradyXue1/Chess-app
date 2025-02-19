document.addEventListener("DOMContentLoaded", () => {
    const chessboard = document.getElementById("chessboard");
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"]; 
    const ranks = [8, 7, 6, 5, 4, 3, 2, 1]; 

    //standard setup
    const standardStartingPosition = [
        ["Black-Rook", "Black-Knight", "Black-Bishop", "Black-Queen", "Black-King", "Black-Bishop", "Black-Knight", "Black-Rook"], // Rank 8
        ["Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn"],       // Rank 7
        [null, null, null, null, null, null, null, null], // Rank 6
        [null, null, null, null, null, null, null, null], // Rank 5
        [null, null, null, null, null, null, null, null], // Rank 4
        [null, null, null, null, null, null, null, null], // Rank 3
        ["White-Pawn", "White-Pawn", "White-Pawn", "White-Pawn", "White-Pawn", "White-Pawn", "White-Pawn", "White-Pawn"],       // Rank 2
        ["White-Rook", "White-Knight", "White-Bishop", "White-Queen", "White-King", "White-Bishop", "White-Knight", "White-Rook"] // Rank 1
    ];

    //Fischer random
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function generateFischerRandomSetup() {
        let pieces = ["Black-Bishop", "Black-Bishop", "Black-Knight", "Black-Knight", "Black-Rook", "Black-Rook", "Black-King", "Black-Queen"];
        
        let valid = false;
        while (!valid) {
            shuffle(pieces);
            let bishopPositions = pieces.map((p, i) => p === "Black-Bishop" ? i : -1).filter(i => i !== -1);
            let kingIndex = pieces.indexOf("Black-King");
            let rookIndices = pieces.map((p, i) => p === "Black-Rook" ? i : -1).filter(i => i !== -1);
    
            // Bishops are on opposite colors and the king is between the two rooks
            if ((bishopPositions[0] % 2) !== (bishopPositions[1] % 2) &&
                rookIndices[0] < kingIndex && kingIndex < rookIndices[1]) {
                valid = true;
            }
        }
        return pieces;
    }

    //Somewhat random setup
    function generateSomewhatRandomPosition() {
        let pieces = [ //I'm shuffling just the black pieces, then making a copy of that setup for the white pieces so they have mirrored positions
            "Black-Bishop", "Black-Bishop", "Black-Knight", "Black-Knight",
            "Black-Rook", "Black-Rook", "Black-King", "Black-Queen",
            "Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn",
            "Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn"
        ];
        shuffle(pieces);
        return pieces;
    }
    

    //Fully random setup
    function generateFullyRandomPosition() {
        let pieces = [
            "Bishop", "Bishop", "Knight", "Knight", "Rook", "Rook", "King", "Queen",
            "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn"
        ];
    
        // Assign black and white colors
        let blackPieces = pieces.map(p => `Black-${p}`);
        let whitePieces = pieces.map(p => `White-${p}`);
        let allPieces = [...blackPieces, ...whitePieces];
        let valid2=false;
        while (!valid2) {
            valid2=true;
            shuffle(allPieces);
            for (let i=0; i<8; i++){
                if(allPieces[i] =="White-Pawn"){
                    valid2=false;
                }
            }
            for (let i=24; i<31; i++){
                if(allPieces[i] =="Black-Pawn"){
                    valid2=false;
                }
            }
        }

        console.log("All Pieces: " + allPieces); //debug
        return allPieces;
    }

    const TRP = generateFullyRandomPosition();
    const TrulyRandomPosition = [
        [TRP[0], TRP[1], TRP[2], TRP[3], TRP[4], TRP[5], TRP[6], TRP[7]],
        [TRP[8], TRP[9], TRP[10], TRP[11], TRP[12], TRP[13], TRP[14], TRP[15]],
        [null, null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null, null], 
        [TRP[16], TRP[17], TRP[18], TRP[19], TRP[20], TRP[21], TRP[22], TRP[23]],
        [TRP[24], TRP[25], TRP[26], TRP[27], TRP[28], TRP[29], TRP[30], TRP[31]]
    ]
    

    function switchToWhite(pieces) {
        return pieces.map(piece => piece.replace("Black", "White"));
    }

    const BFP = generateFischerRandomSetup(); //Black Fischer Pieces
    const WFP = switchToWhite(BFP);

    const FischerStartingPosition = [
        [BFP[0], BFP[1], BFP[2], BFP[3], BFP[4], BFP[5], BFP[6], BFP[7]],
        ["Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn"],  
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ["White-Pawn", "White-Pawn", "White-Pawn", "White-Pawn", "White-Pawn", "White-Pawn", "White-Pawn", "White-Pawn"],      
        [WFP[0], WFP[1], WFP[2], WFP[3], WFP[4], WFP[5], WFP[6], WFP[7]]
    ]

    const BSP=generateSomewhatRandomPosition(); //Black Somewhat Random Pieces
    const WSP=switchToWhite(BSP);

    const somewhatRandomPosition = [
        [BSP[0], BSP[1], BSP[2], BSP[3], BSP[4], BSP[5], BSP[6], BSP[7]],
        [BSP[8], BSP[9], BSP[10], BSP[11], BSP[12], BSP[13], BSP[14], BSP[15]],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [WSP[8], WSP[9], WSP[10], WSP[11], WSP[12], WSP[13], WSP[14], WSP[15]],
        [WSP[0], WSP[1], WSP[2], WSP[3], WSP[4], WSP[5], WSP[6], WSP[7]]
    ]
    console.log("JavaScript is active"); // debug 
    let mode=prompt("Mode")
    // Making the squares
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square"); 

            // Alternate between light and dark squares
            if ((row + col) % 2 === 0) {
                square.classList.add("light"); 
            } else {
                square.classList.add("dark");
            }

            // Numbers on left column
            if (col === 0) {
                const rankLabel = document.createElement("span");
                rankLabel.textContent = ranks[row];
                rankLabel.classList.add("rank-label");
                square.appendChild(rankLabel);
            }

            //Letters on bottom row
            if (row === 7) {
                const fileLabel = document.createElement("span");
                fileLabel.textContent = files[col];
                fileLabel.classList.add("file-label");
                square.appendChild(fileLabel);
            }

            switch(mode){
                case "Standard":
                    pieceType = standardStartingPosition[row][col];
                    break;
                case "Fischer":
                    pieceType = FischerStartingPosition[row][col];
                    break;
                case "Somewhat":
                    pieceType = somewhatRandomPosition[row][col];
                    break;
                case "Chaos":
                    pieceType = TrulyRandomPosition[row][col];
                    break;
                default:
                    pieceType = standardStartingPosition[row][col];
                    break;
            }
            if (pieceType) {
                const piece = document.createElement("img");
                piece.src = `pieces/${pieceType}.png`; 
                piece.classList.add("piece", pieceType);
                const [color, type] = pieceType.split('-');
                piece.setAttribute("color", color); 
                piece.setAttribute("type", type);
                square.appendChild(piece);
            }

            chessboard.appendChild(square);
        }
    }
});
