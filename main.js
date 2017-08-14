/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

let url = 'https://itunes.apple.com/search?media=music&term=';

// everytime we do a search, put the JSON data here.
// index into the list is the id associated with each li in the list.
let searchResults = [];
let searchResultsIndexLow = 0;
let searchResultsIndexHigh = 5;
// whatever track is currently playing, store the JSON here.
let currentTrack = {};

// Search field and the button
let searchTermInput = document.querySelector('#search-term-input');
let searchButton = document.querySelector('#search-button');

// Results div
let searchResultsDiv = document.querySelector('.results');
let searchResultsListing = document.querySelector('.results-listing');

// Results Prev/Next button
let searchResultsPreviousPage = document.querySelector('#pager-previous');
let searchResultsNextPage = document.querySelector('#pager-next');

// Music player
let musicPlayerSection = document.querySelector('.player');
let musicPlayer = document.querySelector('.music-player');
let albumArtwork = document.querySelector('.album-artwork');

// Error popup for search string left blank
let searchStringLeftBlankAlert = `
  <div class="alert alert-danger alert-dismissible fade show hidden search-left-blank" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <strong>Oh snap!</strong> Search string left blank.
  </div>
`



// EVENT LISTENERS FOR BUTTONS ON OUR PAGE
searchButton.addEventListener('click', (event) => {
  // prevent the default
  event.preventDefault();

  // grab the text
  let searchString = searchTermInput.value;
  // the user needed to at least input something...
  if(searchString != '') {
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
      displayResults();
    })
  } else {  // user left search blank
    let searchAlert = document.querySelector('.search-left-blank');
    searchAlert.classList.remove('hidden');
  }
});

searchResultsPreviousPage.addEventListener('click', (event) => {
  console.log('user clicked previous');
  // can we subtract 5 from searchResultsIndexLow and be greater than 0
  if( searchResultsIndexLow-5 >= 0 ) {
    searchResultsIndexLow -=5;
    searchResultsIndexHigh -=5;
  }
  displayResults();
})

searchResultsNextPage.addEventListener('click', (event) => {
  if( searchResultsIndexHigh+5 < searchResults.length ) {
    searchResultsIndexLow +=5;
    searchResultsIndexHigh +=5;
  }
  displayResults();
})

// event listener for click in the results list
searchResultsListing.addEventListener('click', (event) => {
  // user clicked somewhere in the list, we need to find the element they clicked on
  console.log(event);
  console.log(`Target id: ${event.path[0].id}`);
  // show the player
  musicPlayerSection.classList.remove('hidden');
  // set the src of the audio tag to the preview audio url
  updateAudioPlayerWithTrack(event.target.id);
  updateAlbumArtwork(event.target.id)
})

// END EVENT LISTENERS

// temp function for building the list of results
function displayResults() {
  // clear the div of results (so a previous search results disappear)
  searchResultsListing.innerHTML = '';



  // loop through some of the results, and build up the cards
  for( let i=searchResultsIndexLow; i<searchResultsIndexHigh; i++ ) {
    let cardHTML = `
      <div class="card" style="width: 20rem;">
        <img class="" src="" alt="">
          <div class="card-block">
            <h4 class="card-title">${searchResults[i].trackName}</h4>
            <p class="card_text">Some quick example text</p>
          </div>
      </div>
    `
    searchResultsListing.innerHTML += cardHTML;
  }

  // for(let i=searchResultsIndexLow; i<searchResultsIndexHigh; i++) {
  //   let liResult = `
  //     <li class="list-group-item" id=${i}>
  //       <div id=${i}>
  //         ${searchResults[i].trackName}
  //       </div>
  //       <div id=${i}>
  //         ${convertMillisecondsToMinutesAndSeconds(searchResults[i].trackTimeMillis)}
  //       </div>
  //     </li>
  //   `
  //   ulForResults.innerHTML += liResult;
  // }

  // append the ul to its parent

}

// when we've got a url for the track, update the audio player
function updateAudioPlayerWithTrack(indexIntoSearchResults) {
  musicPlayer.src = searchResults[indexIntoSearchResults].previewUrl;
}

function updateAlbumArtwork(indexIntoSearchResults) {
  albumArtwork.src = searchResults[indexIntoSearchResults].artworkUrl100;
}

// UTILITY FUNCTIONS
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function convertMillisecondsToMinutesAndSeconds(milliSec) {
  let totalSeconds = Math.floor(milliSec/1000);
  let minutes = Math.floor(totalSeconds/60);
  let seconds = pad(totalSeconds - minutes*60, 2);

  return `${minutes}:${seconds}`;
}
