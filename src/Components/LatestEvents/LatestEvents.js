import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const LatestEvents = (props) => {
    const { type, uid, name, tagline, schedule, description, image, moderator, category, sub_category, rigor_rank, attendees } = props.latestEvent;
    const { handleEventDelete } = props;

    const [show, setShow] = useState(false);
    const handleShow = uid => {
        setShow(false);
        handleEventDelete(uid);
    }
    return (
        <div className='p-4 border border-success my-2'>
            <h2>Name : {name}</h2>
            <p>Uid : {uid}</p>
            <button className='btn btn-outline-danger btn-sm' onClick={() => setShow(true)}>Delete Event</button>

            <Modal
                onHide={() => setShow(false)}
                show={show}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className='text-success'>
                        Are You sure ?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='text-success'>You want to delete this Event ?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={() => { handleShow(uid) }}>Yes</Button>
                    <Button variant='danger' onClick={() => { setShow(false) }}>No</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default LatestEvents;