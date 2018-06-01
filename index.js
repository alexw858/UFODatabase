// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $durationMinutesInput = document.querySelector("#durationMinutes");
var $searchBtn = document.querySelector("#search");

var $loadMoreBtn = document.querySelector("#load-btn");

// Set a startingIndex and resultsPerPage variable
var startingIndex = 0;
var resultsPerPage=50;

// Set filteredData to dataSet initially
// BRINGS ALL DATA ONTO PAGE
var filteredData = dataSet;

// Add an event listener to the searchBtn, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Add an event listener to the loadMoreBtn, call handleButtonClick when clicked
// console.log("startingIndex = ", startingIndex);
// console.log("resultsPerPage = ", resultsPerPage);
// console.log("filteredData = ", filteredData);
// console.log("filteredDataLength = ", filteredData.length);
// if (startingIndex + resultsPerPage >= filteredData.length) {
//   $loadMoreBtn.classList.add("disabled");
//   $loadMoreBtn.innerText = "Add Data Loaded";
//   $loadMoreBtn.removeEventListener("click", handleButtonClick);}
// else {
// $loadMoreBtn.addEventListener("click", handleButtonClick);
// }

$loadMoreBtn.addEventListener("click", handleButtonClick);


// renderTable renders the filteredData to the tbody
// THIS is where I will likely specify how many results per page
// function renderTable() {
//   $tbody.innerHTML = "";
//   for (var i = 0; i < filteredData.length; i++) {
//     // Get the current data object and its fields
//     var currentData = filteredData[i];
//     var fields = Object.keys(currentData);
//     // console.log("fields = ", fields)
//     // Create a new row in the tbody, set the index to be i + startingIndex
//     var $row = $tbody.insertRow(i);
//     for (var j = 0; j < fields.length; j++) {
//       // For every field in the data object, create a new cell at set its inner text to be the current value at the current data's field
//       var field = fields[j];
//       var $cell = $row.insertCell(j);
//       $cell.innerText = currentData[field];
//     }
//   }
// }

// Render 50 results at a time
function renderTableSection() {
  $tbody.innerHTML = "";
  var endingIndex = startingIndex + resultsPerPage;
  var dataSubset = filteredData.slice(startingIndex, endingIndex);
  for (var i=0; i<dataSubset.length; i++) {
    var currentData = dataSubset[i];
    var fields = Object.keys(currentData);
    console.log("tableStartingIndex = ", startingIndex);
    // var $row = $tbody.insertRow(i + startingIndex);
    var $row = $tbody.insertRow(i);
    // console.log("$row = ", $row);
    for (var j=0; j<fields.length; j++) {
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = currentData[field];
    }
  }
  if (startingIndex + resultsPerPage >= filteredData.length) {
  // if (filteredData.length <= 50) {
    $loadMoreBtn.classList.add("disabled");
    $loadMoreBtn.innerText = "All Data Loaded";
    $loadMoreBtn.removeEventListener("click", handleButtonClick);
  }
}

function handleButtonClick() {
  startingIndex += resultsPerPage;
  console.log("buttonStartingIndex = ", startingIndex);
  renderTableSection();
  // Checks to see if there are more results to render (won't run unless the button is clicked)
  if (startingIndex + resultsPerPage >= filteredData.length) {
    $loadMoreBtn.classList.add("disabled");
    $loadMoreBtn.innerText = "All Data Loaded";
    $loadMoreBtn.removeEventListener("click", handleButtonClick);
  }
}
function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDate = $dateInput.value.trim();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();
  var filterDurationMinutes = $durationMinutesInput.value.trim().toLowerCase();

  // Set filteredData to an array of all current data whose "state" matches the filter
  filteredData = dataSet.filter(function (currentData) {
    var dataDate = currentData.datetime.substring(0, filterDate.length);
    var dataCity = currentData.city.substring(0, filterCity.length).toLowerCase();
    var dataState = currentData.state.substring(0, filterState.length).toLowerCase();
    var dataCountry = currentData.country.substring(0, filterCountry.length).toLowerCase();
    var dataShape = currentData.shape.substring(0, filterShape.length).toLowerCase();
    var dataDurationMinutes = String(currentData.durationMinutes).substring(0, filterDurationMinutes.length).toLowerCase();
    // console.log("dataDurationMinutes = ", dataDurationMinutes);

    if (dataDate === filterDate && dataCity === filterCity && dataState === filterState
    && dataCountry === filterCountry && dataShape === filterShape && dataDurationMinutes === filterDurationMinutes) {
      return true;
    }
    return false;
  });
  console.log("filteredData = ", filteredData);
  console.log("filteredDataLength = ", filteredData.length);
  renderTableSection();
}

// Render the table for the first time on page load
renderTableSection();


// fields =  (7) ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]