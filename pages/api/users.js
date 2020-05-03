import { isEmailInUse, insertUser, getUsers } from '../../queries/user.js'
import { addError } from '../../utils/error'

const validateUser = async ({email, password}) => {

	const res = {
		valid: true,
		messages: [],
		errors: {}
	};

	if(!email?.match(/(\w+)@(\w+\.\w+)/)) {
		res.valid = false;
		addError(res.errors, 'email', 'Invalid email');
	}

	if(email.length >= 75) {
		res.valid = false;
		addError(res.errors, 'email', 'Too long');
	}

	if(!password?.match(/\S{5,}/)) {
		res.valid = false;
		addError(res.errors, 'password', 'Too short');
	}

	if(!res.valid) return res;

	
	if(await isEmailInUse(email)) {
		res.valid = false;
		addError(res.errors, 'email', 'Email already in use');
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