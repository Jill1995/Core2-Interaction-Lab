let apiData = [];

let apiURL = 'https://api.airtable.com/v0/appPX3PCTZyxABB0Z/tblM1BxwvimHqac9E?api_key=keyh4dqwBcxr4tesR';

let cartoonShows = [];

const select_menu = document.getElementById("cartoon_show_select");
const image_container = document.getElementById("image_container");

async function fetchData(url){
  let response = await fetch(url);   
  let jsonData = await response.json();   
  return jsonData; 
}


async function getData(){
  let data = await fetchData(apiURL); 

  for(let i =0; i<data.records.length; i++){
    let record = data.records[i].fields;
    apiData.push(record); 
  }

  makeDropdown(); 

  select_menu.addEventListener('change', function handleChange(event) {
    //console.log(select_menu.options[select_menu.selectedIndex].value);
    imageSearch();
  });
}


function makeDropdown(){
  for(let i =0 ; i<apiData.length; i++){
    let showName = apiData[i].Description;
    cartoonShows.push(showName);
  }
  cartoonShows = removeDuplicates(cartoonShows);
  console.log(cartoonShows);

  cartoonShows.forEach(element => {
    let option = document.createElement("option");
    option.className = "options"
    option.innerHTML = element;
    option.value = element;
    select_menu.appendChild(option);
  });
}


function removeDuplicates(arr) {
  return arr.filter((item, 
      index) => arr.indexOf(item) === index);
}

function imageSearch(){
  console.log(select_menu.value);

  const results = apiData.filter((entry) => {
      const descriptionMatch = entry.Description.includes(select_menu.value);
      return descriptionMatch;
  });

  renderSortedImages(results, image_container);
}

function renderSortedImages(data, container){
  container.innerHTML = "";

  data.forEach((entry, index) => {
      const image = document.createElement("img");
      image.src = entry.Image[0].url;

      container.appendChild(image);
  });
}
getData();