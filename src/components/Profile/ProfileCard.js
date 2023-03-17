import React, {useState, useEffect} from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function ProfileCard({name, fullname, image_url, about, email}) {
  if(!image_url)
    image_url = 'https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png';
  return(
    <Card>
      <Card.Body>
        <div className="d-flex flex-column">
          <div className='rounded-circle overflow-hidden' style={{width: '128px', height: '128px'}}>
            <img className='w-100 h-100' src={image_url} alt="profile image" />
          </div>
          <h1>{name}</h1>
          <h2 className="text-muted">{fullname}</h2>
        </div>
      </Card.Body>
    </Card>
  );
}