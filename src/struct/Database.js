const { Firebase } = require('firestore-db');

const database = new Firebase({
	projectId: process.env.PROJECT_ID,
	clientEmail: process.env.CLIENT_EMAIL,
	privateKey: process.env.PRIVATE_KEY
});

class Database {
	static get firestore() {
		return database.firestore();
	}

	static get firebase() {
		return database.database();
	}
}

module.exports = Database;
