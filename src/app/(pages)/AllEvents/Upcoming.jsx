'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { faCode} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Events.css'
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select, Stack } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Link from '@mui/material/Link';
export default function Upcoming() {
    const [events, setEvents] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const getEvents = async (pageNum = pageNumber, pageSizeNum = pageSize) => {
        try {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_EDUCODING_API}EventContraller/GetAllAccreditEvents?dateStatus=upcoming&pageNumber=${pageNum}&pageSize=${pageSizeNum}`
          );
          setEvents(data.result.items);
          setTotalPages(data.result.totalPages);
  
        } catch (error) {
          console.log(error);
        }
      
    };
  
    const handlePageSizeChange = (event) => {
      setPageSize(event.target.value);
      setPageNumber(1); // Reset to the first page when page size changes
    };
  
    const handlePageChange = (event, value) => {
      setPageNumber(value);
    };
    useEffect(() => {
        getEvents();
      }, [pageNumber, pageSize]);
      const [value, setValue] = React.useState('1');
    
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
  return (
    <>
        <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={2}
    >
      <FormControl fullWidth className="page-Size me-5">
        <InputLabel id="page-size-select-label">Page Size</InputLabel>
        <Select
          className="justify-content-center"
          labelId="page-size-select-label"
          id="page-size-select"
          value={pageSize}
          label="Page Size"
          onChange={handlePageSizeChange}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
        </Select>
      </FormControl>
    </Stack>
          <div className='events mt-5'>
            <div className='row'>
              {events?.length?(
                events.map(event=>(
                  <div className='col-lg-4 col-sm-6 col-md-6 '>
                    <div className='event-details'>
                      <div className='event-image'>
                      <img src={`${event.imageUrl}`}/>
                      <span className='date'><CalendarMonthIcon sx={{m:1}}/>{event.dateOfEvent}</span>
                      </div>
                    
                  
                  <div className='content'>
                  <h3>
                    <Link href={`/AllEvents/${event.id}`} className='event-title'>{event.name}</Link>
                  </h3>
                  <p>{event.content.substring(0, event.content.length /5)}...{' '}
            <Link href={`/AllEvents/${event.id}`} className="see-more">See More</Link></p>
                  </div>
                  </div>
                  </div>
                ))
              ):(<h4 className='text-center'> <ErrorOutlineIcon sx={{m:1}}/>no events yet.</h4>)}
            </div>
          </div>

    </>
  )
}
