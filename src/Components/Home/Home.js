import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AddEvent from '../AddEvent';
import LatestEvents from '../LatestEvents/LatestEvents';
import SearchedEvent from '../SearchedEvent';
import UpdateEvent from '../UpdateEvent';

const Home = () => {
    const [event, setEvent] = useState({});
    const [latestEvents, setLatestEvents] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(10000);
    const [visibility, setVisibility] = useState(false);


    const getEvent = async e => {
        e.preventDefault();
        const uid = e.target.uid.value;
        if (uid) {
            const data = await axios.get(`https://boiling-savannah-20518.herokuapp.com/api/v3/app?uid=${uid}`);
            setEvent(data.data);
        }
        e.target.reset();
    }

    const handleLatestEvents = async () => {


        const getPageCount = async () => {
            const { data } = await axios.get('https://boiling-savannah-20518.herokuapp.com/api/v3/app/eventCount');
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
            const data = await axios.get(`https://boiling-savannah-20518.herokuapp.com/api/v3/app/latestEvents?page=${page}`);
            setLatestEvents(data.data);
        }
        loadEvents();
    }, [page, pageCount])

    const handleEventDelete = uid => {
        console.log(uid)
        const url = `https://boiling-savannah-20518.herokuapp.com/api/v3/app/${uid}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                const newEvents = latestEvents.filter(event => event?.uid !== uid);
                setLatestEvents(newEvents);
                toast.error('Event Deleted')
            })
    }




    return (
        <div className='row container-lg mt-5 mx-auto'>
            <div className='col-lg-5 h-100 p-2 border border-success rounded rounded-5 me-4'>
                <div className='mb-5 pb-5'>
                    <h2>Search <span className='text-success'>Event</span></h2>
                    <form className='d-flex align-items-center justify-content-center' onSubmit={getEvent}>
                        <input type="number" name="uid" placeholder='Enter uid' />
                        <input className='btn btn-outline-success' type="submit" value='Search' />
                    </form>
                    <SearchedEvent
                        key={event._id}
                        event={event}
                    ></SearchedEvent>
                </div>

                <div className='border h-75 border-success rounded rounded-5 p-4'>
                    <h2>Latest <span className='text-success'>Event</span></h2>
                    <button className={visibility ? 'btn btn-danger w-75' : 'btn btn-success w-75'} onClick={handleLatestEvents}>{visibility ? 'Hide Latest Events' : 'Latest Events'}</button>
                    {
                        visibility ?
                            <div className='mt-5'>
                                {
                                    latestEvents?.map((latestEvent, index) => <LatestEvents
                                        handleEventDelete={handleEventDelete}
                                        key={latestEvent._id}
                                        latestEvent={latestEvent}
                                    ></LatestEvents>)
                                }
                                < div className='container mt-3'>
                                    {
                                        [...Array(pageCount).keys()]
                                            .map(number => <button
                                                className='btn btn-outline-success mx-1'
                                                onClick={() => setPage(pageCount - 1 - number)}
                                            >{number + 1}</button>)
                                    }
                                </div>
                            </div>
                            :
                            ''
                    }
                </div>
            </div>

            <div className='col-lg-5 border border-success rounded rounded-5 ms-5'>
                <div className='p-4 my-3 '>
                    <h2>Add <span className='text-success'>Event</span></h2>
                    <AddEvent></AddEvent>
                </div>

                <div className='p-4 my-3'>
                    <h2>Update <span className='text-success'>Event</span></h2>
                    <UpdateEvent></UpdateEvent>
                </div>
            </div>
        </div >
    );
};

export default Home;