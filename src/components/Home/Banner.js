import { Button, Container, Form } from "react-bootstrap";

export default function Banner() {
  return(
    <div className='banner'>
      <Container className='text-light fw-bold d-flex flex-column align-items-center h-100 justify-content-center gap-3'>
        <h1>Datasets With CKAN</h1>
        <h4>The Datasets Community</h4>
        <Form className='d-flex w-75 gap-2'>
          <Form.Control type='text' placeholder='Search Datasets' className='py-2' />
          <Button varian='primary'>SEARCH</Button>
        </Form>
      </Container>
    </div>
  );
}