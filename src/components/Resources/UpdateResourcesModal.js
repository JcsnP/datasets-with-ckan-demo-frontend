import React, {useState, useEffect, useRef} from 'react';
import { Modal, Button, Form, Card, Popover, OverlayTrigger, Row, Col, FloatingLabel, Accordion } from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// import components
// import ResourceCard from './ResourceCard.js';

const UpdateResourceCard = ({id, default_name, default_url, default_description, default_metadata_modified, default_format, default_resource_size, deleteResource}) => {
	const [name, setName] = useState(default_name);
	const [url, setUrl] = useState(default_url);
	const [description, setDescription] = useState(default_description);
	const [metadata_modified, setMetadaModified] = useState(default_metadata_modified);
	const [format, setFormat] = useState(default_format);
	const [resource_size, setResourceSize] = useState(default_resource_size);

	const [openAccordion, setOpenAccordion] = useState(false);
	const [newName, setNewName] = useState(name);
	const [newDescription, setNewDescription] = useState(description);
	const [newFile, setNewFile] = useState('');

	const updateResource = async() => {
		let payload = {
			name: newName,
			description: newDescription,
		}

		if(newFile !== '') {
			payload.upload = newFile
		}

		const response = await axios.put(
			`${process.env.REACT_APP_CKAN_API}/packages/resources/${id}`,
			payload,
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: localStorage.getItem('token')
				}
			}
		)
		if(response.data.ok)  {
			// update current data with new update
			setName(response.data.result.name);
			setUrl(response.data.result.url);
			setDescription(response.data.result.description);
			setMetadaModified(response.data.result.metadata_modified);
			setFormat(response.data.result.format);
			setResourceSize(response.data.result.resource_size)
			// now close the accordion
			setOpenAccordion(false);
		}
	}

	return(
		<Accordion defaultActiveKey="-1">
			<Card className='mb-3 shadow-sm'>
				<Card.Body className='d-flex w-100 flex-row align-items-center justify-content-between py-2 px-3'>
					<div className='w-100'>
						<h6 className="fw-bold">{name ? name : 'no title'}</h6>
						<small>{description?.length >= 100 ? description.slice(0, 100) + '...' : description}</small>
						<div className='d-flex gap-3 align-items-center'>
							<small className='text-muted'>{moment(metadata_modified).format('LL')}</small>
							•
							<small className="text-muted">{parseFloat(resource_size / 1024).toFixed(2)} KB</small>
							•
							<small className="border rounded px-2 bg-light text-muted">{format ? format : 'unknow format'}</small>
						</div>
					</div>
					<div className="d-flex gap-1">
						<Button variant="light" className="border">
					  	<a href={url}>
					  		<FontAwesomeIcon icon={faArrowDown} size="sm" />
					  	</a>
					  </Button>
						<Button variant="primary" onClick={() => setOpenAccordion(!openAccordion)}>
					  	<FontAwesomeIcon icon={faPen} size="xs" style={{color: "#ffffff",}} />
					  </Button>
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
					    	<FontAwesomeIcon icon={faTrash} style={{color: "#ffffff",}} size="xs" />
					    </Button>
					  </OverlayTrigger>
					</div>
				</Card.Body>
				<Accordion.Collapse in={openAccordion}>
          <Card.Body>
          	<FloatingLabel controlId="floatingTextarea" label="Resouce name" className="mb-3">
			        <Form.Control type="text" placeholder="Resouce name" value={newName} onChange={(e) => setNewName(e.target.value)} />
			      </FloatingLabel>

			      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
			        <Form.Control as="textarea" placeholder="Description" style={{height: '60px'}} value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
			      </FloatingLabel>

			      <Form.Group controlId="formFileLg">
			        <Form.Control type="file" size="xs" onChange={(e) => setNewFile(e.target.files[0])} />
			      </Form.Group>

			      <div className="d-flex w-100 mt-2 gap-2 align-items-center justify-content-end">
			      	<Button variant="danger" onClick={() => setOpenAccordion(!openAccordion)}>Cancel</Button>
			      	<Button variant="primary" onClick={() => updateResource()}>Save</Button>
			      </div>
          </Card.Body>
        </Accordion.Collapse>
			</Card>
		</Accordion>
	);
}

export default function UpdateResourcesModal({show, close, datasets_resources, datasets_id}) {
	const [resources, setResources] = useState(datasets_resources);
	const [confirmDeletePopoverShow, setConfirmDeletePopoverShow] = useState(false);

	// const [url, setURL] = useState('');
	const [description, setDescription] = useState('');
	const [name, setName] = useState('');
	const [file, setFile] = useState('');

	const fileRef = useRef(null);

	const old_resouces = resources;

	// uploading process
	const [uploadProcessing, setUploadProcessing] = useState(false);

	// create new resouces
	const createResouce = async() => {
		// if user not upload file
		if(file === '' || file === null) {
			return alert('Please select file');
		}

		setUploadProcessing(true);

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

		if(response.data.ok) {
			setName('');
			setDescription('');
			// setURL('');
			setFile(null);
			// clear file selected !!!!!
			fileRef.current.value = '';
			setResources((prevState) => [...prevState, response.data.result])
			setUploadProcessing(false);
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

		// console.log(response)
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
			        		<UpdateResourceCard id={item.id} default_name={item.name} default_url={item.url} default_description={item.description} default_metadata_modified={item.metadata_modified} default_format={item.format} default_resource_size={item.size} deleteResource={() => {deleteResource(item.id)}} />
			        	))
							) : (
								<h1 className="h-100 d-flex justify-content-center align-items-center text-muted text-center">Datasets don't have any resources yet.</h1>
							)							
						}
      		</Col>

      		<Col>
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
			        <Form.Control type="file" size="lg" onChange={e => {setFile(e.target.files[0]); setName(e.target.files[0].name)}} ref={fileRef} />
			      </Form.Group>

      		</Col>
      	</Row>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button
        	variant="primary"
        	disabled={uploadProcessing}
        	onClick={!uploadProcessing ? createResouce : null}
        >
        	{uploadProcessing ? 'Uploading...' : 'Update'}
        </Button>
      </Modal.Footer>
    </Modal>
	);
}