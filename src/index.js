require('dotenv').config();
const express = require('express');
const app = express();
const api = require('./api/api');
const home = require('./home/home');
const { createServer } = require('https');
const bodyParser = require('body-parser');

const ssl = {
	key: process.env.SSL_PRIVATE_KEY.replace(/\\n/g, '\n'),
	cert: process.env.SSL_CERTIFICATE.replace(/\\n/g, '\n')
};

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(bodyParser.json());

// router for /api path
app.use('/api', api);

// router for / path
app.use('/', home);

createServer(ssl, app).listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
