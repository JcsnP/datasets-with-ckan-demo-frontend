import { Container, Row, Col } from "react-bootstrap";

// import components
import DatasetsCard from "./DatasetsCard";

const datasets = [
  {title: 'Sample Datasets', image: 'https://media.istockphoto.com/id/1073009100/photo/extreme-close-up-of-supercomputer.jpg?s=612x612&w=0&k=20&c=fCfRoPe75NNm2kqUHgnfkFDjJOQ0uHY8YBa6iyNRWGc=', description: 'A CKAN Dataset is a collection of data resources (such as files), together with a description and other information (what is known as metadata), at a fixed URL.', author: 'John Doe', metadata_modified: '2/08/2020'},
  {title: 'Sample Datasets', image: 'https://media.istockphoto.com/id/1073009100/photo/extreme-close-up-of-supercomputer.jpg?s=612x612&w=0&k=20&c=fCfRoPe75NNm2kqUHgnfkFDjJOQ0uHY8YBa6iyNRWGc=', description: 'A CKAN Dataset is a collection of data resources (such as files), together with a description and other information (what is known as metadata), at a fixed URL.', author: 'John Doe', metadata_modified: '2/08/2020'},
  {title: 'Sample Datasets', image: 'https://media.istockphoto.com/id/1073009100/photo/extreme-close-up-of-supercomputer.jpg?s=612x612&w=0&k=20&c=fCfRoPe75NNm2kqUHgnfkFDjJOQ0uHY8YBa6iyNRWGc=', description: 'A CKAN Dataset is a collection of data resources (such as files), together with a description and other information (what is known as metadata), at a fixed URL.', author: 'John Doe', metadata_modified: '2/08/2020'},
  {title: 'Sample Datasets', image: 'https://media.istockphoto.com/id/1073009100/photo/extreme-close-up-of-supercomputer.jpg?s=612x612&w=0&k=20&c=fCfRoPe75NNm2kqUHgnfkFDjJOQ0uHY8YBa6iyNRWGc=', description: 'A CKAN Dataset is a collection of data resources (such as files), together with a description and other information (what is known as metadata), at a fixed URL.', author: 'John Doe', metadata_modified: '2/08/2020'},
  {title: 'Sample Datasets', image: 'https://media.istockphoto.com/id/1073009100/photo/extreme-close-up-of-supercomputer.jpg?s=612x612&w=0&k=20&c=fCfRoPe75NNm2kqUHgnfkFDjJOQ0uHY8YBa6iyNRWGc=', description: 'A CKAN Dataset is a collection of data resources (such as files), together with a description and other information (what is known as metadata), at a fixed URL.', author: 'John Doe', metadata_modified: '2/08/2020'},
  {title: 'Sample Datasets', image: 'https://media.istockphoto.com/id/1073009100/photo/extreme-close-up-of-supercomputer.jpg?s=612x612&w=0&k=20&c=fCfRoPe75NNm2kqUHgnfkFDjJOQ0uHY8YBa6iyNRWGc=', description: 'A CKAN Dataset is a collection of data resources (such as files), together with a description and other information (what is known as metadata), at a fixed URL.', author: 'John Doe', metadata_modified: '2/08/2020'},
  {title: 'Sample Datasets', image: 'https://media.istockphoto.com/id/1073009100/photo/extreme-close-up-of-supercomputer.jpg?s=612x612&w=0&k=20&c=fCfRoPe75NNm2kqUHgnfkFDjJOQ0uHY8YBa6iyNRWGc=', description: 'A CKAN Dataset is a collection of data resources (such as files), together with a description and other information (what is known as metadata), at a fixed URL.', author: 'John Doe', metadata_modified: '2/08/2020'},
]

export default function RecommendDatasets() {
  return(
    <Container className='my-5'>
      <h1 className='fw-bold'>Datasets</h1>
      <h4 className='text-muted'>รายการดาต้าเซ็ทที่แนะนำ</h4>

      <Row>
        {
          datasets.map((item, key) => (
            <Col sm={3}>
              <DatasetsCard title={item.title} image={item.image} description={item.description} author={item.author} created={item.created} />
            </Col>
          ))
        }
      </Row>

    </Container>
  );
}