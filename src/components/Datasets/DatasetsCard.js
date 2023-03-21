import { Card } from 'react-bootstrap';
import moment from 'moment';

// import styles
import '../../App.css';

export default function DatasetsCard({id, title, description, author, created}) {
	return(
		<Card className='shadow-sm mb-2 gray-hover pointer' onClick={() => {window.location.href=`/datasets/${title}`}}>
			<Card.Img variant="top" src="https://media.istockphoto.com/id/1073009100/photo/extreme-close-up-of-supercomputer.jpg?s=612x612&w=0&k=20&c=fCfRoPe75NNm2kqUHgnfkFDjJOQ0uHY8YBa6iyNRWGc=" />
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text>{description}</Card.Text>
				<div className='d-flex flex-row justify-content-between align-items-center'>
					{/* author */}
					<div className='text-muted'>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
					   	<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					   	<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
					   	<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
						</svg>
						{author ? author : 'No Name'}
					</div>

					{/* update_at */}
					<div className='text-muted'>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
						  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
						  <path d="M16 5l3 3"></path>
						</svg>
						{moment(created).startOf('hour').fromNow()}
					</div>
				</div>
			</Card.Body>
		</Card>
	);
}