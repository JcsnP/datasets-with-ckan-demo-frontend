import React, {useState, useEffect} from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import { Link } from "react-router-dom";

export default function AllTopics({package_id}) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_CKAN_API}/discussion/${package_id}/topics`)
      .then((response) => response.json())
      .then((data) => {
        if(data.ok) {
          setTopics(data.result);
        }
      })
  }, [])

  const TopicCard = ({id, title, created, user_name, user_image_url}) => {
    return (
      <Link
        to={`${window.location.href}/topics/${id}`}
        className="text-decoration-none"
      >
        <Card className="w-100 mb-3 shadow-sm">
          <Card.Body className="d-flex flex-rows align-items-center justify-content-start gap-3">
            <div className="d-flex flex-rows align-items-center justify-content-between">
              <img
                src={user_image_url}
                alt="user_image"
                className="rounded-circle p-1 border"
                width={48}
                height={48}
              />
            </div>
            <div>
              <h5>{title}</h5>
              <small className="text-decoration-underline" text-muted>
                {user_name}
              </small>
              <span> • </span>
              <small className="text-muted">
                Created at {moment(created).format("LL")}
              </small>
            </div>
          </Card.Body>
        </Card>
      </Link>
    );
  }

  return (
    <>
      {topics.map((item, key) => (
        <TopicCard
          id={item.id}
          title={item.title}
          created={item.created}
          user_name={item.user_name}
          user_image_url={item.user_image_url}
          key={key}
        />
      ))}
    </>
  );
}