import { Card, Button } from 'react-bootstrap';

export default function GroupCard({ title, display_name, image_display_url, description, num_followers, package_count }) {
	return(
		<Card className='mb-3 shadow-sm'>
      <Card.Img variant="top" src={image_display_url} className='w-100' />
      <Card.Body>
        <Card.Title className='fw-bold'>{display_name}</Card.Title>
        <Card.Text className='text-muted'>
          {description ? description : 'no description'}
        </Card.Text>

        <div className='d-flex align-items-center justify-content-between gap-2 mb-2 text-muted'>
          <div>
            {num_followers} followers
          </div>
          <div>
            {package_count} datasets
          </div>
        </div>
      </Card.Body>
    </Card>
	);
}