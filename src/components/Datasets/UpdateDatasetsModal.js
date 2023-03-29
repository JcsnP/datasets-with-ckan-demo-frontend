import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default function UpdateDatasetsModal({show, close, datasets}) {

	const [title, setTitle] = useState(datasets.title);
	const [notes, setNotes] = useState(datasets.notes);
	const [tags, setTags] = useState(datasets.tags?.map(item => item.name));
	const [source, setSource] = useState(datasets.url);
	const [author, setAuthor] = useState(datasets.author);
	const [authorEmail, setAuthorEmail] = useState(datasets.author_email)
	const [allTags, setAllTags] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_CKAN_API}/tags`)
			.then((response) => response.json())
			.then((data) => {
				setAllTags(data.result);
			})
	}, []);

	const create_tags = (tags_string) => {
		tags_string = tags_string.toString();
		let tags_result = []
		tags_string.split(',').map(item => (
			tags_result.push({name: item})
		))
		return tags_result
	}

	const updateDatasets = async() => {
		const response = await axios.put(
			`${process.env.REACT_APP_CKAN_API}/packages/${datasets.name}`,
			{
				title: title,
				name: title.toLowerCase().replaceAll(",", "").replaceAll(" ", "-"),
				notes: notes,
				tags: create_tags(tags),
				url: source,
				author: author,
				author_email: authorEmail
			},
			{
				headers: {
					Authorization: localStorage.getItem('token')
				}
			}
		)
		if(response.data.ok) {
			// reload datasets page with new name
			window.location.href = `/datasets/${response.data.result.name}`
			close()
		}
	}

	return(
		<>
		<Modal
        show={show}
        onHide={close}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Datasets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <FloatingLabel controlId="floatingTextarea" label="Title" className="mb-3">
		        <Form.Control type="text" placeholder='title' value={title} onChange={(e) => {setTitle(e.target.value)}} />
		        <Form.Text id="newDatasetsName" muted>Your new datasets link will be : http://127.0.0.1:3000/datasets/{title.toLowerCase().replaceAll(",", "").replaceAll(" ", "-")}</Form.Text>
		      </FloatingLabel>

		      <FloatingLabel controlId="floatingTextarea2" label="Notes" className="mb-3">
		      	<Form.Control as="textarea" placeholder="Leave a Noes here" style={{ height: '100px' }} value={notes} onChange={(e) => {setNotes(e.target.value)}} />
		      </FloatingLabel>

		      <Row>
		      	<Col md>
		      		<FloatingLabel controlId="floatingTextarea" label="Tags" className="mb-3">
				        <Form.Control type="text" placeholder="tags" value={tags} onChange={(e) => {setTags(e.target.value)}} />
				      </FloatingLabel>
		      	</Col>
		      	<Col md>
		      		<FloatingLabel controlId="floatingSelect" label="License" className="mb-3">
					      <Form.Select aria-label="Floating label select example">
					        {
					        	allTags.map((item, key) => (
					        		<option value={item}>{item}</option>
					        	))
					        }
					      </Form.Select>
					    </FloatingLabel>
		      	</Col>
		      </Row>

		      <FloatingLabel controlId="floatingTextarea" label="Source" className="mb-3">
		        <Form.Control type="text" placeholder="source, url" value={source} onChange={(e) => {setSource(e.target.value)}} />
		      </FloatingLabel>

		      <Row>
		      	<Col md>
							<FloatingLabel controlId="floatingTextarea" label="Author" className="mb-3">
				        <Form.Control type="text" placeholder="author" value={author} onChange={(e) => {setAuthor(e.target.value)}} />
				      </FloatingLabel>
		      	</Col>
		      	<Col md>
							<FloatingLabel controlId="floatingTextarea" label="Author Email" className="mb-3">
				        <Form.Control type="text" placeholder="author email" value={authorEmail} onChange={(e) => {setAuthorEmail(e.target.value)}} />
				      </FloatingLabel>
		      	</Col>
		      </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {updateDatasets()}}>Update</Button>
        </Modal.Footer>
      </Modal>
		</>
	);
}