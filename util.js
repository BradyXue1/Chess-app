export function isSquareOccupied(square) {
    if (square.querySelector(".piece")) {
        return square.querySelector(".piece").getAttribute("color");
    }
    return "empty";
}
