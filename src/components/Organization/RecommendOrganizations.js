import React, { useState, useEffect } from "react";
import { Container, Row, Col, Placeholder, Card } from "react-bootstrap";
import OrganizationCard from "./OrganizationCard";

export default function RecommendOrganizations() {
  const [organizations, setOrganizations] = useState([]);
  const [organizatoinsLoaded, setOrganizationsLoaded] = useState(false);
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_CKAN_API}/organizations?order_by=packages`)
      .then((response) => response.json())
      .then((data) => {
        if(data.ok) {
          setOrganizations(data.result);
         setOrganizationsLoaded(true);
        }
      })
  }, []);

  return(
    <div className='py-5' style={{backgroundColor: '#D9D9D9'}}>
      <Container>
        <h1 className='fw-bold'>Organizations</h1>
        <h4 className='text-muted'>รายการองค์กรที่แนะนำ</h4>

        {
          organizatoinsLoaded && (
            <Row>
              {
                organizations.map((item, key) => (
                  <Col sm={6} lg={3}>
                    <OrganizationCard display_name={item.display_name} name={item.name} image_display_url={item.image_display_url} description={item.description} num_followers={item.num_followers} package_count={item.package_count} />
                  </Col>
                ))
              }
            </Row>
          )
        }

        {
          !organizatoinsLoaded && (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png" />
              <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                  <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
              </Card.Body>
            </Card>
          )
        }
      </Container>
    </div>
  );
}