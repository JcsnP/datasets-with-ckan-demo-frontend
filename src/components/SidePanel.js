import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookmark, faRightFromBracket, faCircleUp } from '@fortawesome/free-solid-svg-icons';

// import style
import '../App.css';
// import components
import CreateInitialDatasetsModal from './Datasets/CreateInitialDatasetsModal.js';

export default function SidePanel({show, close}) {
	const logout = () => {
		localStorage.clear();
		window.location.replace('/');
	}

	return(
		<Offcanvas show={show} onHide={close} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Account</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <a href={`/profile/${localStorage.getItem('username')}`} className='d-flex w-100 py-2 underline-hover pointer text-decoration-none text-dark'>
					<FontAwesomeIcon icon={faUser} size="lg" />
        	<h6 className='ms-3 fw-normal'>Your Profile</h6>
        </a>
        <a href={`/profile/${localStorage.getItem('username')}/#bookmarked`} className='d-flex w-100 py-2 underline-hover pointer text-decoration-none text-dark'>
        	<FontAwesomeIcon icon={faBookmark} size="lg" />
        	<h6 className='ms-3 fw-normal'>Bookmarked</h6>
        </a>
        <a href='/' className='d-flex w-100 py-2 underline-hover pointer text-decoration-none text-dark' onClick={logout}>
        	<FontAwesomeIcon icon={faRightFromBracket} size="lg" />
        	<h6 className='ms-3 fw-normal'>Logout</h6>
        </a>
      </Offcanvas.Body>
    </Offcanvas>
	);
}