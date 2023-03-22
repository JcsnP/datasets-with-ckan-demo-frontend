import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import moment from 'moment';

// import components
import UserDatasetsCard from '../../components/Profile/UserDatasetsCard.js';
import CreateInitialDatasetsModal from '../../components/Datasets/CreateInitialDatasetsModal.js';

export default function Profile() {
  const {user_name} = useParams();
  document.title = user_name;

  const [userDetails, setUserDetails] = useState({});
  const [userDetailLoaded, setUserDetailsLoaded] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async() => {
      const response = await axios.get(
        `${process.env.REACT_APP_CKAN_API}/users/${user_name}`,
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      )
      if(response.data.ok) {
        setUserDetails(response.data.result);
        setUserDetailsLoaded(true);
      }
    }

    fetchUserDetails();

  }, []);
  
  if(userDetailLoaded) {
    return(
      <Container>
        <CreateInitialDatasetsModal show={show} close={() => setShow(false)} />
        <Row className='my-4'>
          <Col sm={4}>
            {/* user profile card */}
            <Card className='rounded-lg p-4 shadow-sm'>
              <Card.Body>
                <div className='d-flex align-items-center justify-content-between'>
                  <img className='rounded-circle' src={userDetails.image_display_url} alt='profile-image' width={100} height={100} />
                  <div>
                    <h4 className='fw-bold text-end'>{userDetails.fullname}</h4>
                    <p className='text-muted'>
                      join at {moment(userDetails.created).format('LL')}
                    </p>
                  </div>
                </div>

                <hr />

                {/* bio */}
                <div>
                  <h5 className='text-uppercase text-muted'>bio</h5>
                  <p>{userDetails.bio ? userDetails : 'no bio'}</p>
                </div>

                {/* organizaionts */}
                <div>
                  <h5 className='text-uppercase text-muted'>organizaionts</h5>
                  <p>{userDetails.bio ? userDetails : 'no organizaionts'}</p>
                </div>

                {/* groups */}
                <div>
                  <h5 className='text-uppercase text-muted'>groups</h5>
                  <p>{userDetails.bio ? userDetails : 'no groups'}</p>
                </div>

                {/* buttons */}
                <div className='d-flex gap-2'>
                  <Button variant='primary' className='w-100'>Edit Profile</Button>
                  <Button variant='success' className='w-100' style={{color: '#FFF'}} onClick={() => {setShow(true)}}>Upload Datasets +</Button>
                </div>


              </Card.Body>  
            </Card>
          </Col>
          <Col sm={8}>
            {/* my datasets */}
            {/* show the datasets if user has datasets */}
            <h1>Datasets</h1>
            {
              userDetails.datasets.map((item, key) => (
                <UserDatasetsCard name={item.name} notes={item.notes} metadata_modified={item.metadata_modified} key={key} />
              ))
            }
          </Col>
        </Row>
      </Container>
    );
  }
}
