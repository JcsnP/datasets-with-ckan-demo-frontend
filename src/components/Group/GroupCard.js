import { Card, Button } from 'react-bootstrap';

export default function GroupCard({ title, image, description }) {
	return(
		<Card className='mb-2 shadow-sm'>
      <Card.Img variant="top" src={image} className='w-100 p-4' />
      <Card.Body>
        <Card.Title className='fw-bold'>{title}</Card.Title>
        <Card.Text className='text-muted'>
          {description}
        </Card.Text>
        <Button variant="primary" className='w-100'>Visit</Button>
      </Card.Body>
    </Card>
	);
}