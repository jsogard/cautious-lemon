import Login from '../components/login'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import TitleCard from './titleCard';
import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUserCircle, faHammer, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(fab, faUserCircle, faHammer, faBookOpen)

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
                    <div class='side-nav'>
                        <FontAwesomeIcon icon='user-circle' size="md" />
                        <span>Profile</span>
                    </div>
                    <div class='side-nav'>
                        <FontAwesomeIcon icon='hammer' size="md" />
                        <span>My Projects</span>
                    </div>
                    <div class='side-nav'>
                        <FontAwesomeIcon icon='book-open' size="md" />
                        <span>Browse Projects</span>
                    </div>
                </div> 
                <div>
                    <div id='header'>
                        <span id='title-text' >Some kinda title text...</span>
                        <span id='log-out' className='secondary-click' onClick={ () => logOut() } > Log Out </span>
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
