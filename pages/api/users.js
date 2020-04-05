const db = require('../../lib/db');
const escp = require('sql-template-strings')
const sha256 = require('sha256');

const validateUser = async (user) => {

	const res = {
		valid: true,
		messages: []
	};

	if(!user.email?.match(/(\w+)@(\w+\.\w+)/)) {
		res.valid = false;
		res.messages.push('Email format not valid');
	}

	if(user.email.length >= 75) {
		res.valid = false;
		res.messages.push('Email is too long');
	}

	if(!user.password?.match(/\S{5,}/)) {
		res.valid = false;
		res.messages.push('Password is too short');
	}

	if(!res.valid) return res;
	
	const userResult = await db.query(escp`
		SELECT email
		FROM Users
		WHERE email = ${user.email}
		`);

	if(userResult?.error) {
		console.error(userResult);
		return { valid: false };
	}

	if(userResult.length != 0) {
		res.valid = false;
		res.messages.push('Email address is already used');
	}

	console.info('User validated');
	return res;
}

const insertUser = async (user) => {

	let salt = sha256(user.email);
	let password = sha256(user.password + salt);

	await db.query(escp`
		INSERT INTO Users (email, passwordHash, passwordSalt)
		VALUES (${user.email}, ${password}, ${salt})
		`);

	console.info('User inserted');
}


export default async (req, res) => {

	switch(req.method) {
		case 'POST':
			const userBody = req.body;
			const val = await validateUser(userBody);
			if(val.valid) {
				insertUser(userBody);
				res.status(201).json();
			} else {
				res.status(400).json({ errors: val.messages });
			}
	}
};