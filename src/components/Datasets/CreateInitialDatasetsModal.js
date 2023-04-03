import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Card,
  Dropdown,
  DropdownButton,
  FloatingLabel,
  Row,
  Col
} from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

// import components
import AlertBox from "../AlertBox.js";

export default function CreateInitialDatasetsModal({ show, close }) {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [source, setSource] = useState("");
  const [success, setSuccess] = useState(false);

  const createDatasets = async () => {
    console.log(link, title, notes );
    const response = await axios.post(
      `${process.env.REACT_APP_CKAN_API}/packages/`,
      {
        title: title,
        name: title.toLowerCase().replaceAll(",", "").replaceAll(" ", "-"),
        notes: notes,
        url: source,
        author: localStorage.getItem('username')
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    
    if (response.data.ok) {
      // show success modal
      setSuccess(true);
      // then close modal and reload page
      setTimeout(() => {
        close();
        // window.location.replace("");
        // redirect to datasets pages
        window.location.href = `/datasets/${response.data.result.name}`;
      }, 2000);
    }
  };

  if (!success) {
    return (
      <>
        <Modal
          size="lg"
          show={show}
          onHide={close}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Datasets</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <FloatingLabel controlId="floatingTextarea" label="Datasets Title" className="mb-3">
              <Form.Control type="text" placeholder='title' className="mb-2" value={title} onChange={(e) => {setTitle(e.target.value)}} />
              <Form.Text id="newDatasetsName" muted>Your datasets link will be : http://127.0.0.1:3000/datasets/
                <span className="border px-1 w-100 rounded bg-light">{title.length === 0 ? "<datasets name>" : title.toLowerCase().replaceAll(",", "").replaceAll(" ", "-")}</span>
              </Form.Text>
            </FloatingLabel>

            <FloatingLabel controlId="floatingTextarea" label="Source" className="mb-3">
              <Form.Control type="text" placeholder="source, url" value={source} onChange={(e) => {setSource(e.target.value)}} />
            </FloatingLabel>

            <FloatingLabel controlId="floatingTextarea2" label="Notes" className="mb-3">
              <Form.Control as="textarea" placeholder="Leave a Noes here" style={{ height: '100px' }} value={notes} onChange={(e) => {setNotes(e.target.value)}} />
            </FloatingLabel>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={close}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                createDatasets();
              }}
            >
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Modal size="md" show={true} backdrop="static" keyboard={false}>
          <Modal.Body
            className="d-flex align-items-center justify-content-center w-100"
            style={{ height: "15em" }}
          >
            <div
              className="text-center"
              style={{ fontSize: "4em", color: "#4BB543" }}
            >
              <FontAwesomeIcon icon={faCircleCheck} size="xl" />
              <h1>Success</h1>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
