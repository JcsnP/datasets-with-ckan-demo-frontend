import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

// import components
import GroupCard from '../../components/Group/GroupCard.js';

export default function Group(argument) {
	document.title = 'Group';
	const [groups, setGroups] = useState([]);
	const [groupsLoaded, setGroupsLoaded] = useState(false);
	useEffect(() => {
		const fetchOrganizations = async() => {
			const response = await axios.get(
				`${process.env.REACT_APP_CKAN_API}/groups`
			);

			if(response.data.ok) {
				setGroups(response.data.result);
				setGroupsLoaded(true);
			}
		}

		fetchOrganizations();
	}, []);
	return(
		<Container className='my-5'>
			<div className='d-flex justify-content-between align-items-center'>
				<div>
					<h1 className='fw-bold'>Group</h1>
					<h5 className='thai-lang text-muted'>ค้นหา กลุ่มทั้งหมด</h5>
				</div>
				<div>
					<img src='https://cdn3d.iconscout.com/3d/premium/thumb/business-team-doing-discussion-5648600-4708252.png' alt='organization image' height='250' />
				</div>
			</div>
			<Row className='my-5'>
				{
					groups.map((item, key) => (
						<Col sm={6} xl={3} className=''>
							<GroupCard name={item.name} display_name={item.display_name} image_display_url={item.image_display_url} description={item.description} num_followers={item.num_followers} package_count={item.package_count} key={key} />
						</Col>
					))
				}
			</Row>	
		</Container>
	);
}