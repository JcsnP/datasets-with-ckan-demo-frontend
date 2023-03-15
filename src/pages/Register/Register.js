import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
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

	return(
		<Container className='vh-100 d-flex justify-content-center align-items-center'>
			<div className='d-flex justify-content-center align-items-center'>
				{/* login image eiei */}
				<img className='w-50 h-100' src='https://cdn3d.iconscout.com/3d/premium/thumb/article-writing-6373990-5272606.png' alt='login' />
				{/* login panel eiei */}
				<Card style={{width: '64rem'}}>
					<Card.Body className='d-flex justify-content-center align-items-center'>
						<Form className='w-100'>
						 	<h1>Register</h1>
							<Form.Group className="mb-3" controlId="formBasicUsername">
				        <Form.Label>Username</Form.Label>
				        <Form.Control type="text" placeholder="JohnDoe" value={name} onChange={(e) => {setName(e.target.value)}} />
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="formBasicFullname">
				        <Form.Label>Full Name</Form.Label>
				        <Form.Control type="text" placeholder="John Doe" value={fullname} onChange={(e) => {setFullname(e.target.value)}} />
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="formBasicEmail">
				        <Form.Label>Email</Form.Label>
				        <Form.Control type="email" placeholder="johndoe@gmail.com" value={email} onChange={(e) => {setEmail(e.target.value)}} />
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="formBasicPassword">
				        <Form.Label>Password</Form.Label>
				        <Form.Control type="password" placeholder="********" value={password} onChange={(e) => {setPassword(e.target.value)}} />
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
				        <Form.Label>Confirm Password</Form.Label>
				        <Form.Control type="password" placeholder="********" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} />
				      </Form.Group>

				      <Button variant="dark" className='w-100' onClick={() => {register()}}>Register</Button>

				      <h2 className='text-center my-2'>OR</h2>

							<a href="/login">
				      	<Button variant="primary" className='w-100'>Login</Button>
				      </a>
				      
						</Form>
					</Card.Body>
				</Card>
			</div>
		</Container>
	);
}