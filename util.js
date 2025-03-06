export function isSquareOccupied(square) {
    if (!square) {
        console.warn("Square is null or undefined", square);
        return "empty";  // Handle the case where the square is invalid
    }

    const piece = square.querySelector(".piece");
    if (piece) {
        return piece.getAttribute("color");
    }
    return "empty";
}


