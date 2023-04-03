import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function AlertModal({title, message, redirect, show, close, center = false}) {
	return(
		<Modal 
			show={show}
			onHide={close}
			backdrop="static"
      keyboard={false}
      centered={center}
		>

      <Modal.Header closeButton>
        <Modal.Title>{message === 'Register Success' ? 'Success' : 'Failed'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        {
        	message === 'Register Success' ? (
        		<Button variant="primary" onClick={() => {window.location.href='/login'}}>
		          OK
		        </Button>
        	) : (
        		<Button variant="danger" onClick={close}>
		          OK
		        </Button>
        	)
        }
      </Modal.Footer>
    </Modal>
);
}