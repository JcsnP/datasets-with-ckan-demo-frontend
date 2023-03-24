import { container, Card } from 'react-bootstrap';

export default function FilterBox({data}) {
	return(
		{
			data.map((item, key) => (
				<Card body>
					{title}
				</Card>
			))
		}
	);
}