import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

// import styles
import '../../styles/login.css'

// import components
import SuccessModal from '../../components/Modal/SuccessModel.js';

export default function Register(argument) {
	document.title = 'Register';

	const [name, setName] = useState('');
	const [fullname, setFullname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [about, setAbout] = useState('');
	const [imageURL, setImageUrl] = useState('');

	const register = async() => {
		// check if password match
		if(password !== confirmPassword)
			return alert('Password not matched');

		try {
			const response = await axios.post(
				'http://127.0.0.1:5001/ckanapi/v1/users',
				{
					name: name,
					fullname: fullname,
					email: email,
					password: password,
					about: about,
					image_url: imageURL
				}
			);

			if(response.status === 200) {
				// success modal
				<SuccessModal title='Success' message='Account was created !' redirect='/' close={false} />
			}
		} catch(error) {
			console.log(error);
		}
	}

	useState(() => {
    // if user already login
    if(localStorage.getItem('token')) {
      window.location.replace('/');
    }
  }, []);

	return(
		<Container className='vh-100 d-flex justify-content-center align-items-center'>
			<div className='d-flex justify-content-center align-items-center'>
				{/* login image eiei */}
				<img className='w-50 h-100' src='https://cdn3d.iconscout.com/3d/premium/thumb/article-writing-6373990-5272606.png' alt='login' />
				{/* login panel eiei */}
				<Card style={{width: '64rem'}}>
					<Card.Body className='d-flex justify-content-center align-items-center p-5'>
						<Form className='w-100'>
						 	<h1 className="fw-bold text-uppercase">Register</h1>

						 	<FloatingLabel controlId="floatingTextarea" label="Username" className="mb-3">
				        <Form.Control type="text" placeholder='Johndoe' value={name} onChange={(e) => {setName(e.target.value)}} />
				      </FloatingLabel>

				      <FloatingLabel controlId="floatingTextarea" label="Fullname" className="mb-3">
				        <Form.Control type="text" placeholder='John doe' value={fullname} onChange={(e) => {setFullname(e.target.value)}} />
				      </FloatingLabel>

				      <FloatingLabel controlId="floatingTextarea" label="Email" className="mb-3">
				        <Form.Control type="email" placeholder='johndoe@gmail.com' value={email} onChange={(e) => {setEmail(e.target.value)}} />
				      </FloatingLabel>

				      <FloatingLabel controlId="floatingTextarea" label="Password" className="mb-3">
				        <Form.Control type="password" placeholder='********' value={password} onChange={(e) => {setPassword(e.target.value)}} />
				      </FloatingLabel>

				      <FloatingLabel controlId="floatingTextarea" label="Confirm Password" className="mb-3">
				        <Form.Control type="password" placeholder='********' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} />
				      </FloatingLabel>

				      <Button variant="primary" className='w-100' onClick={() => {register()}}>Register</Button>

				      <div className="mt-2 text-end">
								Already have an account? <a href="/login">Login</a>
							</div>
				      
						</Form>
					</Card.Body>
				</Card>
			</div>
		</Container>
	);
}