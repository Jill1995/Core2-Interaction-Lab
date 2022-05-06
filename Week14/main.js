const h2 = document.getElementById("changing-text");
const img = document.getElementById("changing-img");

document.addEventListener('keydown', (ev)=>{
    h2.innerHTML +=  ev.key;
    setImage(h2.innerHTML);
    // if(h2.innerHTML == "earth"){
    //     img.src = "earth.png";
    // }
})

document.addEventListener('keyup', (ev)=>{
    if(ev.key === "Backspace"){
        console.log(ev.code);
        h2.innerHTML = ""
    }

    // if(ev.code === "KeyE"){
    //     img.src = "earth.png";
    // }else if(ev.code === "KeyM"){
    //     img.src = "moon.png";
    // }else if(ev.code === "KeyS"){
    //     img.src = "sun.png";
    // }
})

function setImage(word){
    if(word == "earth"){
        img.src = "earth.png";
    }
    else if(word == "moon"){
        img.src = "moon.png";
    }
    else if(word == "sun"){
        img.src = "sun.png";
    }else{
        img.src ="";
    }
}