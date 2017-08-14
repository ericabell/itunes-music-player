// small node program to authenticate and get some data from Spotify apiURLSearchString

let request = require('request');

let spotifyClientID = process.env['SPOTIFY_CLIENT'];

let url = 'https://accounts.spotify.com/authorize?client_id=' + spotifyClientID + '&response_type=token&redirect_uri=http://localhost/login&show_dialog=true'

request( url, (error, response, body) => {
  console.log('err:', error);
  console.log('statusCode:', response.statusCode);
  // console.log('response:', response);
  // console.log('body:', body);
})
