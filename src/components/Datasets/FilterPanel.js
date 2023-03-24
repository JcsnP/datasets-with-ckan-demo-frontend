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

        fetch(`${process.env.REACT_APP_CKAN_API}/groups`)
        .then((response) => response.json())
        .then((data) => {
          if(data.ok) {
            setGroups(data.result);
          }
        })

        fetch(`${process.env.REACT_APP_CKAN_API}/organizations`)
        .then((response) => response.json())
        .then((data) => {
          if(data.ok) {
            setOrganizations(data.result);
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

      <div className='p-4'>
        <h4 className='fw-bold'>Organizations</h4>
        {organizations.map(item => <Badge bg='primary' className='me-1'>{item.title}</Badge>)}
      </div>

      <div className='p-4'>
        <h4 className='fw-bold'>Groups</h4>
        {groups.map(item => <Badge bg='primary' className='me-1'>{item.title}</Badge>)}
      </div>
    </Container>
  );
}