import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { insertUser, loginUser } from '../services/user';
import { Formik, Form, Field } from 'formik';
import InputField from './field';
import TitleCard from './titleCard'
import * as Yup from 'yup';
import '../pages/_login.less'
import '../pages/_styles.less'

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

	const toggleSignup = () => setIsSignup(!isSignup);

	const handleSubmit = async (values, { setStatus, setSubmitting }) => {
	    event.preventDefault();
		event.stopPropagation();

		const action = isSignup ? insertUser : loginUser;

		await action({email: values.email, password: values.password})
			.then((user) => {
				localStorage.setItem('userId', user.UserId);
				setUserId(user.UserId);
			})
			.catch((e) => {
				setStatus(e);
			});

		setSubmitting(false);			
	};

	return (
		<Row>
			<Col>
				<Formik 
					initialValues={ { email: '', password: '' } }
					validationSchema={ isSignup ? SignupSchema : LoginSchema }
					onSubmit={ handleSubmit }
					>
						{({ errors, status, touched, isSubmitting }) => 
						(
							<Form noValidate>

								<TitleCard />

								<Field type='email' name='email' placeholder='user@email.com' label='Email' component={InputField} />
								<Field type='password' name='password' placeholder='* * * * *' label='Password' component={InputField} />
								
								{isSignup && (
									<Field type='password' name='confirm' placeholder='* * * * *' label='Confirm Password' component={InputField} />
								)}

								<div id='controls'>
									<button type="submit" disabled={ isSubmitting } >
										{ isSubmitting ? <img src='/spinner.svg' /> : 'Submit'}
									</button>
									<span className='secondary-click' onClick={ () => toggleSignup() }>{ isSignup ? 'Log In' : 'Sign Up' }</span>
								</div>
							</Form>
						)}
					</Formik>
			</Col>
		</Row>
		
		);
}