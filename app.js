const express = require('express');
const request = require('request');

let app = express();

app.get('/', (req,res) => {
  let spotifyClientID = process.env['SPOTIFY_CLIENT'];
  let url = 'https://accounts.spotify.com/authorize?client_id=' + spotifyClientID + '&response_type=token&redirect_uri=http://localhost/login&show_dialog=true'

  request( url, (error, response, body) => {
    console.log('err:', error);
    console.log('statusCode:', response.statusCode);
    // console.log('response:', response);
    // console.log('body:', body);
  });
  res.send('Spotify Authentication Flow');
})

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
