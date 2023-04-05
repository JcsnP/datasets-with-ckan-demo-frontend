import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

// import components
import DatasetsCard from './DatasetsCard.js';

export default function ResultDatasets() {
	const [searchParams, setSearchParams] = useSearchParams()
	// console.log(searchParams.toString())
	const [datasets, setDatasets] = useState([]);
	const [datasetsLoaded, setDatasetsLoaded] = useState(true);

	const [query, setQuery] = useState(searchParams.get('q'));

	// ${searchParams.get('q') ? searchParams.get('q') : ''}
	const q = searchParams.get('q') || '';
	const tags = searchParams.getAll('tags');
	const tag_str = tags.map(tag => `tags=${tag}`).join('&')

	useEffect(() => {
		try {
			// console.log(`${process.env.REACT_APP_CKAN_API}/packages/search?q=${q}${tags ? `${tag_str}` : ''}`)

			fetch(`${process.env.REACT_APP_CKAN_API}/packages/search?q=${q}&${tags ? `${tag_str}` : ''}`)
				.then((response) => response.json())
				.then((data) => {
					if(data.ok) {
						setDatasets(data.result);
						setDatasetsLoaded(true);
					}
				})
		} catch(error) {
			console.log(error);
		}

	}, []);

	useEffect(() => {
		setDatasetsLoaded(false)
		fetch(`${process.env.REACT_APP_CKAN_API}/packages/search?q=${query}&${tags ? `${tag_str}` : ''}`)
			.then((response) => response.json())
			.then((data) => {
				if(data.ok) {
					setDatasets(data.result);
					setTimeout(() => {
						setDatasetsLoaded(true);
					}, 500)
				}
			})
	}, [query])

	useEffect(() => {
		setDatasetsLoaded(false)
		fetch(`${process.env.REACT_APP_CKAN_API}/packages/search?q=${query}&${tags ? `${tag_str}` : ''}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				if(data.ok) {
					setDatasets(data.result);
					setTimeout(() => {
						setDatasetsLoaded(true);
					}, 500)
				}
			})
	}, [searchParams])	

	return(
		<>
			<Form className="my-3">
				<Form.Control type='text' placeholder='Search Datasets' className='py-2' value={query} onChange={(e) => {setQuery(e.target.value)}} />
			</Form>
			{
				datasetsLoaded ? (
					<Row className='my-3'>
						<div className="d-flex align-items-center justify-content-between">
							<h4>Found {datasets.length} Datasets</h4>
							<Button variant="outline-primary" size="sm my-2 float-end" onClick={() => window.location.href = '/datasets'}>Clear</Button>
						</div>
						{
							datasets.map((item, key) => (
								<Col sm={6} md={3}>
									<DatasetsCard id={item.id} name={item.name} title={item.title} notes={item.notes} image={item.image} author={item.author} metadata_modified={item.metadata_modified} key={key}/>
								</Col>
							))
						}
					</Row>
				) : (
					<Container>
						Searching...
					</Container>
				)
			}
		</>
	);
}