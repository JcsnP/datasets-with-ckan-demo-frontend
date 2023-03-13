import { Container, Row, Col } from 'react-bootstrap';

// import components
import GroupCard from '../../components/Group/GroupCard.js';

const organization_data = [
	{
		title: 'The Organization',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Seal_of_the_United_States_Department_of_Homeland_Security.svg/800px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png',
		description: 'Inside Kaggle you’ll find all the code & data you need to do your data science work. Use over 50,000 public datasets and 400,000 public notebooks to conquer any analysis in no time.'
	},
	{
		title: 'The Organization',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Seal_of_the_United_States_Department_of_Homeland_Security.svg/800px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png',
		description: 'Inside Kaggle you’ll find all the code & data you need to do your data science work. Use over 50,000 public datasets and 400,000 public notebooks to conquer any analysis in no time.'
	},
	{
		title: 'The Organization',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Seal_of_the_United_States_Department_of_Homeland_Security.svg/800px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png',
		description: 'Inside Kaggle you’ll find all the code & data you need to do your data science work. Use over 50,000 public datasets and 400,000 public notebooks to conquer any analysis in no time.'
	},
	{
		title: 'The Organization',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Seal_of_the_United_States_Department_of_Homeland_Security.svg/800px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png',
		description: 'Inside Kaggle you’ll find all the code & data you need to do your data science work. Use over 50,000 public datasets and 400,000 public notebooks to conquer any analysis in no time.'
	},
	{
		title: 'The Organization',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Seal_of_the_United_States_Department_of_Homeland_Security.svg/800px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png',
		description: 'Inside Kaggle you’ll find all the code & data you need to do your data science work. Use over 50,000 public datasets and 400,000 public notebooks to conquer any analysis in no time.'
	},
	{
		title: 'The Organization',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Seal_of_the_United_States_Department_of_Homeland_Security.svg/800px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png',
		description: 'Inside Kaggle you’ll find all the code & data you need to do your data science work. Use over 50,000 public datasets and 400,000 public notebooks to conquer any analysis in no time.'
	},
]

export default function Group(argument) {
	return(
		<Container className='my-5'>
			<div className='d-flex justify-content-between align-items-center'>
				<div>
					<h1 className='fw-bold'>Group</h1>
					<h5 className='thai-lang text-muted'>ค้นหา กลุ่มทั้งหมด</h5>
				</div>
				<div>
					<img src='https://cdn3d.iconscout.com/3d/premium/thumb/business-team-doing-discussion-5648600-4708252.png' alt='organization image' height='250' />
				</div>
			</div>
			<Row className='my-5'>
				{
					organization_data.map((item, key) => (
						<Col sm={3} className=''>
							<GroupCard title={item.title} image={item.image} description={item.description} key={key} />
						</Col>
					))
				}
			</Row>	
		</Container>
	);
}