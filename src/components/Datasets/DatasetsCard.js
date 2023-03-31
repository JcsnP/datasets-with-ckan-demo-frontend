import {useState, useEffect} from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

// import styles
import '../../App.css';

export default function DatasetsCard({id, name, title, image = 'https://gravatar.com/avatar/373c0b737835b94074a42350012f267d?s=270&d=identicon', notes = '', author, metadata_modified}) {
	const [thumbnail, setThumbnail] = useState(null);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_CKAN_API}/packages/${id}/thumbnail`)
			.then((response) => response.json())
			.then((data) => {
				if(data.ok) {
					setThumbnail(data.result);
				}
			})
	}, []);

	return(
		<Card className='shadow-sm mb-3 pointer' onClick={() => {window.location.href=`/datasets/${name}`}}>
			<div className='overflow-hidden'>
				<Card.Img variant="top" src={thumbnail ? `data:image/png;base64,${thumbnail}` : image} height="120" style={{ objectFit: 'cover', overflow: 'hidden' }} />
			</div>
			<Card.Body className='d-flex flex-column justify-content-between' style={{height: '9rem'}}>
				<Card.Title>{title}</Card.Title>
				<Card.Text className='h-100 text-muted'>
					{notes?.length ? notes?.length >= 85 ? notes.slice(0, 85) + '...' : notes : 'no description'}
				</Card.Text>
			</Card.Body>
			<div className='d-flex flex-row justify-content-between align-items-center border-top px-3 py-2 rounded-bottom' style={{backgroundColor: '#faf7f7'}}>
				{/* author */}
				<div className='text-muted'>
					<FontAwesomeIcon icon={faUser} size="sm" className='me-1' />
					<a href={`/profile/${author}`}>
						{author ? author : 'No Name'}
					</a>
				</div>

				{/* update_at */}
				<div className='text-muted'>
					<FontAwesomeIcon icon={faPenToSquare} size="sm" className='me-1' />
					{moment(metadata_modified).startOf('hour').fromNow()}
				</div>
			</div>
		</Card>
	);
}