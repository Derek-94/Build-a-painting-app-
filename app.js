const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.height = 700;
canvas.width = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.linkWidth = 2.5;

let paintingStatus = false;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!paintingStatus){
        // Not yet we are drawing the pic.
        ctx.beginPath();
        ctx.moveTo(x,y) ;
    }
    else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startPainting(){
    // When we start painting, we make a event "click" FIRST.
    // variable "paintingStatus" let us know if we are in status of painting or not.
    paintingStatus = true;
}

function inactivatePaintingStatus(){
    // When we click-off, that will mean we are finishing painting.
    // then we have to setup variable "paintingstatus" false.
    // or, when we leave the canvas while painting,
    // then we have to make status false.
    paintingStatus = false;
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", inactivatePaintingStatus);
    canvas.addEventListener("mouseleave", inactivatePaintingStatus);
}