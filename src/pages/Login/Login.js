import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';

// import styles
import '../../styles/login.css'

export default function Login() {
	return(
		<Container className='vh-100 d-flex justify-content-center align-items-center'>
			<div className='d-flex justify-content-center align-self-center'>
				{/* login image eiei */}
				<img className='w-50' src='https://static.vecteezy.com/system/resources/previews/008/853/660/original/object-element-ui-login-3d-illustration-png.png' alt='login' />
				{/* login panel eiei */}
				<Card style={{width: '64rem'}}>
					<Card.Body className='d-flex justify-content-center align-items-center'>
						<Form className='w-100'>
							<Form.Group className="mb-3" controlId="formBasicEmail">
				        <Form.Label>Username or Email address</Form.Label>
				        <Form.Control type="email" placeholder="Enter email" />
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="formBasicPassword">
				        <Form.Label>Password</Form.Label>
				        <Form.Control type="password" placeholder="Password" />
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="formBasicCheckbox">
				        <Form.Check type="checkbox" label="Remember Me" />
				      </Form.Group>

				      <Button variant="primary" type="submit" className='w-100'>Login</Button>

				      <h2 className='text-center my-2'>OR</h2>

				      <Button variant="dark" type="submit" className='w-100'>Register</Button>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</Container>
	);
}