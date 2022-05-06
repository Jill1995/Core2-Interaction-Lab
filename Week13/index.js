var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

const cursor = {
    x: 600 /2,
    y: 600 /2
}



canvas.addEventListener("mousemove", (e)=>{
    let mousePos = getMousePosition(canvas, e);
    // let r = Math.floor(Math.random() * 255);
    // let g = Math.floor(Math.random() * 255);
    // let b = Math.floor(Math.random() * 255);
    // console.log(r,g,b);

    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    ctx.fillStyle = randomColor;
    ctx.fillRect(mousePos.x, mousePos.y, 60, 100);
})


function getMousePosition(canvas, event){
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}



