import { Card, Popover, OverlayTrigger, Button } from "react-bootstrap";
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function UserDatasetsCard ({name, notes, metadata_modified}) {
	const popover = (
    <Popover id="popover-basic" style={{ width: "14em" }}>
      <Popover.Body>
        <div className="my-2" style={{ cursor: "pointer" }}>
          Bookmark
        </div>
        <div className="my-2" style={{ cursor: "pointer" }}>
          Edit
        </div>
      </Popover.Body>
    </Popover>
  );
	return (
    <div className="text-decoration-none">
      <Card className="mb-3 rounded-lg shadow-sm" style={{ cursor: "pointer" }}>
        <Card.Body>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <h5>{name}</h5>
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
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
  );
}

/*
	href={`/datasets/${name}`}
	onClick={() => {
		window.location.href = `/datasets/${name}`;
	}}
*/