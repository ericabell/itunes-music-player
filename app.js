const express = require('express');
const request = require('request');
const url = require('url');

let app = express();

app.get('/', (req,res) => {
  let spotifyClientID = process.env['SPOTIFY_CLIENT'];
  let url = 'https://accounts.spotify.com/authorize?client_id=' + spotifyClientID + '&response_type=token&redirect_uri=http://localhost:3000/login&show_dialog=true'

  res.redirect(301, url);
});

app.get('/login', (req,res) => {
  // we should be able to grab the auth token from the url
  let url_parts = url.parse(req.url, true);
  console.log(url_parts);

  res.sendStatus(200);
})

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
