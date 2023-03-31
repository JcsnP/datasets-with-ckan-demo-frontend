import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// import components
import SidePanel from './SidePanel.js';

export default function TheNavbar() {
	const [show, setShow] = useState(false);
	return(
			<Navbar bg="light" className='py-3 border-bottom' expand="lg">
				<SidePanel show={show} close={() => setShow(false)} />
				<Container fluid>
					<Navbar.Brand href="/">Datasets with CKAN</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto w-100">
							<Nav.Link href="/datasets">Datasets</Nav.Link>
							<div className='d-flex w-100 justify-content-end gap-2'>
								{
									!localStorage.getItem('token') && (
										<a href="/login">
											<Button variant='light'>Login</Button>
										</a>
									)
								}
								{
									!localStorage.getItem('token') && (
										<a href="/register">
											<Button variant='primary'>Register</Button>
										</a>
									)
								}
								{
									localStorage.getItem('token') && (
										<Button variant='dark' onClick={() => {setShow(true)}} className='d-flex align-items-center justify-content-between gap-2 rounded-xl'>
											<FontAwesomeIcon icon={faUser} size="sm" style={{color: "#ffffff",}} />
											{localStorage.getItem('fullname')}
										</Button>
									)
								}
							</div>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
	);
}
/*
<a href={`/profile/${localStorage.getItem('username')}`}>
	<Button variant='light'>Profile</Button>
</a>
*/