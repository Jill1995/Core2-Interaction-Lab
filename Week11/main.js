//declare a new array to hold our API data 
let apiData = [];

//put your api URL from airtable in this variable
let apiURL = 'https://api.airtable.com/v0/appPX3PCTZyxABB0Z/tblM1BxwvimHqac9E?api_key=keyh4dqwBcxr4tesR';

//array to hold all cartoon shows based on the table
let cartoonShows = [];

//the html elements we want to access
const select_menu = document.getElementById("cartoon_show_select");
const image_container = document.getElementById("image_container");

//fetching the data from airtable base
async function fetchData(url){
  let response = await fetch(url);   //server sends a response
  let jsonData = await response.json();   //convert the response into a json format
  return jsonData; //this line returns a json object 
}

//storing that fetched data into our array 'apiData'
async function getData(){
  let data = await fetchData(apiURL); //call the fetchData function and store json in 'data' variable

  //iterate over the above data and pull out only the required fields. 
  //we dont need all the extra info like the field id and all that Airtable returns
  //so instead, we will only store our main content which lives in records.fields
  for(let i =0; i<data.records.length; i++){
    let record = data.records[i].fields;
    apiData.push(record); //push those records into apiData to make a clean array
  }

  makeDropdown(); //call this function to make your select menu

  //add an event listener to the menu
  //this will change the images in image div on value change
  select_menu.addEventListener('change', function handleChange(event) {
    //console.log(select_menu.options[select_menu.selectedIndex].value);
    imageSearch();
  });
}


//this function makes our non-duplicated drop down menu to select characters from various cartoons
function makeDropdown(){
  //iterate over apiData to get all the show names and push them in our array
  for(let i =0 ; i<apiData.length; i++){
    let showName = apiData[i].Description;
    cartoonShows.push(showName);
  }

  //using remove duplicates function, remove the duplicate entries
  cartoonShows = removeDuplicates(cartoonShows);
  console.log(cartoonShows);

  let i = 0;
  //for every show in the array, create a new option in the select element of our html
  cartoonShows.forEach(element => {
    let option = document.createElement("option");
    option.className = "options";
    option.id = "option"+ i;
    option.innerHTML = element;
    option.value = element;
    select_menu.appendChild(option);
    i++;
  });
}


//function to remove duplicate entries in an array
function removeDuplicates(arr) {
  return arr.filter((item, 
      index) => arr.indexOf(item) === index);
}

//function to search for correct characters and display their image
function imageSearch(){
  console.log(select_menu.value);

  //filter() can only be used with an array.
  //we filter our apiData array to find all entries that contain the selected cartoon show in the menu
  const results = apiData.filter((entry) => {
      const descriptionMatch = entry.Description.includes(select_menu.value);
      return descriptionMatch;
  });

  //we render/show the images belonging to each of those characters
  renderSortedImages(results, image_container);
}


//this function shows the images belonging to a data row
function renderSortedImages(data, container){
  container.innerHTML = "";

  data.forEach((entry, index) => {
      const image = document.createElement("img");
      image.src = entry.Image[0].url;

      container.appendChild(image);
  });
}

//finally using our getData function to do everything above
//IMPORTANT
getData();