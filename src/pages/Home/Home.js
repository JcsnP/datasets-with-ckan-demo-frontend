import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios';

// import style
import '../../styles/home.css';
import '../../App.css';

// import components
import OrganizationCard from '../../components/Organization/OrganizationCard.js';

export default function Home() {
	const [organizations, setOrganizations] = useState([]);
	const [organizationsLoaded, setOrganizationsLoaded] = useState(false);

	useEffect(() => {
		const fetchOrganizations = async() => {
			const response = await axios.get(
				'http://127.0.0.1:5001/ckanapi/v1/organizations/?order_by=packages'
			);

			if(response.status === 200) {
				setOrganizations(response.data);
				setOrganizationsLoaded(true);
			}
		}

		fetchOrganizations();
	}, []);

	return (
		<Container>
			<Row className='my-5'>
				<Col>
					<h1>Welcome to Databases with CKAN (DEMO)</h1>
					<p className='text-muted'>
						This system was developed using the CKAN dataset management system.
					</p>
					<div className='d-flex flex-column gap-2 my-4 w-50'>
						<a href="/register">
							<Button variant="dark" className='shadow-sm w-100' size='lg'>Register Now</Button>
						</a>
						<a href="/login">
							<Button variant="light" className='shadow-sm w-100' size='lg'>Login</Button>
						</a>
					</div>
				</Col>
				<Col>
					เอาไว้ใส่ GIF ของหน้าตาการทำงานภายในเว็บ
				</Col>
			</Row>


			{ /* organization */ }
			<h2>Organization</h2>
			<h4 className='text-muted thai-lang'>องค์กรน่าสนใจ</h4>
			<Row direction='horizontal' gap={3}>
				{
					organizationsLoaded && (
						organizations.map((item, key) => (
							<Col sm={3}>
								<OrganizationCard display_name={item.display_name} image_display_url={item.image_display_url} description={item.description} num_followers={item.num_followers} package_count={item.package_count} key={key} />
							</Col>
						))
					)
				}
			</Row>	
		</Container>
	);
}