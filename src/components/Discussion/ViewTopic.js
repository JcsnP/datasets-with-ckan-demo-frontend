import React, { useState, useEffect } from 'react';
import { Card, Modal, Button, Badge } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import moment from 'moment';
import { Link } from "react-router-dom";
import CreateComment from './CreateComment';

export default function ViewTopicModal() {
  const { topic_id } = useParams();
  const [topic, setTopics] = useState({});
  const [comments, setComments] = useState({});

  const [topicLoaded, setTopicLoaded] = useState(false);
  const [commentLoaded, setCommentLoaded] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_CKAN_API}/discussion/topic/${topic_id}`)
      .then((response) => response.json())
      .then((data) => {
        if(data.ok) {
          setTopics(data.result);
          setTopicLoaded(true);
        }
      })

    fetch(`${process.env.REACT_APP_CKAN_API}/discussion/comments/${topic_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          setComments(data.result);
          setCommentLoaded(true);
        }
      });
  }, []);

  const CommentCard = ({id, body, created, user_name, user_image_url}) => {
    return (
      <Card className="mb-2 border-0">
        <Card.Body>
          <div className="d-flex align-items-start gap-3">
            <img
              src={user_image_url}
              alt="author-profile"
              className="rounded-circle p-1 border"
              width={48}
              height={48}
            />
            <div>
              <div className="d-flex align-items-start">
                <div>
                  <span className="d-block text-muted fw-bold">
                    {user_name}
                  </span>
                  <span className="d-block text-muted">
                    {moment(created).format("LL")}
                  </span>
                </div>
                {topic.user_name === user_name && (
                  <h5 className="ms-4">
                    <Badge bg="secondary">Topic owner</Badge>
                  </h5>
                )}
              </div>
              <p className="mt-4">{body}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      {topicLoaded && (
        <Card className="border-0">
          <Link to={`${window.location.pathname.split("/topics")[0]}`}>
            {" "}
            Back
          </Link>
          <Card.Body>
            <div className="d-flex align-items-center gap-3">
              <img
                src={topic.user_image_url}
                alt="author-profile"
                className="rounded-circle p-1 border"
                width={48}
                height={48}
              />
              <span className="text-muted fw-bold">{topic.user_name}</span>
              <span className="text-muted">{moment(topic).format("LL")}</span>
            </div>
            <div className="my-4">
              <h3 className="fw-bold">{topic.title}</h3>
              <p className="text-muted my-4">{topic.body}</p>
            </div>
          </Card.Body>
        </Card>
      )}

      <hr />

      {/* add comment */}
      <CreateComment topic_id={topic_id} />

      {commentLoaded &&
        comments.map((item, key) => (
          <CommentCard
            id={item.id}
            body={item.body}
            created={item.created}
            user_name={item.user_name}
            user_image_url={item.user_image_url}
            key={key}
          />
        ))}
    </>
  );
}