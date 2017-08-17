const express = require('express');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const port = 3000;

let todo = [
  "Wash the car",
  "Touch the frog"
 ];

let completed = [
  "Buy groceries"
];

// Create app
const app = express();

// set engine/views
app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

//Set app to use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// render the page with index/todo data
app.get('/', function(req, res){
 res.render('index', { todo: todo, completed: completed });
})

// post data to todo array
app.post('/', function(req, res){
 todo.push(req.body.todo);
 res.redirect('/');
});

// /complete leads it to the completed section...
// otherwise it will post to the todo listen
// completed.push pushes the array content
// todo.pop pulls out the old value
app.post('/complete', function(req, res){
    completed.push(req.body.complete);
    todo.pop(this);
    res.redirect('/');
});

// listen for port 3000
app.listen(port, function(req, res){
 console.log('Starting to-do list app...');
})
