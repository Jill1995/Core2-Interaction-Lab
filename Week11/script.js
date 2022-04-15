//Declare an array to hold all our data
let apiData = [];

let apiURL = 'https://api.airtable.com/v0/appPX3PCTZyxABB0Z/tblM1BxwvimHqac9E?api_key=keyh4dqwBcxr4tesR';

//these will be unique categories based on your search functions
let cartoonShows = [];

const select_menu = document.getElementById("cartoon_show_select");
const image_container = document.getElementById("image_container");
const color_button = document.getElementById("change_border_color");

//only to request data from the api
async function fetchData(url){
    let response = await fetch(url);
    let jsonData = await response.json();
    return jsonData;
}

//which will also push data into apiData[] to make it more usable
async function getData(){
    let data = await fetchData(apiURL); 

    //reducing the array and making it simpler
    for(let i = 0; i<data.records.length; i++){
        let record = data.records[i].fields;
        apiData.push(record);
    }

    console.log(apiData);

    makeDropdown();



}

//adding an event listener on html element
select_menu.addEventListener('change', function selectShow(event){
    imageSearch();
    console.log("successfully searched");
})

color_button.addEventListener('click', function changeColor(event){
    document.querySelector("img").style.borderColor = "#6a0dad";
})

getData();

function makeDropdown(){
    //iterate over all the description (cartoon shows)
    for(let i = 0; i<apiData.length; i++){
        let showName = apiData[i].ShowName;
        cartoonShows.push(showName);
    };

    cartoonShows = removeDuplicates(cartoonShows);
    console.log(cartoonShows);

    //for every show in cartoonShows, add a new option in the select menbu
    cartoonShows.forEach((element, index) => {
        let new_option = document.createElement("option");
        new_option.className = "option" + index;
        new_option.innerHTML = element;
        new_option.value = element;
        select_menu.appendChild(new_option);
    });

}

function removeDuplicates(arr){
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

// to search for like correct cartoon characters and display their image
function imageSearch(){
    console.log(select_menu.value);

    //filter
    const results = apiData.filter((entry) => {
        const showNameMatch = entry.ShowName.includes(select_menu.value);
        return showNameMatch;
    });

    renderSortedImages(results,image_container);
}

function renderSortedImages(sortedData, container){
    container.innerHTML = "";

    sortedData.forEach((entry, index) => {
        const image = document.createElement("img");
        image.src = entry.Image[0].url;

        container.appendChild(image);
    })
}