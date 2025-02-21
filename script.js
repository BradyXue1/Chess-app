document.addEventListener("DOMContentLoaded", () => {
    const chessboardElement = document.getElementById("chessboard");
    const mode = prompt("Mode") || "Standard";
    new ChessBoard(chessboardElement, mode);
});

class ChessBoard {
    constructor(chessboardElement, mode) {
        this.chessboardElement = chessboardElement;
        this.files = ["a", "b", "c", "d", "e", "f", "g", "h"];
        this.ranks = [8, 7, 6, 5, 4, 3, 2, 1];
        this.mode = mode;

        this.initBoard();
    }

    initBoard() {
        this.chessboardElement.innerHTML = ""; // Clear the board before rendering
        const startingPosition = this.getStartingPosition(this.mode);

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = this.createSquare(row, col);
                const pieceType = startingPosition[row][col];

                if (pieceType) {
                    this.addPiece(square, pieceType);
                }

                this.chessboardElement.appendChild(square);
            }
        }
    }

    createSquare(row, col) {
        const square = document.createElement("div");
        square.classList.add("square", (row + col) % 2 === 0 ? "light" : "dark");
        square.id = `${this.files[col]}${this.ranks[row]}`;

        // Add rank labels (left side)
        if (col === 0) {
            const rankLabel = document.createElement("span");
            rankLabel.textContent = this.ranks[row];
            rankLabel.classList.add("rank-label");
            square.appendChild(rankLabel);
        }

        // Add file labels (bottom side)
        if (row === 7) {
            const fileLabel = document.createElement("span");
            fileLabel.textContent = this.files[col];
            fileLabel.classList.add("file-label");
            square.appendChild(fileLabel);
        }

        return square;
    }

    addPiece(square, pieceType) {
        const piece = document.createElement("img");
        piece.src = `pieces/${pieceType}.png`;
        piece.classList.add("piece", pieceType);

        const [color, type] = pieceType.split("-");
        piece.setAttribute("color", color);
        piece.setAttribute("type", type);

        square.appendChild(piece);
    }

    getStartingPosition(mode) {
        switch (mode) {
            case "Fischer":
                return this.generateFischerRandomPosition();
            case "Somewhat":
                return this.generateSomewhatRandomPosition();
            case "Chaos":
                return this.generateFullyRandomPosition();
            default:
                return this.getStandardStartingPosition();
        }
    }

    getStandardStartingPosition() {
        return [
            ["Black-Rook", "Black-Knight", "Black-Bishop", "Black-Queen", "Black-King", "Black-Bishop", "Black-Knight", "Black-Rook"],
            ["Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn"],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ["White-Pawn", "White-Pawn", "White-Pawn", "White-Pawn", "White-Pawn", "White-Pawn", "White-Pawn", "White-Pawn"],
            ["White-Rook", "White-Knight", "White-Bishop", "White-Queen", "White-King", "White-Bishop", "White-Knight", "White-Rook"]
        ];
    }

    generateFischerRandomPosition() {
        let pieces = ["Bishop", "Bishop", "Knight", "Knight", "Rook", "Rook", "King", "Queen"];
        let valid = false;

        while (!valid) {
            this.shuffleArray(pieces);
            let bishopPositions = pieces.map((p, i) => p === "Bishop" ? i : -1).filter(i => i !== -1);
            let kingIndex = pieces.indexOf("King");
            let rookIndices = pieces.map((p, i) => p === "Rook" ? i : -1).filter(i => i !== -1);

            if ((bishopPositions[0] % 2) !== (bishopPositions[1] % 2) && rookIndices[0] < kingIndex && kingIndex < rookIndices[1]) {
                valid = true;
            }
        }

        return [
            pieces.map(p => `Black-${p}`),
            Array(8).fill("Black-Pawn"),
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            Array(8).fill("White-Pawn"),
            pieces.map(p => `White-${p}`)
        ];
    }

    generateSomewhatRandomPosition() {
        let pieces = [
            "Black-Bishop", "Black-Bishop", "Black-Knight", "Black-Knight",
            "Black-Rook", "Black-Rook", "Black-King", "Black-Queen",
            "Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn",
            "Black-Pawn", "Black-Pawn", "Black-Pawn", "Black-Pawn"
        ];
    
        this.shuffleArray(pieces);
    
        let blackBackRank = pieces.slice(0, 8);
        let blackPawnRank = pieces.slice(8, 16);
    
        let whiteBackRank = blackBackRank.map(p => p.replace("Black", "White"));
        let whitePawnRank = blackPawnRank.map(p => p.replace("Black", "White"));
    
        return [
            blackBackRank,
            blackPawnRank,
            [null, null, null, null, null, null, null, null], 
            [null, null, null, null, null, null, null, null], 
            [null, null, null, null, null, null, null, null], 
            [null, null, null, null, null, null, null, null], 
            whitePawnRank,
            whiteBackRank
        ];
    }
    

    generateFullyRandomPosition() {
        let pieces = ["Bishop", "Bishop", "Knight", "Knight", "Rook", "Rook", "King", "Queen", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn"];
        let allPieces = [...pieces.map(p => `Black-${p}`), ...pieces.map(p => `White-${p}`)];
        let valid = false;

        while (!valid) {
            this.shuffleArray(allPieces);
            valid = true;

            for (let i = 0; i < 8; i++) {
                if (allPieces[i] === "White-Pawn") valid = false;
            }
            for (let i = 24; i < 32; i++) {
                if (allPieces[i] === "Black-Pawn") valid = false;
            }
        }

        return [
            allPieces.slice(0, 8),
            allPieces.slice(8, 16),
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            allPieces.slice(16, 24),
            allPieces.slice(24, 32)
        ];
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}
