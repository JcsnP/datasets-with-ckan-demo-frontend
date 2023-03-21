import { Container } from "react-bootstrap";
import StatBox from "./StatBox";

export default function Stats() {
  return(
    <div className="bg-primary">
      <Container className='d-flex align-items-center justify-content-between p-5'>
        <StatBox title="Datasets" api_resource="packages/number" />
        <StatBox title="Organizations" api_resource="organizations/number" />
        <StatBox title="Groups" api_resource="groups/number" />
      </Container>
    </div>
  );
}
