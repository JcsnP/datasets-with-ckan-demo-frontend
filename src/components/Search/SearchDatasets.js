import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function SearchDatasets({width = 100}) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [name, setName] = useState(searchParams.get('q'));
	
	const search = async() => {
		// const response = await axios.get(`${process.env.REACT_APP_CKAN_API}/packages/package?q=`)
		window.location.href=`/datasets?q=${name}`
	}

	return(
		<Form className={`d-flex gap-2 w-${width}`}>
			<Form.Control type='text' placeholder='Search Datasets' className='py-2' value={name} onChange={(e) => {setName(e.target.value)}} />
			<Button varian='primary' onClick={search}>SEARCH</Button>
		</Form>
	);
}