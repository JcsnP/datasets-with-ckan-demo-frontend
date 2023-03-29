import React, {useState, useEffect} from 'react';
import { Container, Form, Button, Card, Row, Col, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

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
		
		if(response.data.ok) {
			alert('succes')
			localStorage.setItem('token', response.data.token)
			localStorage.setItem('username', decodeToken(response.data.token).name)
			localStorage.setItem('fullname', decodeToken(response.data.token).fullname)
			localStorage.setItem('user_id', decodeToken(response.data.token).id)
			// decode token
			// Cookies.set('user_id', decodeToken(response.data.token).id)
			// Cookies.get('username);
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
				<Card style={{width: '64rem', height: '32rem'}}>
					<Card.Body className='d-flex justify-content-center align-items-center p-5'>
						<Form className='w-100'>
							<h1 className='fw-bold text-uppercase text-center'>Login</h1>

							<FloatingLabel controlId="floatingTextarea" label="Username" className="mb-3">
				        <Form.Control type="text" placeholder='Johndoe' value={username} onChange={(e) => {setUsername(e.target.value)}} />
				      </FloatingLabel>

				      <FloatingLabel controlId="floatingTextarea" label="Password" className="mb-3">
				        <Form.Control type="password" placeholder='********' value={password} onChange={(e) => {setPassword(e.target.value)}} />
				      </FloatingLabel>

				      <Button variant="primary" onClick={login} size="lg" className='w-100'>Login</Button>

				      <div className="mt-2 text-end">
				      	Not a member ? <a href="/register">Register</a>
				      </div>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</Container>
	);
}