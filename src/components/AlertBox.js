import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export default function AlertBox({message, show, close}) {
	if(show) {
		return(
			<Alert variant="danger" onClose={close} dismissible>
	      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
	      <p>
	        Change this and that and try again. Duis mollis, est non commodo
	        luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
	        Cras mattis consectetur purus sit amet fermentum.
	      </p>
	    </Alert>
		);
	}
}