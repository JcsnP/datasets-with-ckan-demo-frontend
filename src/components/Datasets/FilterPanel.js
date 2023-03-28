import React, {useState, useEffect} from 'react';
import { Container, Card, Badge } from 'react-bootstrap';

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
        <h4 className='fw-bold'>Tags</h4>
        {tags.map(item => <Badge bg='primary' className='me-1'>{item}</Badge>)}
      </div>
    </Container>
  );
}