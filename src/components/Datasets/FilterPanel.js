import React, { useState, useEffect } from "react";
import { Container, Card, Badge, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

// import components
// import FilterBox from './FilterPanel.js';

export default function FilterPanel() {
  const [tags, setTags] = useState([]);
  const [groups, setGroups] = useState([]);
  const [organizations, setOrganizations] = useState([]);

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

  const handleTagClick = (tag) => {
    // Parse current query string
    const searchParams = new URLSearchParams(window.location.search);
    // Get existing tags, if any
    const existingTags = searchParams.getAll('tags');
    // Add new tag to list of existing tags
    const tags = [...existingTags, tag];
    // Generate new query string with updated tags
    const newSearchParams = new URLSearchParams();
    for (const t of tags) {
      newSearchParams.append('tags', t);
    }
    const newQueryString = newSearchParams.toString();
    // Navigate to new URL
    window.location.href = window.location.href + newQueryString;
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
            <ListGroup.Item className="rounded mb-1" onClick={() => handleTagClick(item)} key={key}>{item}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  );
}
