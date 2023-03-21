import { Button, Container, Form } from "react-bootstrap";
import SearchDatasets from "../Search/SearchDatasets";

export default function Banner() {
  return(
    <div className='banner'>
      <Container className='text-light fw-bold d-flex flex-column align-items-center h-100 justify-content-center gap-3'>
        <h1>Datasets With CKAN</h1>
        <h4>The Datasets Community</h4>
        
        {/* search datasets */}
        <SearchDatasets width={50} />
      </Container>
    </div>
  );
}