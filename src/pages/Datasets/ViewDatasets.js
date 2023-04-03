import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Stack,
  Badge,
  Table,
  Row,
  Col,
  Tabs,
  Tab,
  Alert,
  Button,
  ToggleButton,
} from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faFile, faPen } from "@fortawesome/free-solid-svg-icons";
import { Oval } from "react-loader-spinner";


// import components
import ResourceCard from "../../components/Resources/ResourceCard.js";
import CreateTopicModal from "../../components/Discussion/CreateTopicModal.js";
import AllTopics from "../../components/Discussion/AllTopics.js";
import ViewTopic from "../../components/Discussion/ViewTopic.js";
import Cookies from "js-cookie";
import UpdateDatasetsModal from "../../components/Datasets/UpdateDatasetsModal.js";
import UpdateResourcesModal from "../../components/Resources/UpdateResourcesModal.js";

export default function ViewDatasets({ title = "Datasets" }) {
  const { datasets_name, topic_id } = useParams();
  document.title = datasets_name;

  const [datasets, setDatasets] = useState({});
  const [datasetsLoaded, setDatasetsLoaded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [topicModalShow, setTopicModalShow] = useState(false);
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailLoadded, setThumbnailLoaded] = useState(false);

  const [updateDatasetsModalShow, setUpdateDatasetsModalShow] = useState(false);
  const [updateResourcesModalShow, setUpdateResourcesModalShow] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_CKAN_API}/packages/${datasets_name}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          setDatasets(data.result);
          setDatasetsLoaded(true);
        }
      }, []);

    // fetch bookmarked status
    axios
      .get(
        `${process.env.REACT_APP_CKAN_API}/packages/bookmarked/${datasets_name}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.bookmarked) {
          setIsBookmarked(true);
        } else {
          setIsBookmarked(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // fetch thumbnail
    fetch(`${process.env.REACT_APP_CKAN_API}/packages/${datasets.id}/thumbnail`)
      .then((response) => response.json())
      .then((data) => {
        if(data.ok) {
          setThumbnail(data.result);
          setThumbnailLoaded(true);
        }
      })
      .catch((error) => console.log(error))
    }, [datasetsLoaded, thumbnailLoadded]);

  const bookmarked = async() => {
    // check current status
    if (isBookmarked) {
      // delete following status
      const response = await axios.delete(
        `${process.env.REACT_APP_CKAN_API}/packages/bookmarked/${datasets.name}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (!response.data.bookmarked) setIsBookmarked(false);
    } else {
      // following dataset
      const response = await axios.post(
        `${process.env.REACT_APP_CKAN_API}/packages/bookmarked/${datasets.name}`,
        {
          datasets_name: datasets.name
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        }
      );

      if (response.data.ok) setIsBookmarked(true);
      else alert('bookmark error')
    }
  };

  /* window.location.pathname.split("/").pop() */
  if (datasetsLoaded) {
    return (
      <Container className="my-5">
        <UpdateDatasetsModal show={updateDatasetsModalShow} close={() => {setUpdateDatasetsModalShow(false)}} datasets={datasets} />
        <UpdateResourcesModal show={updateResourcesModalShow} close={() => {setUpdateResourcesModalShow(false)}} datasets_resources={datasets.resources} datasets_id={datasets.id} />
        <div className="d-flex justify-content-end">
          <div className="d-flex gap-2 h-25">
            {/* edit button */}
            {datasets.creator_user_id === localStorage.getItem("user_id") && (
              <Button variant="primary" onClick={() => {setUpdateDatasetsModalShow(true)}}>
                <FontAwesomeIcon icon={faPen} className='me-2' />
                Edit Datasets
              </Button>
            )}

            {/* bookmark button */}
            <ToggleButton
              className="d-flex gap-2 align-items-center justify-content-between"
              id="toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={isBookmarked}
              value="1"
              onChange={bookmarked}
            >
              {isBookmarked ? (
                <FontAwesomeIcon
                  icon={faBookmark}
                  style={{ color: "#ffffff" }}
                />
              ) : (
                <FontAwesomeIcon icon={faBookmark} />
              )}
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </ToggleButton>
          </div>
        </div>
        <div>
          <Row className="my-4">
            <Col sm={12} md={8}>
              <h1>{datasets.title}</h1>
              <p className="text-muted">{datasets.notes}</p>
            </Col>
            <Col sm={12} md={4} className="text-end my-auto">
              {
                thumbnailLoadded ? (
                  <div>
                    <img src={thumbnail ? `data:image/png;base64,${thumbnail}` : null} alt="thumbnail" height="180" className="rounded" />
                  </div>
                ) : (
                  <img src={process.env.PUBLIC_URL + '/images/default_thumbnail.png'} alt="default_thumbnail" height="180" className="rounded" />
                )
              }
            </Col>
          </Row>
        </div>
        <hr />
        <Tabs
          className="mb-3"
          defaultActiveKey={
            window.location.pathname.split("/")[3] === "discussion"
              ? "discussion"
              : "data"
          }
        >
          <Tab eventKey="data" title="Data">
            {/* data, home */}
            <>
              {datasets.tags.length > 0 && (
                <Card body className="w-100">
                  {datasets.tags?.map((item, key) => (
                    <Badge
                      bg="light"
                      text="dark"
                      className="py-1 px-2 border me-1"
                      key={key}
                    >
                      {item.name}
                    </Badge>
                  ))}
                </Card>
              )}

              {
                datasets.creator_user_id === localStorage.getItem("user_id") && (
                  <div className="d-flex align-items-center justify-content-between my-3">
                    <h4 className="mt-4">Resources</h4>
                    <Button variant="outline-primary" onClick={() => {setUpdateResourcesModalShow(true)}}>
                      <FontAwesomeIcon icon={faFile} className='me-2' />
                      Edit Resources
                    </Button>
                  </div>
                )
              }
              
              <Row className="my-4">
                <Col sm={8}>
                  {/* resource view */}
                  {datasets.resources.map((item, key) => (
                    <ResourceCard
                      name={item.name}
                      url={item.url}
                      description={item.description}
                      metadata_modified={item.metadata_modified}
                      format={item.format}
                      resource_size={item.size}
                    />
                  ))}

                  {/* if datasets has non resource */}
                  {datasets.resources.length === 0 && (
                    <Alert variant="warning">No Resouce</Alert>
                  )}
                </Col>
                <Col sm={4}>
                  <h5 className="text-end fw-bold">Data</h5>
                </Col>
              </Row>

              {/* additional details */}
              <h4>Additional Details</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>type</td>
                    <td>{datasets.type}</td>
                  </tr>
                  <tr>
                    <td>author</td>
                    <td>{datasets.author}</td>
                  </tr>
                  <tr>
                    <td>author email</td>
                    <td>{datasets.author_email}</td>
                  </tr>
                  <tr>
                    <td>license title</td>
                    <td>{datasets.license_title}</td>
                  </tr>
                  <tr>
                    <td>license url</td>
                    <td>{datasets.license_url}</td>
                  </tr>
                  <tr>
                    <td>created</td>
                    <td>{moment(datasets.metadata_created).format("LLL")}</td>
                  </tr>
                  <tr>
                    <td>modified</td>
                    <td>{moment(datasets.metadata_modified).format("LLL")}</td>
                  </tr>
                  <tr>
                    <td>resources</td>
                    <td>{datasets.num_resources}</td>
                  </tr>
                </tbody>
              </Table>
            </>
          </Tab>
          <Tab eventKey="discussion" title="Discussion">
            <>{/* discussion */}</>
            <CreateTopicModal
              package_id={datasets.id}
              show={topicModalShow}
              close={() => {
                setTopicModalShow(false);
              }}
            />

            {/* all topics */}
            {datasets_name && !topic_id && (
              <>
                <div className="w-100 d-flex flex-rows align-items-center justify-content-between my-5">
                  <h4 className="fw-bold">Discussions</h4>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setTopicModalShow(true);
                    }}
                  >
                    New Topic
                  </Button>
                </div>
                <AllTopics package_id={datasets.id} />
              </>
            )}
            {/* display topic and comment */}
            {topic_id && <ViewTopic />}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
