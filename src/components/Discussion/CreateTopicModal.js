import React, { useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import axios from 'axios';

export default function CreateTopicModal({package_id, show, close}) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const createTopic = async() => {
    const response = await axios.post(
      "http://127.0.0.1:5001/ckanapi/v1/discussion/topics",
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
          <Form.Group className="mb-3">
            <Form.Label>Topic Title</Form.Label>
            <Form.Control type="text" placeholder="Topic Title" value={title} onChange={(e) => {setTitle(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Topic Title</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Topic Title"
              style={{ height: "100px" }}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Form.Group>
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