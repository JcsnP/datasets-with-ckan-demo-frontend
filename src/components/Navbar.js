import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';

export default function TheNavbar() {

	const logout = () => {
		localStorage.clear();
		window.location.href = '/';
	}

	return(
		<Container className='my-4'>
			<Navbar bg="light shadow-sm rounded" expand="lg">
				<Container>
					<Navbar.Brand href="/">Datasets with CKAN</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto w-100">
							<Nav.Link href="/datasets">Datasets</Nav.Link>
							<Nav.Link href="/organization">Organization</Nav.Link>
							<Nav.Link href="/group">Group</Nav.Link>
							<div className='d-flex w-100 justify-content-end gap-2'>
								<a href="login">
									{
										!localStorage.getItem('token') && (
											<Button variant='light'>Login</Button>
										)
									}
									{
										localStorage.getItem('token') && (
											<Button variant='light'>Profile</Button>
										)
									}
								</a>
								<a href="register">
									{
										!localStorage.getItem('token') && (
											<Button variant='dark'>Register</Button>
										)
									}
									{
										localStorage.getItem('token') && (
											<Button variant='danger' onClick={() => {logout()}}>Logout</Button>
										)
									}
								</a>
							</div>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</Container>
	);
}