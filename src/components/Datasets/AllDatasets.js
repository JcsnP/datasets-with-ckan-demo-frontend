import { Row, Col } from 'react-bootstrap';

// import components
import DatasetsCard from './DatasetsCard.js';

const all_datasets = [
	{title: 'list-of-dreamybull-words', author: 'JcsnP', subscriber: 118, updated_at: '2023-03-13'},
	{title: 'list-of-dreamybull-words', author: 'JcsnP', subscriber: 118, updated_at: '2023-03-13'},
	{title: 'list-of-dreamybull-words', author: 'JcsnP', subscriber: 118, updated_at: '2023-03-13'},
	{title: 'list-of-dreamybull-words', author: 'JcsnP', subscriber: 118, updated_at: '2023-03-13'},
	{title: 'list-of-dreamybull-words', author: 'JcsnP', subscriber: 118, updated_at: '2023-03-13'},
	{title: 'list-of-dreamybull-words', author: 'JcsnP', subscriber: 118, updated_at: '2023-03-13'},
	{title: 'list-of-dreamybull-words', author: 'JcsnP', subscriber: 118, updated_at: '2023-03-13'},
	{title: 'list-of-dreamybull-words', author: 'JcsnP', subscriber: 118, updated_at: '2023-03-13'},
	{title: 'list-of-dreamybull-words', author: 'JcsnP', subscriber: 118, updated_at: '2023-03-13'},
	{title: 'list-of-dreamybull-words', author: 'JcsnP', subscriber: 118, updated_at: '2023-03-13'},
	{title: 'list-of-dreamybull-words', author: 'JcsnP', subscriber: 118, updated_at: '2023-03-13'},
]

export default function AllDatasets() {
	return(
		<Row>
			{
				all_datasets.map((item, key) => (
					<Col sm={6}>
						<DatasetsCard title={item.title} author={item.author} subscriber={item.subscriber} updated_at={item.updated_at} key={key} />
					</Col>
				))
			}
		</Row>
	);
}