import React from 'react';

const LatestEvents = (props) => {
    const { type, uid, name, tagline, schedule, description, image, moderator, category, sub_category, rigor_rank, attendees, } = props.latestEvent;
    const { handleEventDelete } = props;
    return (
        <div>
            <h1>Name : {name}</h1>
            <p>Uid : {uid}</p>
            <button onClick={() => handleEventDelete(uid)}>X</button>

        </div>
    );
};

export default LatestEvents;