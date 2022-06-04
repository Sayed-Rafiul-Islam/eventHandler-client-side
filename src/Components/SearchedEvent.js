import React from 'react';

const SearchedEvent = (props) => {
    const { uid, name, tagline, schedule, description, image, moderator, category, sub_category, rigor_rank, attendees } = props.event;
    return (
        <div>
            {
                uid ?
                    <div>
                        <h1>Name : {name}</h1>
                        <p>Uid : {uid}</p>
                    </div>
                    :
                    ''
            }
        </div>
    );
};

export default SearchedEvent;