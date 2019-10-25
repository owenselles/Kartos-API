const { Router } = require('express');
const router = Router();

// Router: https://kartos.xyz/

router.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

router.get('/', (req, res) => {
	res.json({ status: 200 });
});

router.get('/invite', (req, res) => {
	res.json({ status: 200 });
});

router.get('/discord', (req, res) => {
	res.json({ status: 200 });
});

router.use((req, res) => res.send({ uwu: 'you are in the wrong part of town!' }));

module.exports = router;
