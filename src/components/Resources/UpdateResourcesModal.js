import React, {useState, useEffect} from 'react';
import { Modal, Button, Form, Card, Popover, OverlayTrigger } from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// import components
// import ResourceCard from './ResourceCard.js';

const UpdateResourceCard = ({id, name, url, metadata_modified, format, resource_size}) => {
	const deleteResource = async() => {
		const response = await axios.delete(
			`${process.env.REACT_APP_CKAN_API}/packages/resources/${id}`,
			{
				headers: {
					Authorization: localStorage.getItem('token')
				}
			}
		);

		if(response.data.ok) {
			window.location.reload()
		}
	}
	return(
		<Card className='mb-3 shadow-sm'>
			<Card.Body className='d-flex w-100 flex-row align-items-center justify-content-between'>
				<div className='w-100'>
					<h4>{name ? name : 'no title'}</h4>
					<div className='d-flex gap-3'>
						<small className='text-muted'>{moment(metadata_modified).format('LL')}</small>
						•
						<small className="text-muted">{(resource_size / 1024).toPrecision(2)} KB</small>
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
	                <Button variant="danger" className="border" onClick={() => {deleteResource()}}>Delete !</Button>
	              </Popover.Body>
	            </Popover>
						}>
				    <Button variant="danger">
				    	<FontAwesomeIcon icon={faX} style={{color: "#ffffff",}} size="sm" />
				    </Button>
				  </OverlayTrigger>
				</div>
			</Card.Body>
		</Card>
	);
}

export default function UpdateResourcesModal({show, close, datasets_resources}) {
	const [resources, setResources] = useState(datasets_resources);
	const [confirmDeletePopoverShow, setConfirmDeletePopoverShow] = useState(false);

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
        {
        	resources.map((item, key) => (
        		<UpdateResourceCard id={item.id} name={item.name} url={item.url} metadata_modified={item.metadata_modified} format={item.format} resource_size={item.size} />
        	))
        }


        {/* upload resources */}
        <Form.Group controlId="formFileLg" className="mb-3">
	        <Form.Label>Consider zipping large directories for faster uploads</Form.Label>
	        <Form.Control type="file" size="lg" />
	      </Form.Group>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
	);
}