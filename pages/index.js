import Login from '../components/login'
import Head from 'next/head'
import { Container, Row, Col } from 'react-bootstrap'
import React, { useState } from 'react'


export default function Index() {

	const [userId, setUserId] = useState(null);

	const getContent = () => {
		if(userId === null) {
			return (<Login setUserId={setUserId} />);
		}
		return (<p> on root </p>);
	}

	return (
		<div>
			<Head>
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
				<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
			</Head>
		<Container>
			{getContent()}
		</Container>
	</div>
	);
};