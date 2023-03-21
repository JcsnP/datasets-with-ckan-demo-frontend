import React, {useState, useEffect} from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

// import styles
import '../../styles/login.css'

export default function Login() {
	document.title = 'Login';
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	useState(() => {
    // if user already login
    if(localStorage.getItem('token')) {
      window.location.replace('/');
    }
  }, []);

	const login = async() => {
		const response = await axios.post(
			`${process.env.REACT_APP_CKAN_API}/users/login`,
			{
				name: username,
				password: password
			}
		)
		console.log(response)
		if(response.data.ok) {
			alert('succes')
			localStorage.setItem('token', response.data.token)
			window.location.replace('/');
		} else {
			alert('Login Failed');
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
				        <Form.Control type="text" placeholder="JohnDoe" value={username} onChange={(e) => {setUsername(e.target.value)}} />
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="formBasicPassword">
				        <Form.Label>Password</Form.Label>
				        <Form.Control type="password" placeholder="********" value={password} onChange={(e) => {setPassword(e.target.value)}} />
				      </Form.Group>

				      <Button variant="primary" onClick={login} className='w-100'>Login</Button>

				      <h2 className='text-center my-2'>OR</h2>

				      <a href="/register">
				      	<Button variant="light" className='w-100 border'>Register</Button>
				      </a>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</Container>
	);
}