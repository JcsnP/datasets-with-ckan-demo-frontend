import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

// import components
import DatasetsCard from './DatasetsCard.js';

export default function ResultDatasets() {
	const [searchParams, setSearchParams] = useSearchParams()
	// console.log(searchParams.get('q'))
	const [datasets, setDatasets] = useState([]);
	const [datasetsLoaded, setDatasetsLoaded] = useState(false);

	useEffect(() => {
		try {
			// ${searchParams.get('q') ? searchParams.get('q') : ''}
			const q = searchParams.get('q') || ' ';
			fetch(`${process.env.REACT_APP_CKAN_API}/packages/search?q=${q}`)
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

	if(datasetsLoaded) {
		return(
			<Row className='my-3'>
				<h4>Found {datasets.length} Datasets</h4>
				{
					datasets.map((item, key) => (
						<Col sm={6} md={3}>
							<DatasetsCard name={item.name} title={item.title} notes={item.notes} image={item.image} author={item.author} metadata_modified={item.metadata_modified} key={key}/>
						</Col>
					))
				}
			</Row>
		);
	} else {
		return(
			<Container>
				Not Found
			</Container>
		);
	}
}