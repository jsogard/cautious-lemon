

const insertUser = async ({email, password}) => {
	let user = null;
	let errors = null;
	await fetch('/api/users', 
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		})
		.then((res) => res.json())
		.then((data) => {
			console.dir(data);
			if(data.errors) {
				throw data.errors;
			}
			user = data[0];
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
}


export { insertUser }