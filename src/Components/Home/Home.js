import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LatestEvents from '../LatestEvents/LatestEvents';
import SearchedEvent from '../SearchedEvent';

const Home = () => {
    const [event, setEvent] = useState({});
    const [latestEvents, setLatestEvents] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(10000);
    console.log(page)
    const [visibility, setVisibility] = useState(false);

    const getEvent = async e => {
        e.preventDefault();
        const uid = e.target.uid.value;
        if (uid) {
            const data = await axios.get(`http://localhost:5000/api/v3/app?uid=${uid}`);
            setEvent(data.data);
        }
        e.target.reset();
    }

    const handleLatestEvents = async () => {


        const getPageCount = async () => {
            const { data } = await axios.get('http://localhost:5000/api/v3/app/eventCount');
            const count = data.count;
            const pages = Math.ceil(count / 5);
            setPageCount(pages)
            setPage(pages - 1)
        }
        getPageCount();
        setTimeout(setVisibility(!visibility), 20000);

    }
    useEffect(() => {
        const loadEvents = async () => {
            const data = await axios.get(`http://localhost:5000/api/v3/app/latestEvents?page=${page}`);
            setLatestEvents(data.data);
        }
        loadEvents();
    }, [page, pageCount])

    const handleEventDelete = uid => {
        console.log(uid)
        const url = `http://localhost:5000/api/v3/app/${uid}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                const newEvents = latestEvents.filter(event => event?.uid !== uid);
                setLatestEvents(newEvents);
            })
    }

    const createEvent = async e => {
        e.preventDefault();
    }


    return (
        <div>
            <form onSubmit={getEvent}>
                <input type="number" name="uid" placeholder='Enter uid' />
                <input type="submit" value='Search' />
            </form>

            <form onSubmit={createEvent}>

            </form>

            <button onClick={handleLatestEvents}>{visibility ? 'Hide Latest Events' : 'Latest Events'}</button>

            <SearchedEvent
                key={event._id}
                event={event}
            ></SearchedEvent>

            {
                visibility ?
                    <div>
                        {
                            latestEvents?.map((latestEvent, index) => <LatestEvents
                                handleEventDelete={handleEventDelete}
                                key={latestEvent._id}
                                latestEvent={latestEvent}
                            ></LatestEvents>)
                        }
                        < div className='container'>
                            {
                                [...Array(pageCount).keys()]
                                    .map(number => <button
                                        onClick={() => setPage(pageCount - 1 - number)}
                                    >{number + 1}</button>)
                            }
                        </div>
                    </div>
                    :
                    ''
            }
        </div >
    );
};

export default Home;