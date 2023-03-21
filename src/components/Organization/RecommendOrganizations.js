import { Container, Row, Col } from "react-bootstrap";
import OrganizationCard from "./OrganizationCard";

const organizations = [
  {title: 'Sample Organization', image: 'https://i.pcmag.com/imagery/reviews/05cItXL96l4LE9n02WfDR0h-5.fit_scale.size_760x427.v1582751026.png', description: 'A CKAN Dataset is a collection of data resources (such as files), together with a description and other information (what is known as metadata), at a fixed URL.', followers: 20, package_count: 35},
  {title: 'Sample Organization', image: 'https://i.pcmag.com/imagery/reviews/05cItXL96l4LE9n02WfDR0h-5.fit_scale.size_760x427.v1582751026.png', description: 'A CKAN Dataset is a collection of data resources (such as files), together with a description and other information (what is known as metadata), at a fixed URL.', followers: 20, package_count: 35},
  {title: 'Sample Organization', image: 'https://i.pcmag.com/imagery/reviews/05cItXL96l4LE9n02WfDR0h-5.fit_scale.size_760x427.v1582751026.png', description: 'A CKAN Dataset is a collection of data resources (such as files), together with a description and other information (what is known as metadata), at a fixed URL.', followers: 20, package_count: 35},
  {title: 'Sample Organization', image: 'https://i.pcmag.com/imagery/reviews/05cItXL96l4LE9n02WfDR0h-5.fit_scale.size_760x427.v1582751026.png', description: 'A CKAN Dataset is a collection of data resources (such as files), together with a description and other information (what is known as metadata), at a fixed URL.', followers: 20, package_count: 35},
  {title: 'Sample Organization', image: 'https://i.pcmag.com/imagery/reviews/05cItXL96l4LE9n02WfDR0h-5.fit_scale.size_760x427.v1582751026.png', description: 'A CKAN Dataset is a collection of data resources (such as files), together with a description and other information (what is known as metadata), at a fixed URL.', followers: 20, package_count: 35},
  {title: 'Sample Organization', image: 'https://i.pcmag.com/imagery/reviews/05cItXL96l4LE9n02WfDR0h-5.fit_scale.size_760x427.v1582751026.png', description: 'A CKAN Dataset is a collection of data resources (such as files), together with a description and other information (what is known as metadata), at a fixed URL.', followers: 20, package_count: 35},
]

export default function RecommendOrganizations() {
  return(
    <div className='py-5' style={{backgroundColor: '#D9D9D9'}}>
      <Container>
        <h1 className='fw-bold'>Datasets</h1>
        <h4 className='text-muted'>รายการดาต้าเซ็ทที่แนะนำ</h4>

        <Row>
        {
          organizations.map((item, key) => (
            <Col sm={6} lg={3}>
              <OrganizationCard display_name={item.title} image_display_url={item.image} description={item.description} num_followers={item.followers} created={item.package_count} />
            </Col>
          ))
        }
      </Row>
      </Container>
    </div>
  );
}