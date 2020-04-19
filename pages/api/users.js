import { isEmailInUse, insertUser, getUsers } from '../../queries/user.js'
import { addError } from '../../utils/error'

const validateUser = async (user) => {

	const res = {
		valid: true,
		messages: [],
		errors: {}
	};

	if(!user.email?.match(/(\w+)@(\w+\.\w+)/)) {
		res.valid = false;
		addError(res.errors, 'loginEmail', 'Email format invalid');
	}

	if(user.email.length >= 75) {
		res.valid = false;
		addError(res.errors, 'loginEmail', 'Email must be shorter than 75 characters');
	}

	if(!user.password?.match(/\S{5,}/)) {
		res.valid = false;
		addError(res.errors, 'loginPassword', 'Password must be longer than 5 characters');
	}

	if(!res.valid) return res;

	if(await isEmailInUse(user.email)) {
		res.valid = false;
		addError(res.errors, 'loginEmail', 'Email already in use');
	}

	return res;
}

export default async (req, res) => {

	switch(req.method) {
		case 'POST':
			const val = await validateUser(req.body);
			if(val.valid) {
				res.status(201).json(await insertUser(req.body));
			} else {
				res.status(400).json({ errors: val.errors });
			}
			break;
		case 'GET':
			console.info(await getUsers(req.query));
			res.status(200).json(await getUsers(req.query));
			break;
	}
};