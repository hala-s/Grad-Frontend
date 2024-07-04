'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { faCode} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../Events.css'
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select, Stack } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Link from '@mui/material/Link';
import Layout from '../../Layout/Layout'
import { useParams } from 'next/navigation.js';

export default function page() {
  const [event, setEvent] = useState([]);
  const { id } = useParams();

    const getEvent = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_EDUCODING_API}EventContraller/GetEventById?eventId=${id}`
          );
          setEvent(data.result);
  
        } catch (error) {
          console.log(error);
        }
      
    };
    useEffect(() => {
      getEvent();
    }, []);
  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8'>
            <div className='event-header my-3'>
              <div className='event-date'>
              <span > <CalendarMonthIcon sx={{color:'#4C5372'}}/> {event?.dateOfEvent} </span> 
              </div>
            <img src={`${event?.imageUrl}`} alt='event image' className='w-100'/>
            </div>
            <div className='description py-2'>
              <p>{event.content}</p>
            </div>
          </div>
          <div className='col-md-4 mt-3'>
            <div className='event-info'>
              <div className='details'>
                <h6>Category</h6>
                <span>{event?.category}</span>
              </div>
              <div className='details'>
                <h6>Event Date</h6>
                <span>{event?.dateOfEvent}</span>
              </div>
              <div className='details'>
                <p>Join us for an unforgettable event filled with excitement, networking, and fun! Whether you're looking to connect with industry leaders, learn something new, or simply enjoy a great time, this is the event for you. Don't miss out on this unique opportunity to be a part of something special. If you're interested in attending, simply send us an email at <Link href="mailto:programming.academy24@gmail.com">programming.academy24@gmail.com</Link> for more information and to reserve your spot. We can't wait to see you there!</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      </Layout>
  )
}
