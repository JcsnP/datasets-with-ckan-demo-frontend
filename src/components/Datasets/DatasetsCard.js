import { Card } from 'react-bootstrap';
import moment from 'moment';

// import styles
import '../../App.css';

export default function DatasetsCard({id, title, author, subscriber, updated_at}) {
	return(
		<Card className='shadow-sm mb-2 gray-hover pointer' onClick={() => {window.location.href=`/datasets/${title}`}}>
			<Card.Body>
				<h5>{title}</h5>
				<div className='d-flex flex-row justify-content-between align-items-center'>
					{/* author */}
					<div className='text-muted'>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
					   	<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					   	<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
					   	<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
						</svg>
						{author}
					</div>

					{/* subscriber */}
					<div className='text-muted'>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
						  <path d="M16 19h6"></path>
						  <path d="M19 16v6"></path>
						  <path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path>
						</svg>
						{subscriber}
					</div>

					{/* update_at */}
					<div className='text-muted'>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
						  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
						  <path d="M16 5l3 3"></path>
						</svg>
						{moment(updated_at).startOf('hour').fromNow()}
					</div>
				</div>
			</Card.Body>
		</Card>
	);
}