const { Router } = require('express');
const router = Router();
const { firebase } = require('../struct/Database');

// Router: https://kartos.xyz/api/

router.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

router.get('/', (req, res) => {
	res.json({ status: 200 });
});

router.get('/dblwebhook', (req, res) => {
	console.log();
	return res.json({ status: 200 });
});

router.post('/dblwebhook', async (req, res) => {
	console.log(req.body);
	if (req.headers.authorization === process.env.DBL_TOKEN && req.body.type === 'upvote') {
		await firebase.ref('votes').child(Date.now()).update(Object.assign(req.body));
		return res.json({ status: 200 });
	}

	return res.status(403).json({ status: 403 });
});

router.use((req, res) => res.send({ uwu: 'you are in the wrong part of town!' }));

module.exports = router;
