import { Table } from 'react-bootstrap';
import moment from 'moment';

export default function AdditionalDetailsTable({type, author, author_email, metadata_created, metadata_modified, num_resources}) {
	return(
		<>
			<h4>Additional Details</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>type</td>
            <td>{type}</td>
          </tr>
          <tr>
            <td>author</td>
            <td>{author}</td>
          </tr>
          <tr>
            <td>author email</td>
            <td>{author_email}</td>
          </tr>
          <tr>
            <td>created</td>
            <td>{moment(metadata_created).utcOffset('+1400').format('LLL')}</td>
          </tr>
          <tr>
            <td>modified</td>
            <td>{moment(metadata_modified).utcOffset('+1400').format('LLL')}</td>
          </tr>
          <tr>
            <td>resources</td>
            <td>{num_resources}</td>
          </tr>
        </tbody>
      </Table>
		</>
	);
}