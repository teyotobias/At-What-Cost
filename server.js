const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

require('dotenv').config();

//connect to db
require('./config/database');
   
const app = express();
   
app.use(logger('dev'));
app.use(express.json());

 // Configure both serve-favicon & static middleware
 // to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
// Serve static files from the build directory (probably for your React or other frontend framework build)
app.use(express.static(path.join(__dirname, 'build')));

// Serve static files from the public directory
app.use('/public', express.static(path.join(__dirname, 'public')));
// Middleware to verify token and assign user object of payload to req.user.
app.use(require('./config/checkToken'));

const port = process.env.PORT || 3001;

 // Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));

//protect api routes from anon users:
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/items', ensureLoggedIn, require('./routes/api/items'));
 //The following "catch all" route * is necessary
 // to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during
 // development to avoid collision with React's dev server
app.listen(port, function() {
   console.log(`Express app running on port ${port}`)
});