import React, { useState } from 'react';
import { Button, Modal, Form, Card } from 'react-bootstrap';

export default function CreateInitialDatasetsModal({show, close}) {
	const [link, setLink] = useState('');
	const [title, setTitle] = useState('');
	const [notes, setNotes] = useState('');
	return(
		<>
      <Modal
        show={show}
        onHide={close}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Datasets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        	<Form>
	          <Form.Group className='mb-3'>
	          	<Form.Label>Datasets Title</Form.Label>
	          	<Form.Control type="text" placeholder="Enter Datasets Title" onChange={(e) => {setLink(e.target.value); setTitle(e.target.value)}} />
	          	<Form.Text className="text-muted d-flex gap-1 align-items-center">
	          		http://127.0.0.1:5001/datasets/
	          		<div className='border w-100 border rounded p-1'>
	          			{link.length === 0 ? '‎' : link.replaceAll(' ', '-')}
	          		</div>
	          	</Form.Text>
	          </Form.Group>

	          <Form.Group className='mb-2'>
	          	<Form.Label className='fw-bold'>Notes</Form.Label>
	          	<Form.Control as="textarea" placeholder="Enter Datasets Title" onChange={(e) => {setNotes(e.target.value)}} style={{ height: '100px' }} />
	          </Form.Group>
	         </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
	);
}