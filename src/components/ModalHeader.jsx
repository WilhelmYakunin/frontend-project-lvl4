import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalHeader = ({ text }) => (
  <>
    <Modal.Header closeButton>
      <Modal.Title>{text}</Modal.Title>
    </Modal.Header>
  </>
);

export default ModalHeader;
