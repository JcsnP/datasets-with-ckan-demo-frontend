import React, { useState, useEffect } from 'react';
import { Container, Card, Stack, Badge, Table, Row, Col, Tabs, Tab, Alert, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

// import components
import ResourceCard from '../../components/Datasets/ResourceCard.js';

export default function ViewDatasets({title = 'Datasets'}) {
	const {datasets_name} = useParams();
	document.title = datasets_name;
	const [datasets, setDatasets] = useState({});
	const [datasetsLoaded, setDatasetsLoaded] = useState(false);
	const [isBookmarked, setIsBookmarked] = useState(false);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_CKAN_API}/packages/${datasets_name}`)
			.then((response) => response.json())
			.then((data) => {
				if(data.ok) {
					setDatasets(data.result)
					setDatasetsLoaded(true);
				}
			})
	}, []);

	const bookmarked = async() => {
		const response = await axios.post(
			`${process.env.REACT_APP_CKAN_API}/packages/bookmarked/${datasets.name}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem('token')
				}
			}
		)
		console.log(response)
	}

	if(datasetsLoaded) {
		return(
			<Container className='my-5'>
				<div className='d-flex justify-content-between'>
					<div>
						<h1>{datasets.title}</h1>
						<p className='text-muted'>{datasets.notes}</p>
					</div>
					<div>
						<Button className='d-flex justify-content-between align-items-center' onClick={bookmarked}>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bookmark" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
							  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							  <path d="M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2"></path>
							</svg>
							Bookmark
						</Button>
					</div>
				</div>
				<hr />
				<Tabs className='mb-3' defaultActiveKey="data">
					<Tab eventKey='data' title='Data'>
						{/* data, home */}
						<>
							{
								datasets.tags.length > 0 && (
									<Card body className='w-100'>
										{
											datasets.tags?.map((item, key) => (
												<Badge bg='light' text='dark' className='py-1 px-2 border me-1' key={key}>{item.name}</Badge>
											))
										}
									</Card>
								)
							}

							<h4 className='mt-4'>Resources</h4>
							<Row className='my-1'>
								<Col sm={8}>
									{/* resource view */}
									{
										datasets.resources.map((item, key) => (
											<ResourceCard name={item.name} url={item.url} size={item.size} metadata_modified={item.metadata_modified} format={item.format} />
										))
									}
								</Col>
								<Col sm={4}>
									<h5 className='text-end fw-bold'>Data</h5>
								</Col>
							</Row>

							{/* additional details */}
							<h4>Additional Details</h4>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Field</th>
										<th>Value</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>type</td>
										<td>{datasets.type}</td>
									</tr>
									<tr>
										<td>author</td>
										<td>{datasets.author}</td>
									</tr>
									<tr>
										<td>author email</td>
										<td>{datasets.author_email}</td>
									</tr>
									<tr>
										<td>license title</td>
										<td>{datasets.license_title}</td>
									</tr>
									<tr>
										<td>license url</td>
										<td>{datasets.license_url}</td>
									</tr>
									<tr>
										<td>created</td>
										<td>{moment(datasets.metadata_created).format('LLL')}</td>
									</tr>
									<tr>
										<td>modified</td>
										<td>{moment(datasets.metadata_modified).format('LLL')}</td>
									</tr>
									<tr>
										<td>resources</td>
										<td>{datasets.num_resources}</td>
									</tr>
								</tbody>
							</Table>
						</>
					</Tab>
					<Tab eventKey='discussion' title='Discussion'>
						<>
							{/* discussion */}
						</>
					</Tab>
				</Tabs>
			</Container>
		);
	}
}