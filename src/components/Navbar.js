import { Navbar, Nav, Container, Button } from 'react-bootstrap';

export default function TheNavbar() {
	return(
		<Container fluid className='my-3'>
			<Navbar bg="light" variant="light" className='rounded shadow-sm'>
	      <Container fluid className='px-5'>
	        <Navbar.Brand href="/">Datasets with CKAN</Navbar.Brand>
	        <Nav className="me-auto">
	          <Nav.Link href="/datasets">Datasets</Nav.Link>
	          <Nav.Link href="/organization">Organization</Nav.Link>
	          <Nav.Link href="#pricing">Group</Nav.Link>
	        </Nav>
	        <Navbar.Collapse className='justify-content-end gap-2'>
	        	<a href="login">
	        		<Button variant='light'>Login</Button>
	        	</a>
	        	<a href="register">
	        		<Button variant='dark'>Register</Button>
	        	</a>
	        </Navbar.Collapse>
	      </Container>
	    </Navbar>
		</Container>
	);
}