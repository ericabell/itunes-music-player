/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

let url = 'https://itunes.apple.com/search?term=';

// everytime we do a search, put the JSON data here.
// index into the list is the id associated with each li in the list.
let searchResults = [];
// whatever track is currently playing, store the JSON here.
let currentTrack = {};

// Search field and the button
let searchTermInput = document.querySelector('#search-term-input');
let searchButton = document.querySelector('#search-button');

// Results div
let searchResultsDiv = document.querySelector('.results');
let searchResultsListing = document.querySelector('.results-listing');

// Music player
let musicPlayerSection = document.querySelector('.player');
let musicPlayer = document.querySelector('.music-player');
let albumArtwork = document.querySelector('.album-artwork');

searchButton.addEventListener('click', (event) => {
  // prevent the default
  event.preventDefault();

  // clear the div of results (so a previous search results disappear)
  searchResultsListing.innerHTML = '';

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
    searchResults = data.results;
    displayResults(data.results, 5);
  })
});

// temp function for building the list of results
function displayResults(dataResults, numberPerPage) {
  let ulForResults = document.createElement('ul');
  ulForResults.className = 'list_group';

  for(let i=0; i<numberPerPage; i++) {
    let liResult = document.createElement('li');
    liResult.className = 'list-group-item';
    liResult.id = i;
    let liResultText = document.createTextNode(dataResults[i].trackName);
    liResult.appendChild(liResultText);
    ulForResults.appendChild(liResult);
  }

  // append the ul to its parent
  searchResultsListing.appendChild(ulForResults);
}

// when we've got a url for the track, update the audio player
function updateAudioPlayerWithTrack(indexIntoSearchResults) {
  musicPlayer.src = searchResults[indexIntoSearchResults].previewUrl;
}

function updateAlbumArtwork(indexIntoSearchResults) {
  albumArtwork.src = searchResults[indexIntoSearchResults].artworkUrl100;
}

// event listener for click in the results list
searchResultsListing.addEventListener('click', (event) => {
  // user clicked somewhere in the list, we need to find the element they clicked on
  console.log(event.target.id);
  // show the player
  musicPlayerSection.classList.remove('hidden');
  // set the src of the audio tag to the preview audio url
  updateAudioPlayerWithTrack(event.target.id);
  updateAlbumArtwork(event.target.id)
})
