import React, {useState, useEffect} from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

// import styles
import '../../styles/login.css'

export default function Login() {
	document.title = 'Login';

	const [name, setName] = useState('');
	const [password, setPassword] = useState('');

	const login = async() => {
		const response = await axios.post(
			'http://127.0.0.1:5001/ckanapi/v1/users/login',
			{
				name: name,
				password: password
			}
		);
		if(response.status === 200) {
			console.log(response)
			alert('success')

			// set token
			localStorage.setItem('token', response.data.token);

			// redirect to homepage
			window.location.href = '/';
		}
	}

	return(
		<Container className='vh-100 d-flex justify-content-center align-items-center'>
			<div className='d-flex justify-content-center align-items-center'>
				{/* login image eiei */}
				<img className='w-50' src='https://static.vecteezy.com/system/resources/previews/008/853/660/original/object-element-ui-login-3d-illustration-png.png' alt='login' />
				{/* login panel eiei */}
				<Card style={{width: '64rem'}}>
					<Card.Body className='d-flex justify-content-center align-items-center'>
						<Form className='w-100'>
							<h1>Login</h1>
							<Form.Group className="mb-3" controlId="formBasicEmail">
				        <Form.Label>Username or Email</Form.Label>
				        <Form.Control type="text" placeholder="JohnDoe" value={name} onChange={(e) => {setName(e.target.value)}} />
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="formBasicPassword">
				        <Form.Label>Password</Form.Label>
				        <Form.Control type="password" placeholder="********" value={password} onChange={(e) => {setPassword(e.target.value)}} />
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="formBasicCheckbox">
				        <Form.Check type="checkbox" label="Remember Me" />
				      </Form.Group>

				      <Button variant="primary" className='w-100' onClick={() => {login()}}>Login</Button>

				      <h2 className='text-center my-2'>OR</h2>

				      <a href="/register">
				      	<Button variant="dark" className='w-100'>Register</Button>
				      </a>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</Container>
	);
}