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

searchButton.addEventListener('click', (event) => {
  // prevent the default
  event.preventDefault();

  // grab the text
  let searchString = searchTermInput.value;
  console.log(`Searched for: ${searchString}`);

  // construct the API call to get search results
  let apiURLSearchString = url + encodeURIComponent(searchString);
  console.log(apiURLSearchString);
});
