import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel, Row, Col, OverlayTrigger, Popover } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function UpdateDatasetsModal({show, close, datasets}) {

	const [title, setTitle] = useState(datasets.title);
	const [notes, setNotes] = useState(datasets.notes);
	const [tags, setTags] = useState(datasets.tags?.map(item => item.name));
	const [source, setSource] = useState(datasets.url);
	const [author, setAuthor] = useState(datasets.author ? datasets.author : localStorage.getItem('username'));
	const [authorEmail, setAuthorEmail] = useState(datasets.author_email)
	const [allTags, setAllTags] = useState([]);
	const [thumbnail, setThumbnail] = useState(false);

	const [preview_thumbnail, setPreview_Thumbnail] = useState('');

	const [updateProcessing, setUpdateProcessing] = useState(false);

	useEffect(() => {
		// fetch tags
		fetch(`${process.env.REACT_APP_CKAN_API}/tags`)
			.then((response) => response.json())
			.then((data) => {
				setAllTags(data.result);
			})

		// fetch thumbnail
		fetch(`${process.env.REACT_APP_CKAN_API}/packages/${datasets.id}/thumbnail`)
			.then((response) => response.json())
			.then((data) => {
				if(data.ok) {
					setThumbnail(data.result);
				}
			})
			.catch((error) => console.log(error))
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
		setUpdateProcessing(true);
		const payload = {
			title: title,
			name: title.toLowerCase().replaceAll(",", "").replaceAll(" ", "-"),
			notes: notes,
			url: source,
			author: author,
			author_email: authorEmail,
		};


		// if tags not null
		if(typeof tags !== 'undefined' && tags.length > 0) {
			payload.tags = create_tags(tags);
		}

		const response = await axios.put(
			`${process.env.REACT_APP_CKAN_API}/packages/${datasets.name}`,
			payload,
			{
				headers: {
					Authorization: localStorage.getItem('token')
				}
			}
		)
		if(response.data.ok) {
			// reload datasets page with new name
			if(typeof thumbnail !== "string") {
				const thumbnail_response = await axios.post(
				`${process.env.REACT_APP_CKAN_API}/packages/${datasets.id}/thumbnail`,
					{
						thumbnail_image: thumbnail
					},
					{
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: localStorage.getItem('token')
						}
					}
				)
				console.log(thumbnail_response)
				if(thumbnail_response.data.ok) {
					window.location.href = `/datasets/${response.data.result.name}`
					close()
				}
			}
			setUpdateProcessing(false);
			window.location.href = `/datasets/${response.data.result.name}`
			close()
			/*
			window.location.href = `/datasets/${response.data.result.name}`
			close()
			*/
		}
	}

	const deletePackage = async() => {
		const response = await axios.delete(
			`${process.env.REACT_APP_CKAN_API}/packages/${datasets.name}`,
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: localStorage.getItem('token')
				}
			}
		)
		if(response.data.ok) {
			window.location.href = "/profile/" + localStorage.getItem('username');
		}
	}

	const popover = (
	  <Popover id="popover-basic">
	    <Popover.Header as="h3">Are you sure ?</Popover.Header>
	    <Popover.Body>
	      <Button variant="danger" onClick={() => deletePackage()} className="w-100">
	      	<FontAwesomeIcon icon={faTrash} style={{color: "#ffffff"}} className="me-2" />
	      	Delete
	      </Button>
	    </Popover.Body>
	  </Popover>
	);

	return(
		<>
		<Modal
        show={show}
        onHide={close}
        backdrop="static"
        keyboard={false}
        size='xl'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Datasets</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
          	<Col>
          		<div className='position-relative h-100'>
          			{
          				thumbnail && !preview_thumbnail ? (
          					<img src={thumbnail ? `data:image/png;base64,${thumbnail}` : null} alt="thumbnail" className='w-100 h-100 rounded' />
          				) : preview_thumbnail ? (
          					<img src={preview_thumbnail} alt="thumbnail_preview" className='w-100 h-100 rounded' />
          				) : (
										<h1 className="h-100 d-flex justify-content-center align-items-center text-muted">No Thumbnail</h1>
          				)
          			}
          			<Form.Group controlId="formFile" className="position-absolute bottom-0 p-2 w-100 shadow-sm">
					        <Form.Control type="file" accept="image/png, image/jpeg" onChange={(e) => {setThumbnail(e.target.files[0]); setPreview_Thumbnail(URL.createObjectURL(e.target.files[0]))}} />
					      </Form.Group>
          		</div>
          	</Col>
          	<Col>
          		<FloatingLabel controlId="floatingTextarea" label="Title" className="mb-3">
				        <Form.Control type="text" placeholder='title' value={title} onChange={(e) => {setTitle(e.target.value)}} />
				        <Form.Text id="newDatasetsName" muted>Your new datasets link will be : http://127.0.0.1:3000/datasets/{title.toLowerCase().replaceAll(",", "").replaceAll(" ", "-")}</Form.Text>
				      </FloatingLabel>

				      <FloatingLabel controlId="floatingTextarea2" label="Notes" className="mb-3">
				      	<Form.Control as="textarea" placeholder="Leave a Noes here" style={{ height: '100px' }} value={notes} onChange={(e) => {setNotes(e.target.value)}} />
				      </FloatingLabel>

		      		<FloatingLabel controlId="floatingTextarea" label="Tags" className="mb-3">
				        <Form.Control type="text" placeholder="tags" value={tags} onChange={(e) => {setTags(e.target.value)}} />
				      </FloatingLabel>

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
          	</Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
        	<Button variant="light" onClick={close} className="border">
            Cancel
          </Button>
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
				    <Button variant="danger">
	        		<FontAwesomeIcon icon={faTriangleExclamation} style={{color: "#ffffff"}} className="me-2" />
	        		Delete
	        	</Button>
				  </OverlayTrigger>
          <Button
          	variant="primary"
          	disabled={updateProcessing}
          	onClick={!updateProcessing ? updateDatasets : null}
          >
          	{updateProcessing ? 'Updating...' : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
		</>
	);
}