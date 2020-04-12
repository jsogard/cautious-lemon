const db = require('../lib/db');
const SQL = require('sql-template-strings');
const sha256 = require('sha256');

const isEmailInUse = async (email) => {
	const res = await db.query(SQL`
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

	await db.query(SQL`
		INSERT INTO Users (email, passwordHash, passwordSalt)
		VALUES (${user.email}, ${password}, ${salt})
		`);
	return await db.query(SQL`SELECT LAST_INSERT_ID() AS id`);
}

const getUsers = async ({email, ids}) => {

	const query = SQL`SELECT * FROM Users WHERE true `;

	if(email) {
		query.append(SQL`AND email = ${email} `);
	}

	if(ids) {
		query.append(SQL`AND userId IN (${ids}) `);
	}

	console.info(query);

	return await db.query(query);
}

export { isEmailInUse, insertUser, getUsers }