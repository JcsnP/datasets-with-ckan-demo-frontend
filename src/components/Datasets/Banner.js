import { Container, Form, Button } from "react-bootstrap";

export default function Banner() {
  return(
    <div className='banner'>
      <Container className='text-light fw-bold d-flex flex-column align-items-center h-100 justify-content-center gap-3'>
        <h1>All Datasets</h1>
        <h4>Explore, analyze, and share quality data</h4>
      </Container>
    </div>
  );
}