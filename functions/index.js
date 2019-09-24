const functions = require('firebase-functions');
const express = require('express');
const roasts = require('./resources/roasts');
const yomama = require('./resources/yomama');
const firebase = require('firebase-admin');
const app = express();
const { token } = require('./kartos.json');
const auth = require('./kartos.json');

const firebaseApp = firebase.initializeApp({
    credential: firebase.credential.cert(auth),
    databaseURL: "https://kartos.firebaseio.com"
});

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/dblwebhook', (req, res) => {
    res.json({ method: 'GET', status: 200 });
});

app.post('/dblwebhook', (req, res) => {
    console.log(req.body);
    firebaseApp.database().ref(`votes/${Date.now()}`).update(req.body, error => {});
    res.json({ method: 'POST', status: 200 });
});

app.get('/roasts', (req, res) => {
    if (req.query.token === token || req.headers.token === token) {
        return res.json(roasts[Math.floor(Math.random() * roasts.length)]);
    }
    return res.status(403).json({ status: 403, message: 'api key is invalid' });
});

app.get('/yomama', (req, res) => {
    if (req.query.token === token || req.headers.token === token) {
        return res.json(yomama[Math.floor(Math.random() * yomama.length)]);
    }
    return res.status(403).json({ status: 403, message: 'api key is invalid' });
});

exports.app = functions.https.onRequest(app);
