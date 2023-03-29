import React, {useState, useEffect} from 'react';
import { Container, Card, Badge, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons'

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
          if(data.ok) {
            setTags(data.result);
          }
        })
    } catch(error) {
      console.log(error);
    }
  }, []);

  return(
    <Container>
      <div className='p-4'>
        <h4 className='fw-bold'>
          <FontAwesomeIcon icon={faTag} size="sm" />
          Tags
        </h4>
        <ListGroup variant="flush">
        {
          tags.map((item,key) => 
            <a href={`${window.location.href}&tags=${item}`} className='text-decoration-none' key={key}>
              <ListGroup.Item className='rounded mb-1'>{item}</ListGroup.Item>
            </a>
          )
        }
        </ListGroup>
      </div>
    </Container>
  );
}