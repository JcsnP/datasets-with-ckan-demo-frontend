import React, { useState, useEffect } from 'react';
import { Container, Card, Stack, Badge, Table, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const datasets = {
	title: 'Load Data Set',
	description: 'A CKAN Dataset is a collection of data resources (such as files), together with a description and other information (what is known as metadata), at a fixed URL.',
	resources: [
		{title: 'sample-load-datasets.csv', description: 'This is a sample resource added via url.'},
		{title: 'sample-load-datasets.csv', description: 'This is a sample resource added via url.'},
		{title: 'sample-load-datasets.csv', description: 'This is a sample resource added via url.'},
	],
	tags: ['csv', 'economy', 'geojson', 'kml', 'pdf'],
	organization: {
		'title': 'Dreamybull Org',
		'description': 'Im about to blow'
	},
	subscriber: 12,
	license: 'MIT',
	additional_details: {
		author: 'JcsnP',
		maintainer: 'Maintainer',
		version: 1.0,
		last_updated: 'Mon Mar 13 2023 19:12:26 GMT+0700',
		created: 'Mon Mar 13 2023 19:12:26 GMT+0700'
	}
}

export default function ViewDatasets({title = 'Datasets'}) {
	const {datasets_name} = useParams();
	document.title = datasets_name;
	const [datasets, setDatasets] = useState({});
	const [datasetsLoaded, setDatasetsLoaded] = useState(false);

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
	
	return(
		<Container className='my-5'>
			<h1>{datasets.title}</h1>
			<p className='text-muted'>{datasets.notes}</p>
			<hr />
			<Card>
				<Card.Body>
					<Stack direction='horizontal' gap={3}>
						{
							datasets.tags?.map((item, key) => (
								<Badge bg='light' text='dark' className='py-1 px-2 border' key={key}>{item.name}</Badge>
							))
						}
					</Stack>
				</Card.Body>
			</Card>
			
			<Row className='my-3'>
				<Col sm={8}>
					{/* datasets view */}
					<Card>
						<Card.Body>
							<h3>Sample Loan Datasets.csv</h3>
						</Card.Body>
					</Card>
				</Col>
				<Col sm={4}>
					<h5 className='text-end fw-bold'>Resources Explorer</h5>
				</Col>
			</Row>

			{/* additional details */}
			

		</Container>
	);
}

/*
<Table striped bordered hover className='my-3 rounded'>
				<thead>
					<tr>
						<th>Field</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					{
						Object.keys(datasets.additional_details).map((key) => (
							<tr>
								<td>{key}</td>
								<td>{datasets.additional_details[key]}</td>
							</tr>
						))
					}
				</tbody>
			</Table>
*/