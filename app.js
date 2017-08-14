const express = require('express');
const request = require('request');

let app = express();

app.get('/', (req,res) => {
  
  res.send('Spotify Authentication Flow');
})

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
