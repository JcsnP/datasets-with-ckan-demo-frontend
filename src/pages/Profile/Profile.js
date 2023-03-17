import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

// import components
import ProfileCard from "../../components/Profile/ProfileCard";

export default function Profile() {
  const [user, setUser] = useState({});
  const [userLoaded, setUserLoaded] = useState(false);
  useEffect(() => {
    const fetchUser = async() => {
      const response = await axios.get(
        'http://127.0.0.1:5001/ckanapi/v1/users/me',
        {
          'headers': {
            'Authorization': localStorage.getItem('token')
          }
        }
      );
      if(response.status === 200) {
        setUser(response.data.details);
        setUserLoaded(true);
      }
    }
    fetchUser();
  }, []);

  return(
    <Container>
      <Row>
        <Col sm={4} className='h-100'>
          {/* profile card */}
          <ProfileCard name={user.name} fullname={user.fullname} image_url={user.image_url} about={user.about} email={user.email}  />
        </Col>
        <Col sm={8} className='bg-warning h-100'>
          sd
        </Col>
      </Row>
    </Container>
  );
}