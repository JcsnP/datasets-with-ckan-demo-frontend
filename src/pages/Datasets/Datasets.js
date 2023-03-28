import React, { useState } from 'react';
import { Container, Card, Badge, Row, Col, Button } from 'react-bootstrap';
import { Oval } from 'react-loader-spinner';

// import styles
import '../../App.css';

// import components
import AllDatasets from '../../components/Datasets/AllDatasets.js';
import Banner from '../../components/Datasets/Banner';
import FilterPanel from '../../components/Datasets/FilterPanel';
import SearchDatasets from '../../components/Search/SearchDatasets';
import ResultDatasets from '../../components/Datasets/ResultDatasets.js';

const tags = ['All Datasets', 'Education','Computer Science','Classification','Computer Vision','NLP','Data Visualization','Pre-Trained Model']

export default function Datasets() {
	document.title = 'Datasets';
	return(
		<>
			<Banner />
			<Row>
				<Col sm={4} style={{backgroundColor: '#ECECEC'}}>
					<FilterPanel />
				</Col>
				<Col sm={8}>
					<Container  className='my-5'>
						{/* search datasets */}
        		<SearchDatasets />

        		{/* result */}
        		<ResultDatasets />
					</Container>
				</Col>
			</Row>
		</>
	);
}