// requires all modules
var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express(); // makes an express app


app.set('views', path.resolve(__dirname, 'views')); // views are in views folder
app.set('view engine', 'ejs');  // views engine


var entries = [];
app.locals.entries = entries; // makes the entries array available in all views

app.use(logger('dev')); // logs all requests to the console using morgan
app.use(bodyParser.urlencoded({ extended: false })); // poplulates a variable called req.body if the user is submitting a form

app.get('/', function(req, res) {
    res.render('index'); // when visiting the site root renders the homepage at views/index.ejs 
    });
app.get('/new-entry', function(req, res) {
    res.render('new-entry'); // when visiting /new-entry renders the new-entry form at views/new-entry.ejs
    });
app.post('/new-entry', function(req, res) {
    if (!req.body.title || !req.body.body) { // if the user submits the form without a title or body
        res.status(400).send('Entries must have a title and a body.');
        return;
    }
    entries.push({
        title: req.body.title, // adds the new entry to the entries array
        body: req.body.body,
        published: new Date()
    });
    res.redirect('/'); // when submitting the form redirects to the homepage
    });
app.use(function(req, res) {
    res.status(404).render('404'); // if the user visits a page that doesn't exist renders the 404 page at views/404.ejs
    });
http.createServer(app).listen(3000, function() {
    console.log('Guestbook app started on port 3000.'); // starts the server on port 3000
    });