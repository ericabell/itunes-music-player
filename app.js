const express = require('express');

let app = express();

app.use(express.static('public'));

app.get('/', (req,res) => {
  console.log('Root hit');
  res.sendFile('index.html', options, (err) => {
    if(err) {
      console.log('Error: ' + err);
    } else {
      console.log('Sent: ', 'index.html');
    }
  })
});

app.get('/spotify-authenticate', (req,res) => {
  let spotifyClientID = process.env['SPOTIFY_CLIENT'];
  let url = 'https://accounts.spotify.com/authorize?client_id=' + spotifyClientID + '&response_type=token&redirect_uri=http://localhost:3000/login&show_dialog=true'

  res.redirect(301, url);
})

app.get('/login', (req,res) => {
  console.log('login hit');
  let options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  res.sendFile('login.html', options, (err) => {
    if(err) {
      next(err);
    } else {
      console.log('Sent: ', 'login.html');
    }
  });
})

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
