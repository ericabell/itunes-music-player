/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

let url = 'https://itunes.apple.com/search?term=';

// Search field and the button
let searchTermInput = document.querySelector('#search-term-input');
let searchButton = document.querySelector('#search-button');

// Results div
let searchResultsDiv = document.querySelector('.results');

searchButton.addEventListener('click', (event) => {
  // prevent the default
  event.preventDefault();

  // grab the text
  let searchString = searchTermInput.value;
  console.log(`Searched for: ${searchString}`);

  // construct the API call to get search results
  let apiURLSearchString = url + encodeURIComponent(searchString);
  console.log(apiURLSearchString);

  // use fetch to send the request
  fetch(apiURLSearchString)
  .then( (response) => {
    return( response.json() )
  })
  .then( (data) => {
    console.log(data);
    displayResults(data.results);
  })
});

// temp function for building the list of results
function displayResults(dataResults) {
  let ulForResults = document.createElement('ul');
  ulForResults.className = 'list_group';
  
  dataResults.forEach( (result) => {
    let liResult = document.createElement('li');
    liResult.className = 'list-group-item';
    let liResultText = document.createTextNode(result.trackName);
    liResult.appendChild(liResultText);
    ulForResults.appendChild(liResult);
  });

  // append the ul to its parent
  searchResultsDiv.appendChild(ulForResults);
}
