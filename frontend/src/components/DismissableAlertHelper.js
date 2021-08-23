import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export default function DismissableAlertHelper({visible, variant, header, message, ...forwardProps }) {
  const [show, setShow] = useState(true);
  if (visible && show) {
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible {...forwardProps}>
        {
          header && <Alert.Heading>{header}</Alert.Heading>
        }
        <p>{message}</p>
      </Alert>
    )
  } else {
    return (
      <></>
    )
  }
}
