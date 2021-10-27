// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
const { info } = require('console');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const port = 8000;
// Setup Server
const server = app.listen(port, listening);

function listening() {
    console.log("server running");
    console.log(`running on localhost: {$port}`);
}

app.get('/getdata', function(req, res) {
    res.send(projectData);

});
app.post('/save', function(req, res) {
    projectData = { temperature: req.body.temp, date: req.body.date, user_response: req.body.userres };
});