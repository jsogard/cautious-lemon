import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { insertUser, loginUser } from '../services/user';
import ErrorTip from './errortip'
import { formValidate } from '../utils/error';

export default function Login({setUserId}) {

	const [isSignup, setIsSignup] = useState(false);
	const [errors, setErrors] = useState({});

	const toggleSignup = () => setIsSignup(!isSignup);

	const handleSubmit = async (event) => {
		const form = event.currentTarget;

	    event.preventDefault();
		event.stopPropagation();

		if(validate() && form.checkValidity()) {
			const action = isSignup ? insertUser : loginUser;

			action({email: loginEmail.value, password: loginPassword.value})
				.then((user) => {
					setUserId(user.UserId);
				})
				.catch((e) => {
					setErrors(e);
				})
				
		} else {
			console.log('validation failed')
			console.dir(errors)
		}
	};

	const validate = () => {
		setErrors({});
		[loginEmail, loginPassword].forEach((formItem) => formValidate(setErrors, formItem))
		formValidate(setErrors, loginPassword, 'Password must be longer than 5 characters', 
			() => loginPassword.value.length >= 5)

		if(isSignup) {
			formValidate(setErrors, loginConfirm)
			formValidate(setErrors, loginConfirm, 'Password does not match', 
				() => loginConfirm.value == loginPassword.value)
		}

		return Object.keys(errors).length == 0;
	}


	return (
		<Row>
			<Col />
			<Col xs={4}>
				<Form noValidate onSubmit={handleSubmit} >
					<Form.Group controlId="loginEmail">
						<Form.Label>
							Email
							{ errors.loginEmail && <ErrorTip subject='loginEmail' messages={errors.loginEmail} /> }
						</Form.Label>
						<Form.Control required type="email" placeholder="Email" />
					</Form.Group>

					<Form.Group controlId="loginPassword">
						<Form.Label>
							Password
							{ errors.loginPassword && <ErrorTip subject='loginPassword' messages={errors.loginPassword} /> }
						</Form.Label>
						<Form.Control required type="password" placeholder="Password" />
					</Form.Group>

					{isSignup &&
						<Form.Group controlId="loginConfirm">
							<Form.Label>
								Confirm Password
								{ errors.loginConfirm && <ErrorTip subject='loginConfirm' messages={errors.loginConfirm} /> }
							</Form.Label>
							<Form.Control required type="password" placeholder="Confirm Password" />
						</Form.Group>
					}

					<Form.Text className="text-muted" onClick={() => toggleSignup()}>
						{ isSignup ? 'Log in' : 'Sign up' }
					</Form.Text>

					<Button variant="primary" type="submit" >
						Submit
					</Button>
				</Form>
			</Col>
			<Col />
			<style jsx>
			{`
				label svg {
					width: 1rem;
					margin-left: 1rem;
				}
			`}
			</style>
		</Row>
		
		);
}