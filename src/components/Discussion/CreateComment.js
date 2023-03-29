import React, {useState} from 'react';
import {Card, Form, Button} from 'react-bootstrap';
import axios from 'axios';

export default function CreateComment({topic_id}) {
  const [body, setBody] = useState('') ;
  const createComment = async() => {
    const response = await axios.post(
      `${process.env.REACT_APP_CKAN_API}/discussion/comments/${topic_id}`,
      {
        body: body,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response)
    if(response.data.ok) {
      window.location.reload();
    }
  }
  return (
    <div className='my-4'>
    <h3>Create Comment</h3>
    <Card>
      <Card.Body>
        <div className='mb-3'>
          <Form.Control
            as="textarea"
            placeholder="Comment here. Be patient, be friendly, and focus on ideas."
            className="mb-2"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{height: '100px'}}
          />
          <Form.Text muted>
            This comment will be made public once posted.
          </Form.Text>
        </div>
        <Button varian="primary" className='float-end' onClick={() => {createComment()}}>Post Comment</Button>
      </Card.Body>
    </Card>
    </div>
  );
}