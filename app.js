const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);

// Initialize drawing line color.
ctx.strokeStyle = INITIAL_COLOR;
// Initialize canvas color
ctx.fillStyle = INITIAL_COLOR
ctx.lineWidth = 2.5;

let paintingStatus = false;
let fillingStatus = false;

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
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

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

function handleCanvasClick(event){
    if(fillingStatus == true){
        ctx.fillRect(0,0,canvas.width,canvas.height)
    };
}

function handleCM(event){
    event.preventDefault();
}


// When click the colors below the canvas... 
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

function handleColorClick(event){
    // setting color of paint.
    ctx.strokeStyle = event.target.style.backgroundColor;

    // When "fill" button is pressed... ctx.fillStyle will be used.
    ctx.fillStyle = event.target.style.backgroundColor;
}


// When adjust the range of paint brush...
if(range){
    range.addEventListener("input", handleRangeChange);
}

function handleRangeChange(event){
    ctx.lineWidth = event.target.value;
}


// When click "Paint" or "Fill" button,
if(mode){
    mode.addEventListener("click", handleModeClick);
}

function handleModeClick(event){
    if(fillingStatus == false){
        fillingStatus = true;
        mode.innerText = "Paint";
    }
    else{
        fillingStatus = false;
        mode.innerText = "Fill"
    }
}


// When click "save" button,
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}

function handleSaveClick(event){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS🎨";
    link.click();
}
