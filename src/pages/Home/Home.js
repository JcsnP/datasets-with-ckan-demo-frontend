import React from 'react';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'

// import style
import '../../styles/home.css';
import '../../App.css';

// import components
import OrganizationCard from '../../components/Organization/OrganizationCard.js';

const organization_data = [
	{
		title: 'The Organization',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Seal_of_the_United_States_Department_of_Homeland_Security.svg/800px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png',
		description: 'Inside Kaggle you’ll find all the code & data you need to do your data science work. Use over 50,000 public datasets and 400,000 public notebooks to conquer any analysis in no time.'
	},
	{
		title: 'The Organization',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Seal_of_the_United_States_Department_of_Homeland_Security.svg/800px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png',
		description: 'Inside Kaggle you’ll find all the code & data you need to do your data science work. Use over 50,000 public datasets and 400,000 public notebooks to conquer any analysis in no time.'
	},
	{
		title: 'The Organization',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Seal_of_the_United_States_Department_of_Homeland_Security.svg/800px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png',
		description: 'Inside Kaggle you’ll find all the code & data you need to do your data science work. Use over 50,000 public datasets and 400,000 public notebooks to conquer any analysis in no time.'
	},
	{
		title: 'The Organization',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Seal_of_the_United_States_Department_of_Homeland_Security.svg/800px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png',
		description: 'Inside Kaggle you’ll find all the code & data you need to do your data science work. Use over 50,000 public datasets and 400,000 public notebooks to conquer any analysis in no time.'
	},
]

export default function Home() {
	return (
		<Container>
			<Row className='my-5'>
				<Col>
					<h1>Welcome to Databases with CKAN (DEMO)</h1>
					<p className='text-muted'>
						This system was developed using the CKAN dataset management system.
					</p>
					<div className='d-flex flex-column gap-2 my-4 w-50'>
						<Button variant="dark" className='shadow-sm' size='lg'>Register Now</Button>
						<Button variant="light" className='shadow-sm' size='lg'>Login</Button>
					</div>
				</Col>
				<Col>
					เอาไว้ใส่ GIF ของหน้าตาการทำงานภายในเว็บ
				</Col>
			</Row>


			{ /* organization */ }
			<h2>Organization</h2>
			<h4 className='text-muted thai-lang'>องค์กรทั้งหมด</h4>
			<Stack direction='horizontal' gap={3}>
				{
					organization_data.map((item, key) => (
						<OrganizationCard title={item.title} image={item.image} description={item.description} key={key} />
					))
				}
			</Stack>	
		</Container>
	);
}