import React, { useState, useEffect } from 'react';
import { Container, Card, Badge, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { ThreeDots } from  'react-loader-spinner';

// import other components
import SearchDatasets from '../Search/SearchDatasets.js';

export default function SidePanel() {
	const [tags, setTags] = useState([]);
	const [tagsLoaded, setTagsLoaded] = useState(false);

	const [organizations, setOrganizations] = useState([]);
	const [organizationsLoaded, setOrganizationsLoaded] = useState(false);

	useEffect(() => {
		const fetchTags = async() => {
			const response = await axios.get(
				'http://127.0.0.1:5001/ckanapi/v1/tags'
			)

			if(response.status === 200) {
				setTags(response.data);
				setTagsLoaded(true);
			}
		}

		const fetchOrganizations = async() => {
			const response = await axios.get(
				'http://127.0.0.1:5001/ckanapi/v1/organizations/name'
			)

			if(response.status === 200) {
				setOrganizations(response.data);
				setOrganizationsLoaded(true);
			}
		}

		fetchTags();
		fetchOrganizations();
	}, []);

	return(
		<Card className='shadow-sm'>
			<Card.Body>
				{/* search datasets */}
				<SearchDatasets />

				{/* tags */}
				<div className='d-flex flex-column gap-1 mb-3'>
					<label className='fw-bold'>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-tag" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						  <circle cx="8.5" cy="8.5" r="1" fill="currentColor"></circle>
						  <path d="M4 7v3.859c0 .537 .213 1.052 .593 1.432l8.116 8.116a2.025 2.025 0 0 0 2.864 0l4.834 -4.834a2.025 2.025 0 0 0 0 -2.864l-8.117 -8.116a2.025 2.025 0 0 0 -1.431 -.593h-3.859a3 3 0 0 0 -3 3z"></path>
						</svg>
						Tags
					</label>
					<div>
						{
							tagsLoaded && (
								tags.map((item, key) => (
									<Badge pill bg='light' text='dark' className='mx-1 border' key={key}>{item}</Badge>
								))
							)
						}

						{
							!tagsLoaded && (
								<ThreeDots 
									height="50" 
									width="50" 
									radius="9"
									color="#212529" 
									ariaLabel="three-dots-loading"
									wrapperStyle={{}}
									wrapperClassName=""
									visible={true}
								/>
							)
						}
					</div>
				</div>

				{/* organization */}
				<div className='d-flex flex-column gap-1 mb-3'>
					<label className='fw-bold'>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						  <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
						  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
						  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
						</svg>
						Organization
					</label>
					<div>
						{
							organizationsLoaded && (
								organizations.map((item, key) => (
									<Badge pill bg='light' text='dark' className='mx-1 border'>{item}</Badge>
								))
							)
						}

						{
							!organizationsLoaded && (
								<ThreeDots 
									height="50" 
									width="50" 
									radius="9"
									color="#212529" 
									ariaLabel="three-dots-loading"
									wrapperStyle={{}}
									wrapperClassName=""
									visible={true}
								/>
							)
						}
					</div>
				</div>

				<Button variant='dark' className='w-100 uppercase'>Clear</Button>
			</Card.Body>
		</Card>
	);
}