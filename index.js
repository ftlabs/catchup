const  dotenv = require('dotenv').config({ silent : process.env.NODE_ENVIRONMENT === 'production'  });
const   debug = require('debug')('catchup:index');
const express = require('express');
const    path = require('path');
var    exphbs = require('express-handlebars');

const     app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const fetchContent = require('./bin/lib/fetchContent');
const      catchup = require('./bin/lib/catchup');

const authS3O = require('s3o-middleware');

var requestLogger = function(req, res, next) {
    debug("RECEIVED REQUEST:", req.method, req.url);
    next(); // Passing the request to the next handler in the stack.
}

app.use(requestLogger);

// these routes do *not* have s3o

app.use('/static', express.static('static'));

app.get('/__gtg', (req, res) => {
	res.status(200).end();
});

const TOKEN = process.env.TOKEN;
if (! TOKEN ) {
  throw new Error('ERROR: TOKEN not specified in env');
}

app.get('/dummy', (req, res) => {
  res.json({ testing: "testing", 'one-two-three' : 'testing' });
});

// these route *do* use s3o
app.set('json spaces', 2);

if (process.env.BYPASS_SSO === 'true') {
  // do no sso
} else {
  app.use(authS3O);
}

app.get('/', (req, res) => {
	// res.sendFile(path.join(__dirname + '/static/index.html'));
  res.render('home', {});
});

app.get('/fetchBasic', (req, res) => {
	catchup.fetchBasic()
	.then( obj => res.json( obj ) );
});


//---

function startListening(){
	app.listen(process.env.PORT, function(){
		console.log('Server is listening on port', process.env.PORT);
	});
}

startListening();

//---
