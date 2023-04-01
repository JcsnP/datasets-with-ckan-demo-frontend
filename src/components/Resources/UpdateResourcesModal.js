import React, {useState, useEffect} from 'react';
import { Modal, Button, Form, Card, Popover, OverlayTrigger, Row, Col, FloatingLabel } from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// import components
// import ResourceCard from './ResourceCard.js';

const UpdateResourceCard = ({id, name, url, description, metadata_modified, format, resource_size, deleteResource}) => {
	return(
		<Card className='mb-3 shadow-sm'>
			<Card.Body className='d-flex w-100 flex-row align-items-center justify-content-between py-2 px-3'>
				<div className='w-100'>
					<h6 className="fw-bold">{name ? name : 'no title'}</h6>
					<small>{description.length >= 15 ? description.slice(0, 15) + '...' : description}</small>
					<div className='d-flex gap-3 align-items-center'>
						<small className='text-muted'>{moment(metadata_modified).format('LL')}</small>
						•
						<small className="text-muted">{(resource_size / 1024).toPrecision(2)} KB</small>
						•
						<small className="border rounded px-2 bg-light text-muted">{format ? format : 'unknow format'}</small>
					</div>
				</div>
				<div>
					<OverlayTrigger
						trigger="click"
						placement="right"
						rootClose
						overlay={
							<Popover id="popover-basic">
	              <Popover.Header as="h3">Are you sure ?</Popover.Header>
	              <Popover.Body className="d-flex gap-2">
	              	<Button variant="light" className="border" onClick={() => document.body.click()}>Cancel</Button>
	                <Button variant="danger" className="border" onClick={deleteResource}>Delete !</Button>
	              </Popover.Body>
	            </Popover>
						}>
				    <Button variant="danger">
				    	<FontAwesomeIcon icon={faX} style={{color: "#ffffff",}} size="xs" />
				    </Button>
				  </OverlayTrigger>
				</div>
			</Card.Body>
		</Card>
	);
}

export default function UpdateResourcesModal({show, close, datasets_resources, datasets_id}) {
	const [resources, setResources] = useState(datasets_resources);
	const [confirmDeletePopoverShow, setConfirmDeletePopoverShow] = useState(false);

	// const [url, setURL] = useState('');
	const [description, setDescription] = useState('');
	const [name, setName] = useState('');
	const [file, setFile] = useState('');

	const old_resouces = resources;

	// create new resouces
	const createResouce = async() => {

		// if user not upload file
		if(file === '' || file === null) {
			return alert('Please select file');
		}

		const response = await axios.post(
			`${process.env.REACT_APP_CKAN_API}/packages/resources`,
			{
				package_id: datasets_id,
				// url: url,
				description: description,
				name: name,
				upload: file
			},
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: localStorage.getItem('token'),
				}
			}
		)

		console.log(response.data.result)
		if(response.data.ok) {
			setName('');
			setDescription('');
			// setURL('');
			setFile(null);
			setResources((prevState) => [...prevState, response.data.result])
		}
	}

	const deleteResource = async(id) => {
		const response = await axios.delete(
			`${process.env.REACT_APP_CKAN_API}/packages/resources/${id}`,
			{
				headers: {
					Authorization: localStorage.getItem('token')
				}
			}
		);

		console.log(response)
		if(response.data.ok) {
			// delete resource card from list
			const update_resource = resources.filter(item => item.id !== id);
			setResources(update_resource);
			// window.location.reload()
		}
	}

	return(
		<Modal
      show={show}
      onHide={close}
      backdrop="static"
      keyboard={false}
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Resources</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      	<Row>
      		<Col>
						{
							resources.length > 0 ? (
			        	resources.map((item, key) => (
			        		<UpdateResourceCard id={item.id} name={item.name} url={item.url} description={item.description} metadata_modified={item.metadata_modified} format={item.format} resource_size={item.size} deleteResource={() => {deleteResource(item.id)}} />
			        	))
							) : (
								<h1 className="h-100 d-flex justify-content-center align-items-center text-muted text-center">Datasets don't have any resources yet.</h1>
							)							
						}
      		</Col>



      		<Col>
      			{/*
      			<Row>
		        	<Col>
		        		<FloatingLabel controlId="floatingTextarea" label="Resouce name" className="mb-3">
					        <Form.Control type="text" placeholder="Resouce name" value={name} onChange={(e) => setName(e.target.value)} />
					      </FloatingLabel>
		        	</Col>
		        	<Col>
								<FloatingLabel controlId="floatingTextarea" label="URL" className="mb-3">
					        <Form.Control type="text" placeholder="Resouce URL" value={url} onChange={(e) => setURL(e.target.value)} />
					      </FloatingLabel>
		        	</Col>
		        </Row>
		        */}

		        <Col>
	        		<FloatingLabel controlId="floatingTextarea" label="Resouce name" className="mb-3">
				        <Form.Control type="text" placeholder="Resouce name" value={name} onChange={(e) => setName(e.target.value)} />
				      </FloatingLabel>
	        	</Col>

		        <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
			        <Form.Control as="textarea" placeholder="Description" style={{height: '100px'}} value={description} onChange={(e) => setDescription(e.target.value)} />
			      </FloatingLabel>

		        {/* upload resources */}
		        <Form.Group controlId="formFileLg" className="mb-3">
			        <Form.Label>Consider zipping large directories for faster uploads</Form.Label>
			        <Form.Control type="file" size="lg" onChange={(e) => setFile(e.target.files[0])} />
			      </Form.Group>
      		</Col>
      	</Row>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="primary" onClick={() => createResouce()}>Update</Button>
      </Modal.Footer>
    </Modal>
	);
}