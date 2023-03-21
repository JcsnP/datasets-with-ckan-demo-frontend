import { Container } from "react-bootstrap";
import StatBox from "./StatBox";

export default function Stats() {
  return(
    <div className="bg-primary">
      <Container className='d-flex align-items-center justify-content-between p-5'>
        <StatBox title="Datasets" value={25} />
        <StatBox title="Organizations" value={5} />
        <StatBox title="Groups" value={3} />
      </Container>
    </div>
  );
}
/* pexels-spolyakov-11126979 1 */
