import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Row, Col, Tabs, Tab } from "react-bootstrap";
import { useParams, useLocation } from 'react-router-dom';
import moment from 'moment';
import { Oval } from 'react-loader-spinner';

// import components
import UserDatasetsCard from '../../components/Profile/UserDatasetsCard.js';
import CreateInitialDatasetsModal from '../../components/Datasets/CreateInitialDatasetsModal.js';
import Bookmarked from '../../components/Profile/Bookmarked.js';

export default function Profile() {
  const {user_name} = useParams();
  const { hash } = useLocation();
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
          <Col sm={12} md={4}>
            {/* user profile card */}
            <Card className='rounded-lg p-4 shadow-sm mb-4'>
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
                  <Button variant='success' className='w-100' style={{color: '#FFF'}} onClick={() => {setShow(true)}}>New Datasets +</Button>
                </div>


              </Card.Body>  
            </Card>
          </Col>
          <Col sm={12} md={8}>
            <Tabs defaultActiveKey={hash === '#bookmarked' ? 'bookmarked' : 'datasets'}>
              <Tab eventKey="datasets" title="My Datasets" className='py-3'>
                {/* my datasets */}
                {/* show the datasets if user has datasets */}
                {
                  userDetails.datasets.map((item, key) => (
                    <UserDatasetsCard name={item.name} notes={item.notes} metadata_modified={item.metadata_modified} key={key} />
                  ))
                }
              </Tab>
              {
                localStorage.getItem('username') === userDetails.name && (
                  <Tab eventKey="bookmarked" title="Bookmarked" id='#bookmarked' className='py-3'>
                    {/* my bookmarked */}
                    <Bookmarked />
                  </Tab>
                )
              }
            </Tabs>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return(
      <Container className='d-flex align-items-center justify-content-center h-100 w-100'>
        <Oval
          height={80}
          width={80}
          color="#002B5B"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#b4b6b8"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
        </Container>
    );
  }
}
