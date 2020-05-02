import { addError } from '../../utils/error'
import { getUsers } from '../../queries/user'
const sha256 = require('sha256');


const checkLogin = async ({ email, password }) => {

    const res = {
        valid: true,
        messages: [],
        errors: {},
        data: null
    }

    const users = await getUsers({ email })

    if(users == null || users.length == 0) {
        res.valid = false;
        addError(res.errors, 'loginEmail', 'Email not recognized');
        return res;
    }

    const user = users[0];

    if(sha256(password + user.PasswordSalt)  != user.PasswordHash) {
        res.valid = false
        addError(res.errors, 'loginPassword', 'Password is wrong');
        return res;
    }

    res.data = user;
    return res;
}

export default async (req, res) => {

	switch(req.method) {
		case 'POST':
            const val = await checkLogin(req.body)
			if(val.valid) {
				res.status(200).json(val.data);
			} else {
				res.status(400).json({ errors: val.errors });
			}
			break;
	}
};