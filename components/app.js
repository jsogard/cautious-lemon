import Login from '../components/login'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import TitleCard from './titleCard';

export default function App({ children }) {

    const [userId, setUserId] = useState(null);
    
    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
    }, []);
    
    const logOut = () => {
        localStorage.removeItem('userId');
        setUserId(null);
    }

	const getContent = () => {
        
		if(userId === null) {
			return (<Login setUserId={setUserId} />);
		}
		return (
            <div id='app'>
                <div id='sidebar'>
                    <TitleCard />    
                </div> 
                <div>
                    <div id='header'>
                        <span id='title-text' >Some kinda title text...</span>
                        <span id='log-out' class='secondary-click' onClick={ () => logOut() } > Log Out </span>
                    </div>
                    
                    <div id='content'>{children}</div>
                </div>
            </div>);
	}

	return (
		<div>
			<Head>
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
				<link href="https://fonts.googleapis.com/css2?family=Lobster&family=Playfair+Display:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
			</Head>
            { getContent() }
	    </div>
	);
};
