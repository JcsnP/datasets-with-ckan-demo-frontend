import { Container } from "react-bootstrap";

export default function Footer() {
  return(
    <div className='py-4 w-100' style={{backgroundColor: '#002B5B', position: 'absolute'}}>
      <Container className='text-light fw-bold d-flex align-items-center justify-content-between'>
        <div>
          <h2>Dataset storage and management system</h2>
          <h2>using CKAN opensource tool.</h2>
        </div>
        <div className='text-center'>
          <img src="https://avatars.githubusercontent.com/u/1630326?s=280&v=4" alt='ckan-logo' width={100} />
          <p>Powered By CKAN</p>
        </div>
      </Container>
    </div>
  );
}