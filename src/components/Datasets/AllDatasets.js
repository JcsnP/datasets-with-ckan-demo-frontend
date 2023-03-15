import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Oval } from  'react-loader-spinner';
import axios from 'axios';

// import components
import DatasetsCard from './DatasetsCard.js';

export default function AllDatasets() {
	const [datasets, setDatasets] = useState([]);
	const [datasetsLoaded, setDatasetsLoaded] = useState(false);

	useEffect(() => {
		const fetchDatasets = async() => {
			const response = await axios(
				'http://127.0.0.1:5001/ckanapi/v1/packages'
			)
			if(response.status === 200) {
				setDatasets(response.data);
				setDatasetsLoaded(true);
			}
		}

		fetchDatasets()
	}, []);

	if(datasetsLoaded) {
		return(
			<Row>
				{
					datasets.map((item, key) => (
						<Col sm={6}>
							<DatasetsCard title={item.title} author={item.author} metadata_modified={item.metadata_modified} key={key} />
						</Col>
					))
				}
			</Row>
		);
	} else {
		return(
			<Container className='d-flex align-items-center justify-content-center h-100'>
				<Oval
				  height={80}
				  width={80}
				  color="#4fa94d"
				  wrapperStyle={{}}
				  wrapperClass=""
				  visible={true}
				  ariaLabel='oval-loading'
				  secondaryColor="#4fa94d"
				  strokeWidth={2}
				  strokeWidthSecondary={2}
				/>
			</Container>
		);
	}
}