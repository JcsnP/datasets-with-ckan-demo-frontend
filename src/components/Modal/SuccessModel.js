import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function SuccessModal({title, message, redirect, close, center = false}) {
	const [show, setShow] = useState(true);

	const handleClose = () => setShow(false);
	return(
		<Modal 
			show={show}
			backdrop="static"
      keyboard={false}
      centered={center}
		>

      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
      	{
      		close && (
	      		<Button variant="secondary" onClick={handleClose}>
		          Close
		        </Button>
	        )
      	}
        <Button variant="primary" onClick={() => {window.location.href=redirect}}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
);
}