import { Card, Button } from 'react-bootstrap';

export default function OrganizationCard({ display_name, image_display_url, description, num_followers = 0, package_count = 0 }) {
	return(
		<Card className='mb-2 shadow-sm'>
      <Card.Img variant="top" src={image_display_url} className='w-100 rounded-top' />
      <Card.Body>
        <Card.Title className='fw-bold'>{display_name}</Card.Title>
        <Card.Text className='text-muted'>
          {!description.length ? 'No Description' : description}
        </Card.Text>

        <div className='d-flex align-items-center justify-content-between gap-2 mb-2 text-muted border rounded p-2'>
          <div>
            {num_followers} followers
          </div>
          <div>
            {package_count} datasets
          </div>
        </div>

        <Button variant="primary" className='w-100'>Visit</Button>
      </Card.Body>
    </Card>
	);
}