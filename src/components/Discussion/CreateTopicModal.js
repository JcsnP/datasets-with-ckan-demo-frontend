import React, { useState } from 'react';
import {Modal, Button, Form, FloatingLabel} from 'react-bootstrap';
import axios from 'axios';

export default function CreateTopicModal({package_id, show, close}) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const createTopic = async() => {
    const response = await axios.post(
      `${process.env.REACT_APP_CKAN_API}/discussion/topics`,
      {
        package_id: package_id,
        title: title,
        body: body,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    if(response.data.ok) {
      close();
      window.location.reload();
    }
  }

  return (
    <>
      <Modal
        show={show}
        onHide={close}
        backdrop="static"
        keyboard={false}
        size='md'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>New Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <FloatingLabel controlId="floatingTextarea" label="Topic Title" className="mb-3">
            <Form.Control type="text" placeholder="Topic Title" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea" label="Message" className="mb-3">
            <Form.Control as="textarea" placeholder="Leave your message here." value={body} onChange={(e) => {setBody(e.target.value)}} style={{ height: "100px" }} />
          </FloatingLabel>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={close}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createTopic}>Create Topic</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}