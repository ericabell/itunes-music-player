// we should have access to the hash
// which contains the auth token

console.log(window.location.hash);

let accessToken = window.location.hash.substr(1).split('&')[0].split('=')[1];

// assemble a request using fetch

let getUserBasicURL = 'https://api.spotify.com/v1/me/';

fetch(getUserBasicURL, {
  method: 'get',
  headers: {
    'Authorization': 'Bearer ' + accessToken
  }
}).then( (response) => {
  return( response.json() );
}).then( (data) => {
  console.log(data);
});
