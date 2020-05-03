import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { insertUser, loginUser } from '../services/user';
import { Formik, Form, Field } from 'formik';
import InputField from './field';
import * as Yup from 'yup';
import '../pages/_login.less'

const SignupSchema = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email')
		.required('Required'),
	password: Yup.string()
		.min(5, 'Too short')
		.required('Required'),
	confirm: Yup.string()
		.test(
			'matches-password',
			'Doesn\'t match password',
			function (value) {
				return this.parent.password == value;
			}
		)
});

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email')
		.required('Required'),
	password: Yup.string()
		.min(5, 'Too short')
		.required('Required')
});

export default function Login({setUserId}) {

	const [isSignup, setIsSignup] = useState(false);
	const [errors, setErrors] = useState({});

	const toggleSignup = () => setIsSignup(!isSignup);

	const handleSubmit = async (values, { setSubmitting }) => {
	    event.preventDefault();
		event.stopPropagation();

		const action = isSignup ? insertUser : loginUser;

		await action({email: values.email, password: values.password})
			.then((user) => {
				setUserId(user.UserId);
			})
			.catch((e) => {
				console.error(e);
				setErrors(e);
			})

		setSubmitting(false);			
	};

	return (
		<Row>
			<Col />
			<Col sm={4}>
				<Formik 
					initialValues={ { email: '', password: '' } }
					validationSchema={ isSignup ? SignupSchema : LoginSchema }
					onSubmit={ handleSubmit }
					>
						{({ errors, touched, isSubmitting }) => 
						(
							<Form noValidate>
								<Field type='email' name='email' placeholder='user@email.com' label='Email' component={InputField} required />
								<Field type='password' name='password' placeholder='*****' label='Password' component={InputField} required />
								
								{isSignup && (
									<Field type='password' name='confirm' placeholder='*****' label='Confirm password' component={InputField} required />
								)}

								<button type="submit" disabled={ isSubmitting } >
									Submit
								</button>

								<span class='click' onClick={ () => toggleSignup() }>{ isSignup ? 'Log In' : 'Sign Up' }</span>
							</Form>
						)}
					</Formik>
			</Col>
			<Col />
		</Row>
		
		);
}