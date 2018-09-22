const path = require('path'); // this modules is already installed with node js and it resolve the paths of folders (watch the examples)
const express = require('express');

const publicPath = path.join(__dirname, '/../public');
//console.log(__dirname+'/../public'); // example
//console.log(publicPath);            // example

var app = express();
app.use(express.static(publicPath));

var port = 3000 || process.env.PORT;



app.listen(port, () => {
  console.log('Server Listening on port 3000');
});
