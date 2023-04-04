import { Container } from "react-bootstrap";
import StatBox from "./StatBox";

export default function Stats() {
  return(
    <div className="bg-primary">
      <Container className='d-flex align-items-center justify-content-center p-5'>
        <StatBox title="Total number of datasets" api_resource="packages/number" />
      </Container>
    </div>
  );
}
