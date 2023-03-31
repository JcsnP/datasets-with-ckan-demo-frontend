import {Card} from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

export default function ResourceCard({name, url, metadata_modified, format, resource_size}) {
	return(
		<Card className='mb-3 shadow-sm'>
			<Card.Body className='d-flex w-100 flex-row align-items-center justify-content-between'>
				<div className='w-100'>
					<h4>{name ? name : 'no title'}</h4>
					<div className='d-flex gap-3'>
						<small className='text-muted'>{moment(metadata_modified).format('LL')}</small>
						•
						<small className="text-muted">{(resource_size / 1024).toPrecision(2)} KB</small>
					</div>
				</div>
				<a href={url}>
					<FontAwesomeIcon icon={faArrowDown} size="xl" />
				</a>
			</Card.Body>
		</Card>
	);
}