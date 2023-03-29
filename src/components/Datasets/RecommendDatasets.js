import React, {useState, useEffect} from "react";
import { Container, Row, Col, Card, Placeholder } from "react-bootstrap";

// import components
import DatasetsCard from "./DatasetsCard";

export default function RecommendDatasets() {
  const [datasets, setDatasets] = useState([]);
  const [datasetsLoaded, setDatasetsLoaded] = useState(false);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_CKAN_API}/packages`)
      .then((response) => response.json())
      .then((data) => {
        if(data.ok) {
          setDatasets(data.result);
          setDatasetsLoaded(true);
        }
      })
  }, []);
  return(
    <Container className='py-5'>
      <h1 className='fw-bold'>Datasets</h1>
      <h4 className='text-muted'>รายการดาต้าเซ็ทที่แนะนำ</h4>

      {
        datasetsLoaded && (
          <Row>
            {
              datasets.map((item, key) => (
                <Col sm={6} lg={3}>
                  <DatasetsCard id={item.id} name={item.name} title={item.title} image={item.image} notes={item.notes} author={item.author} metadata_modified={item.metadata_modified} />
                </Col>
              ))
            }
          </Row>
        )
      }

      {
          !datasetsLoaded && (
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
              </Card.Body>
            </Card>
          )
        }

    </Container>
  );
}