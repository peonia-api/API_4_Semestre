import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import editar from '../images/editar.png';

function MyButton() {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    };

    const handleClose: any = () => {
        setShowModal(false);
    };

    return (
        <>
            <a onClick={handleClick}>
                <img style={{ width: '25px' }} src={editar} alt='Editar' />
            </a>
            {/* <Button variant="primary" onClick={handleClick}>
                Open Modal
            </Button> */}

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Modal content goes here.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MyButton;