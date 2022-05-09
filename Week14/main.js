let title = document.getElementById("changing-text");
let image = document.getElementById("changing-img");
// const btn = document.getElementById("addimage");

let keyspressed = []

// let codeArray = ["e","g","y","u","h","j"];
let interval = setInterval(changeBackground, 1000);

// btn.addEventListener('click', function(){
//     let img2 = document.createElement("img");
//     img2.className = "imagesadded";
//     img2.src = "earth.png";
//     document.body.appendChild(img2);
// })

document.addEventListener('keydown', function(evt){
    // console.log(evt.code, evt.key);
    if(evt.metaKey == false){
        //clearInterval(interval);
        title.innerHTML += evt.key;
        setImage(title.innerHTML);
        keyspressed.push(evt.key);

        if(evt.key == 'p'){
            clearInterval(interval);
        }
    }

});

function setImage(word){
    switch(word){
        case 'earth':
            image.src = "earth.png";
            break;
        case 'moon':
            image.src = "moon.png";
            break;
        case 'sun':
            image.src = "sun.png";
            break;
        default:
            image.src = "";
    }
}

document.addEventListener('keyup', function(evt){

    if(evt.key === "Backspace"){
        console.log(evt.code);
        title.innerHTML = ""
    }

    if(evt.key === "Alt"){
        title.classList.toggle("change");
    }

    if(evt.key === "Control"){
        title.classList.toggle("before-change");
    }

    // switch(evt.key){
    //     case 'e':
    //         //title.innerHTML = codeArray[5];
    //         image.src = "earth.png";
    //         break;
    //     case 'm':
    //         //title.innerHTML = codeArray[0];
    //         image.src = "moon.png";
    //         break;
    //     case 's':
    //         //title.innerHTML = codeArray[1];
    //         image.src = "sun.png";
    //         break;
    //     default:
    //         image.src = "";
    // }
})


function changeBackground(){
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    console.log(randomColor);
    document.body.style.background ="#" + randomColor;
}

