import { Card } from 'react-bootstrap';
import moment from 'moment';

export default function UserDatasetsCard ({name, notes, metadata_modified}) {
	return(
		<a href={`/datasets/${name}`} className='text-decoration-none'>
			<Card className='mb-3 rounded-lg shadow-sm' onClick={() => {window.location.href = `/datasets/${name}`}} style={{cursor: 'pointer'}}>
				<Card.Body>
					<Card.Title className='text-dark fw-bold'>{name}</Card.Title>
					<div className='d-flex align-items-center justify-content-between text-muted'>
						<small>{notes?.length ? notes?.length >= 85 ? notes.slice(0, 85) + '...' : notes : 'no description'}</small>
						<small>{moment(metadata_modified).format('LLL')}</small>
					</div>
				</Card.Body>
			</Card>
		</a>
	);
}