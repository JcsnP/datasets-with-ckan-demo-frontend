import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Card, Badge, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

// import components
// import FilterBox from './FilterPanel.js';

export default function FilterPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);

  const query_tags = searchParams.getAll('tags');

  useEffect(() => {
    try {
      fetch(`${process.env.REACT_APP_CKAN_API}/tags`)
        .then((response) => response.json())
        .then((data) => {
          if (data.ok) {
            setTags(data.result);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const addTag = (tag) => {
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.set('tags', tag);
      return newSearchParams;
    })
  }

  const handleClick = (tag) => {
    addTag(tag);
  }

  return (
    <Container>
      <div className="p-4">
        <h4 className="fw-bold">
          <FontAwesomeIcon icon={faTag} size="sm" />
          Tags
        </h4>
        <ListGroup variant="flush">
          {tags.map((item, key) => (
            <ListGroup.Item
              className={`rounded mb-1 ${query_tags.includes(item) ? 'bg-light' : ''}`}
              onClick={() => handleClick(item)}
              style={{cursor: 'pointer'}} 
              key={key}
            >
              {item}
              
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  );
}
