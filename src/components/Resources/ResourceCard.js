import {Card} from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

export default function ResourceCard({name, url, description, metadata_modified, format, resource_size}) {
	return(
		<Card className='mb-3 shadow-sm'>
			<Card.Body className='d-flex w-100 flex-row align-items-center justify-content-between'>
				<div className='w-100'>
					<h4>{name ? name : 'no title'}</h4>
					<small className="text-muted">{description.length >= 100 ? description.slice(0, 100) + '...' : description}</small>
					<div className='d-flex gap-3'>
						<small className='text-muted'>{moment(metadata_modified).format('LL')}</small>
						•
						<small className="text-muted">{parseFloat(resource_size / 1024).toFixed(2)} KB</small>
						•
						<small className="border rounded px-2 bg-light text-muted">{format ? format : 'unknow format'}</small>
					</div>
				</div>
				<a href={url}>
					<FontAwesomeIcon icon={faArrowDown} size="xl" />
				</a>
			</Card.Body>
		</Card>
	);
}