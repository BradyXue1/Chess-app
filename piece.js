export class Piece {
    constructor(element) {
        this.element = element;
        this.type = element.className.split(" ")[1]; 
        this.color = element.getAttribute("color");
        this.id = this.type + "-" + element.parentElement.id;
        this.element.id = this.id;
        this.parentSquare = element.parentElement;
        this.element.setAttribute("draggable", true);
        this.element.addEventListener("dragstart", (ev) => this.drag(ev));
        const img = this.element.querySelector("img");
        if (img) img.setAttribute("draggable", false);
    }

    drag(ev) {
        ev.dataTransfer.setData("text", this.id);
        this.getPossibleMoves(this.parentSquare.id, this);
    }

    getPossibleMoves(startSquare, piece) {
        
    }

    getType(){
        return this.type;
    }

    getCol(){
        return this.parentSquare.id.charCodeAt(0) - 97;
    }

    getRow(){
        return parseInt(this.parentSquare.id[1]);
    }
}