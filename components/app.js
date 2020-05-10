import Login from '../components/login'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import TitleCard from './titleCard';
import Link from 'next/link'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUserCircle, faHammer, faBookOpen, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(fab, faUserCircle, faHammer, faBookOpen, faPlusCircle)

export default function App({ children }) {

    const [userId, setUserId] = useState(null);
    const [navs, setNavs] = useState([]);
    
    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
        setNavs([
            {
                linkText: 'My Profile',
                href: '/profile',
                icon: 'user-circle'
            },
            {
                linkText: 'Start New Project',
                href: '/',
                icon: 'plus-circle'
            },
            {
                linkText: 'My Projects',
                href: '/',
                icon: 'hammer'
            },
            {
                linkText: 'Browse Projects',
                href: '/',
                icon: 'book-open'
            }
        ])
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
                    { navs.map(nav => 
                        <Link href={ nav.href } key={ nav.linkText } >
                            <div class='side-nav' >
                                <FontAwesomeIcon icon={ nav.icon } size="md" />
                                <span>{ nav.linkText }</span>
                            </div>
                        </Link> )}
                    
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
