import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const SearchedEvent = (props) => {
    const { uid, name, tagline, schedule, description, image, moderator, category, sub_category, rigor_rank, attendees } = props.event;
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <div>
            {
                uid ?
                    <div>
                        <h2>Name : {name}</h2>
                        <p>Uid : {uid}</p>
                    </div>
                    :
                    ''
            }

        </div>
    );
};

export default SearchedEvent;