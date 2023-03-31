import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import editar from '../images/editar.png';
import { Form } from 'react-bootstrap';

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
                    <Modal.Title>Editar Solicitação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                            autoFocus
                        />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                            autoFocus
                        />
                        </Form.Group>
                        <Form.Group 
                        className="mb-3" 
                        controlId="exampleForm.ControlInput1">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                            autoFocus
                        />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                            autoFocus
                        />
                        </Form.Group>
                        <Form.Group className="mb-3" 
                        controlId="exampleForm.ControlInput1">
                        <Form.Label>Tipo de Chamado</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                            autoFocus
                        />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" rows={20} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Salvar Alterações
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MyButton;