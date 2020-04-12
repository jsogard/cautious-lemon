import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

export default function Login(props) {

	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [validated, setValidated] = useState(false);
	const [isSignup, setIsSignup] = useState(true);

	const handleSubmit = async (event) => {
	    const form = event.currentTarget;
	    if (form.checkValidity() === false || true) {
			event.preventDefault();
			event.stopPropagation();
	    }

	    if(isSignup) {
	    	if(validateSignup()) {
    			let id = null;
	    		await fetch('/api/users', 
	    			{
	    				method: 'POST',
	    				headers: { 'Content-Type': 'application/json' },
	    				body: JSON.stringify({email, password})
	    			})
	    			.then((res) => res.json())
	    			.then((data) => {
	    				console.dir(data);
	    				id = data[0].id;
	    			})
	    			.catch((e) => {
	    				console.error(e);
	    			})
    			if(id !== null) {
    				props.setUserId(id);
    			}
	    	}
	    }

	  };

	const validateSignup = () => {
		return password !== null &&
			confirmPassword !== null &&
			email !== null &&
			password == confirmPassword;
	}


	return (
		<Row>
			<Col />
			<Col xs={4}>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Group controlId="formEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
					</Form.Group>

					<Form.Group controlId="formPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
					</Form.Group>

					{isSignup ? 
						<Form.Group controlId="formConfirmPassword">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
						</Form.Group>
						: null
					}

					<Button variant="primary" type="submit" >
						Submit
					</Button>
				</Form>
			</Col>
			<Col />
		</Row>
		
		);
}