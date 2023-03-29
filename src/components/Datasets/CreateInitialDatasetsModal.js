import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Card,
  Dropdown,
  DropdownButton,
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
  const [success, setSuccess] = useState(false);

  const createDatasets = async () => {
    console.log(link, title, notes );
    const response = await axios.post(
      `${process.env.REACT_APP_CKAN_API}/packages/`,
      {
        title: title,
        name: link.toLowerCase().replaceAll(",", "").replaceAll(" ", "-"),
        notes: notes,
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
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Datasets</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3 fw-bold">
                <Form.Label>Datasets Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Datasets Title"
                  onChange={(e) => {
                    setLink(e.target.value);
                    setTitle(e.target.value);
                  }}
                />
                <Form.Text className="text-muted d-flex gap-1 align-items-center">
                  http://127.0.0.1:5001/datasets/
                  <div className="border w-100 border rounded p-1">
                    {link.length === 0
                      ? "‎"
                      : link
                          .toLowerCase()
                          .replaceAll(",", "")
                          .replaceAll(" ", "-")}
                  </div>
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formFileMultiple" className="mb-2 fw-bold">
                <Form.Label>Multiple files input example</Form.Label>
                <Form.Control type="file" multiple />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Datasets Title"
                  onChange={(e) => {
                    setNotes(e.target.value);
                  }}
                  style={{ height: "100px" }}
                />
              </Form.Group>
            </Form>
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
