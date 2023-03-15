import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

// import components
import OrganizationCard from '../../components/Organization/OrganizationCard.js';


export default function Organization() {
	document.title = 'Organization';

	const [organizations, setOrganizations] = useState([]);
	const [organizationsLoaded, setOrganizationsLoaded] = useState(false);

	useEffect(() => {
		const fetchOrganizations = async() => {
			const response = await axios.get(
				'http://127.0.0.1:5001/ckanapi/v1/organizations'
			);

			if(response.status === 200) {
				setOrganizations(response.data);
				setOrganizationsLoaded(true);
			}
		}

		fetchOrganizations();
	}, []);

	return(
		<Container className='my-5'>
			<div className='d-flex justify-content-between align-items-center'>
				<div>
					<h1 className='fw-bold'>Organization</h1>
					<h5 className='thai-lang text-muted'>ค้นหา องค์กรทั้งหมด</h5>
				</div>
				<div>
					<img src='https://cdn3d.iconscout.com/3d/premium/thumb/people-network-5842018-4897949.png' alt='organization image' height='250' />
				</div>
			</div>
			<Row className='my-5'>
				{
					organizations.map((item, key) => (
						<Col sm={3} className=''>
							<OrganizationCard display_name={item.display_name} image_display_url={item.image_display_url} description={item.description} num_followers={item.num_followers} package_count={item.package_count} key={key} />
						</Col>
					))
				}
			</Row>
		</Container>
	);
}