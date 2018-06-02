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
var $loadPrevBtn = document.querySelector("#prev-btn");

// Set a startingIndex and resultsPerPage variable
var startingIndex = 0;
var resultsPerPage=50;

// Set filteredData to dataSet initially
// BRINGS ALL DATA ONTO PAGE
var filteredData = dataSet;

// Add an event listener to the searchBtn, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Add an event listener to the loadMoreBtn, call handleNextButtonClick when clicked
$loadMoreBtn.addEventListener("click", handleNextButtonClick);

$loadPrevBtn.addEventListener("click", handlePrevButtonClick);

// Render 50 results at a time
function renderTableSection() {
  $tbody.innerHTML = "";
  var endingIndex = startingIndex + resultsPerPage;
  var dataSubset = filteredData.slice(startingIndex, endingIndex);
  for (var i=0; i<dataSubset.length; i++) {
    var currentData = dataSubset[i];
    var fields = Object.keys(currentData);
    // var $row = $tbody.insertRow(i + startingIndex);
    var $row = $tbody.insertRow(i);
    for (var j=0; j<fields.length; j++) {
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = currentData[field];
    }
  }
  console.log("tableStartingIndex = ", startingIndex);
  console.log("tableEndingIndex = ", endingIndex);
  console.log("tableFilteredDataLength = ", filteredData.length)
  // Removes functionality from loadMoreBtn if there is no more data to load
  if (endingIndex >= filteredData.length) {
    $loadMoreBtn.removeEventListener("click", handleNextButtonClick);
    $loadMoreBtn.classList.add("disabled");
  }
  // Removes functionality from loadPrevBtn if there is no previous data
  if (startingIndex < resultsPerPage) {
    $loadPrevBtn.removeEventListener("click", handlePrevButtonClick);
    $loadPrevBtn.classList.add("disabled");
  }

  // Check to see if the more button needs to have an event listener re-added and disabled status removed
  if (startingIndex + resultsPerPage < filteredData.length) {
    $loadMoreBtn.addEventListener("click", handleNextButtonClick);
    $loadMoreBtn.classList.remove("disabled");
  }
  // Check to see if the previous button needs to have an event listener re-added and disabled status removed
  if (startingIndex >= resultsPerPage) {
    $loadPrevBtn.addEventListener("click", handlePrevButtonClick);
    $loadPrevBtn.classList.remove("disabled");
  }
}

function handleNextButtonClick() {
  startingIndex += resultsPerPage;
  console.log("pageButtonStartingIndex = ", startingIndex);
  renderTableSection();
}

function handlePrevButtonClick() {
  // go back a page
  startingIndex -= resultsPerPage;
  renderTableSection();
}
function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDate = $dateInput.value.trim();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();
  var filterDurationMinutes = $durationMinutesInput.value.trim().toLowerCase();

  // Reset startingIndex to 0 when search button is clicked (clicking the next page button no longer affects future searches)
  startingIndex = 0

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
  console.log("searchButtonStartingIndex = ", startingIndex)
  // console.log("searchButtonFilteredData = ", filteredData);
  console.log("searchButtonFilteredDataLength = ", filteredData.length);
  renderTableSection();
}

// Render the table for the first time on page load
renderTableSection();


//console.log(fields): fields =  (7) ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]