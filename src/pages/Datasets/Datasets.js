import { Container, Card, Badge, Row, Col, Button } from 'react-bootstrap';


// import styles
import '../../App.css';

// import components
import SidePanel from '../../components/Datasets/SidePanel.js';
import AllDatasets from '../../components/Datasets/AllDatasets.js';

const tags = ['All Datasets', 'Education','Computer Science','Classification','Computer Vision','NLP','Data Visualization','Pre-Trained Model']

export default function Datasets() {
	return(
		<Container className='my-5'>
			<div className='d-flex justify-content-between align-items-center'>
				<div>
					<h1 className='fw-bold'>Datasets</h1>
					<h5 className='thai-lang text-muted'>ค้นหา สำรวจ วิเคราะห์ดาต้าเซ็ตทั้งหมด</h5>
				</div>
				<div>
					<img src='https://static.vecteezy.com/system/resources/previews/010/851/890/original/3d-illustration-search-data-analysis-png.png' alt='datasets image' width='250' height='250' />
				</div>
			</div>

			{ /* add datasets button */ }
			<Button variant='dark' className='my-3 shadow-sm me-2'>Add Datasets +</Button>
			<Button variant='success' className='my-3 shadow-sm'>My Datasets</Button>

			{ /* datasets section */ }
			<Row>
				{/* side panel */}
				<Col sm={4}>
					<SidePanel />
				</Col>

				{/* datasets */}
				<Col sm={8}>
					<AllDatasets />
				</Col>
			</Row>
			
			
		</Container>
	);
}