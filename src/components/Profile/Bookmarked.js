import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Row, Col, Tabs, Tab } from "react-bootstrap"

// import components
import UserDatasetsCard from './UserDatasetsCard.js';

export default function Bookmarked() {
	const [bookmarked, setBookmarked] = useState([]);
	const [bookmarkedLoaded, setBookmarkedLoaded] = useState(false);

	useEffect(() => {
		const fetchBookmarked = async() => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_CKAN_API}/users/bookmarked`,
					{
						headers: {
							Authorization: localStorage.getItem('token')
						}
					}
				)

				if(response.status === 200) {
					setBookmarked(response.data);
					setBookmarkedLoaded(true);
				}
			} catch(error) {
				console.log(error);
			}
		}

		fetchBookmarked();
	}, []);
	if(bookmarkedLoaded) {
		return(
			<>
				{
					bookmarked.map((item, key) => (
						<UserDatasetsCard name={item.name} notes={item.notes} metadata_modified={item.metadata_modified} key={key} />
					))
				}
			</>
		);
	}
}