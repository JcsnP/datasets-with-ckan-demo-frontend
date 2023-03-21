import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios';

// import style
import '../../styles/home.css';
import '../../App.css';

// import components
import OrganizationCard from '../../components/Organization/OrganizationCard.js';
import Banner from '../../components/Home/Banner';
import Stats from '../../components/Home/Stats';
import RecommendDatasets from '../../components/Datasets/RecommendDatasets';

export default function Home() {
	const [organizations, setOrganizations] = useState([]);
	const [organizationsLoaded, setOrganizationsLoaded] = useState(false);

	/*
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
	*/

	return (
		<>
			<Banner />
			
			<Stats />


			{ /* recommend datasets */ }
			<RecommendDatasets />	
		</>
	);
}