const db = require('../../../lib/db');
const escp = require('sql-template-strings');
const sha256 = require('sha256');

const isEmailInUse = async (email) => {
	const res = await db.query(escp`
		SELECT email
		FROM Users
		WHERE email = ${email}
		`);

	if(res?.error) {
		throw res.error;
	}

	return res.length > 0;
}

const insertUser = async (user) => {

	const salt = sha256(user.email);
	const password = sha256(user.password + salt);

	const res = await db.query(escp`
		INSERT INTO Users (email, passwordHash, passwordSalt)
		VALUES (${user.email}, ${password}, ${salt})
		`);
}

export { isEmailInUse, insertUser }