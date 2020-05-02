

const insertUser = async ({email, password}) => {
	let user = null;
	let errors = null;
	console.dir({email,password});

	await fetch('/api/users', 
		{
			method: 'POST',
			headers: { ['Content-Type']: 'application/json' },
			body: JSON.stringify({ email, password })
		})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if(data.errors) {
				throw data.errors;
			}
			user = data;
		})
		.catch((e) => {
			console.error(e);
			errors = e;
		})
	if(user !== null) {
		return user;
	}
	else {
		throw errors;
	}
};

const loginUser = async ({email, password}) => {

	let user = null;
	let errors = null;

	await fetch('/api/login',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		})
		.then((res) => res.json())
		.then((data) => {
			if(data.errors) {
				throw data.errors;
			}
			user = data;
		})
		.catch((e) => {
			errors = e;
		})
	
	if(user !== null) {
		return user;
	}
	else {
		throw errors;
	}
};


export { insertUser, loginUser }