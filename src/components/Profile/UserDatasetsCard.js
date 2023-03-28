import React, {useState, useEffect} from 'react';
import { Card, Popover, OverlayTrigger, Button, Modal } from "react-bootstrap";
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export default function UserDatasetsCard ({name, notes, metadata_modified}) {
  const [show, setShow] = useState(false);
  const DeleteModal = ({show, close}) => {
    return (
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure ?</Modal.Title>
        </Modal.Header>
        <Modal.Body className='lh-lg'>
          Are you sure you want to delete <span className='border rounded px-2 shadow-sm bg-light'>{name}</span> datasets ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={close}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deletePackage(name);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const deletePackage = async(name) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_CKAN_API}/packages/${name}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      },
    );
    if(response.data.ok) {
      window.location.reload();
    }
  }

	const popover = (
    <Popover id="popover-basic" style={{ width: "14em" }}>
      <Popover.Body>
        <div className="my-2" style={{ cursor: "pointer" }}>
          Bookmark
        </div>
        <div className="my-2" style={{ cursor: "pointer" }}>
          Edit
        </div>
        <div className="my-2 text-danger" style={{ cursor: "pointer" }} onClick={() => {setShow(true)}}>
          Delete
        </div>
      </Popover.Body>
    </Popover>
  );

	return (
    <>
      <DeleteModal
        show={show}
        close={() => {
          setShow(false);
        }}
      />
      <div className="text-decoration-none">
        <Card
          className="mb-3 rounded-lg shadow-sm"
          style={{ cursor: "pointer" }}
        >
          <Card.Body>
            <div className="d-flex flex-row align-items-center justify-content-between">
              <a
                className="text-dark text-decoration-none"
                href={`/datasets/${name}`}
              >
                <h5>{name}</h5>
              </a>
              <OverlayTrigger
                trigger="click"
                placement="right"
                overlay={popover}
                rootClose
              >
                <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
              </OverlayTrigger>
            </div>
            <div className="d-flex align-items-center justify-content-between text-muted">
              <small>
                {notes?.length
                  ? notes?.length >= 85
                    ? notes.slice(0, 85) + "..."
                    : notes
                  : "no description"}
              </small>
              <small>{moment(metadata_modified).format("LLL")}</small>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

/*
	href={`/datasets/${name}`}
	onClick={() => {
		window.location.href = `/datasets/${name}`;
	}}
*/