import { Form, Button } from 'react-bootstrap';

export default function SearchDatasets({width = 100}) {
	return(
		<Form className={`d-flex gap-2 w-${width}`}>
			<Form.Control type='text' placeholder='Search Datasets' className='py-2' />
			<Button varian='primary'>SEARCH</Button>
		</Form>
	);
}