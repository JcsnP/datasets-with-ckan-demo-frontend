import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';

// import styles
import '../../styles/login.css'

export default function Register(argument) {
	return(
		<Container className='vh-100 d-flex justify-content-center align-items-center'>
			<div className='d-flex justify-content-center align-self-center'>
				{/* login image eiei */}
				<img className='w-50' src='https://static.vecteezy.com/system/resources/previews/008/853/660/original/object-element-ui-login-3d-illustration-png.png' alt='login' />
				{/* login panel eiei */}
				<Card style={{width: '64rem'}}>
					<Card.Body className='d-flex justify-content-center align-items-center'>
						<Form className='w-100'>
						 	<h1>Register</h1>
							<Form.Group className="mb-3" controlId="formBasicEmail">
				        <Form.Label>Username</Form.Label>
				        <Form.Control type="text" placeholder="JohnDoe" />
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="formBasicEmail">
				        <Form.Label>Full Name</Form.Label>
				        <Form.Control type="text" placeholder="John Doe" />
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="formBasicEmail">
				        <Form.Label>Email</Form.Label>
				        <Form.Control type="email" placeholder="johndoe@gmail.com" />
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="formBasicPassword">
				        <Form.Label>Password</Form.Label>
				        <Form.Control type="password" placeholder="********" />
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="formBasicPassword">
				        <Form.Label>Confirm Password</Form.Label>
				        <Form.Control type="password" placeholder="********" />
				      </Form.Group>

				      <Button variant="dark" type="submit" className='w-100'>Register</Button>

				      <h2 className='text-center my-2'>OR</h2>

				      <Button variant="primary" type="submit" className='w-100'>Login</Button>
				      
						</Form>
					</Card.Body>
				</Card>
			</div>
		</Container>
	);
}