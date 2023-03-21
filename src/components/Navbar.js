import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';

export default function TheNavbar() {
	return(
			<Navbar bg="light" className='py-3 border-bottom' expand="lg">
				<Container>
					<Navbar.Brand href="/">Datasets with CKAN</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto w-100">
							<Nav.Link href="/datasets">Datasets</Nav.Link>
							<Nav.Link href="/organization">Organization</Nav.Link>
							<Nav.Link href="/group">Group</Nav.Link>
							<div className='d-flex w-100 justify-content-end'>
								<a href="login">
									<Button variant='light'>Login</Button>
								</a>
								<a href="register">
									<Button variant='primary'>Register</Button>
								</a>
							</div>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
	);
}