// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $durationMinutesInput = document.querySelector("#durationMinutes");
var $searchBtn = document.querySelector("#search");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredData to dataSet initially
// BRINGS ALL DATA ONTO PAGE
var filteredData = dataSet;

// renderTable renders the filteredData to the tbody
// THIS is where I will likely specify how many results per page
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredData.length; i++) {
    // Get the current data object and its fields
    var currentData = filteredData[i];
    var fields = Object.keys(currentData);
    // console.log("fields = ", fields)
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the data object, create a new cell at set its inner text to be the current value at the current data's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = currentData[field];
    }
  }
}
// TEST function to render only 50 results per page
// function render1stTable() {
//     $tbody.innerHTML = "";
//     for (var i = 0; i < 49; i++) {
//       // Get the current data object and its fields
//       var currentData = filteredData[i];
//       var fields = Object.keys(currentData);
//       // console.log("fields = ", fields)
//       // Create a new row in the tbody, set the index to be i + startingIndex
//       var $row = $tbody.insertRow(i);
//       for (var j = 0; j < fields.length; j++) {
//         // For every field in the data object, create a new cell at set its inner text to be the current value at the current data's field
//         var field = fields[j];
//         var $cell = $row.insertCell(j);
//         $cell.innerText = currentData[field];
//       }
//     }
//   }

// function render2ndTable() {
//   $tbody.innerHTML = "";
//   for (var i = 49; i >= 49 && i<99; i++) {
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


function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  if ($dateInput) {
    var filterDate = $dateInput.value.trim();}
  if ($cityInput) {
    var filterCity = $cityInput.value.trim().toLowerCase();}
  if ($stateInput) {
    var filterState = $stateInput.value.trim().toLowerCase();}
  if ($countryInput) {
    var filterCountry = $countryInput.value.trim().toLowerCase();}
  if ($shapeInput) {
    var filterShape = $shapeInput.value.trim().toLowerCase();}
  if ($durationMinutesInput) {
    var filterDurationMinutes = $durationMinutesInput.value.trim().toLowerCase();}
//   console.log("filterDate = ", filterDate)

  // Set filteredData to an array of all current data whose "state" matches the filter
  filteredData = dataSet.filter(function(currentData) {
    var dataDate = currentData.datetime;
    var dataCity = currentData.city.toLowerCase();
    var dataState = currentData.state.toLowerCase();
    var dataCountry = currentData.country.toLowerCase();
    var dataShape = currentData.shape.toLowerCase();
    var dataDurationMinutes = String(currentData.durationMinutes).toLowerCase();
    // console.log("dataDate = ", dataDate)

    // If one form is blank, just search using the filter given.  If both forms are used, search using both
    // empty strings return false, non-empty strings return true
    // if (filterDate === "") {
    //     return dataState === filterState}
    // else if (filterState === "") {
    //     return dataDate === filterDate}
    // else {
    //     return dataState === filterState && dataDate === filterDate;}

    var datastuff = [dataDate,
        dataCity,
        dataState,
        dataCountry,
        dataShape]
    var filterstuff = [filterDate,
        filterCity,
        filterState,
        filterCountry,
        filterShape]
    var myFilteredData;

        for (var i = 0 ; i< datastuff.length; i++){
            if(filterstuff[i] ){
            return datastuff[i]
            }
        }


    if (filterDate && filterState) {
        return dataDate === filterDate && dataState === filterState;}
    else if (filterDate) {
        return dataDate === filterDate}
    else {
        return dataState === filterState;}
  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();


// fields =  (7) ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]