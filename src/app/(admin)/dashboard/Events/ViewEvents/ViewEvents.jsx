'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { faArrowUpFromBracket, faEye, faFilter, faPen } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Link from 'next/link';
import { UserContext } from '@/context/user/User';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Pagination, Select, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import EditEvent from '../EditEvents/[id]/page';

export default function ViewEvents() {

    const [events, setEvent] = useState([]);
    const {userToken, setUserToken, userData}=useContext(UserContext);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [eventId, setEventId] = useState(null);

    
const handleClickOpenUpdate = (id) => {
  setEventId(id);
    setOpenUpdate(true);
};
const handleCloseUpdate = () => {
  setOpenUpdate(false);
};


    const fetchEvents = async (pageNum = pageNumber, pageSizeNum = pageSize)  => {
      if(userData){
      try{
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}EventContraller/GetAllAccreditEvents?pageNumber=${pageNum}&pageSize=${pageSize}`);
      setEvent(data.result.items);
      setTotalPages(data.result.totalPages);
    }
      catch(error){
        console.log(error);
      }
    }
    };
  

    useEffect(() => {
      fetchEvents();
    }, [events,userData, pageNumber, pageSize]);  // Fetch courses on mount and when page or size changes
    
    const handlePageSizeChange = (event) => {
      setPageSize(event.target.value);
      setPageNumber(1); // Reset to the first page when page size changes
    };
    
    const handlePageChange = (event, value) => {
      setPageNumber(value);
    };
  
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredEvents = events.filter((event) => {
  const matchesSearchTerm =
    Object.values(event).some(
      (value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  return matchesSearchTerm ;
  });


  return (
    <>
    <div className="filter py-2 text-end">
        <nav className="navbar">
          <div className="container justify-content-end">
                <form className="d-flex" role="search">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                              <FormControl fullWidth className="w-50">
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
                {/* <div className="icons d-flex gap-2 pt-3">
                    
                    <div className="dropdown">
  <button className="dropdown-toggle border-0 bg-white edit-pen" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <FontAwesomeIcon icon={faFilter} />
  </button>
  <ul className="dropdown-menu">
 
  </ul>
</div>
<FontAwesomeIcon icon={faArrowUpFromBracket} />
                    
                </div> */}
                </form>
                {/* <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> */}
               
               

            </div>
        </nav>

        {/* <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModal2Label" aria-hidden="true"> */}
        
        
      </div>

      <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Category</th>
      <th scope="col">Event Date</th>
      <th scope="col">SubAdmin name</th>
      <th scope="col">Option</th>
    </tr>
  </thead>
  <tbody>
  {filteredEvents.length ? (
    filteredEvents.map((event,index) =>(
      <tr key={event.id}>
      <th scope="row">{++index}</th>
      <td>{event.name}</td>
      <td>{event.category}</td>
      <td>{event.dateOfEvent}</td>
      <td>{event.subAdminName}</td>
      <td className='d-flex gap-1'>
      <Tooltip title="Edit course" placement="top">
                <button className="border-0 bg-white" type="button" onClick={() => handleClickOpenUpdate(event.id)}>
                <FontAwesomeIcon icon={faPen} className="edit-pen" />
            </button>
            </Tooltip>

            <Dialog
        fullScreen={fullScreen}
        open={openUpdate && eventId == event.id}
        onClose={handleCloseUpdate}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "600px!important",  
              height: "400px!important",            },
          },
          
        }}
        >
          <DialogTitle id="responsive-dialog-title" className='primaryColor fw-bold' >
          {"Edit event"}
        </DialogTitle>

        <DialogContent>
        <Stack
   direction="row"
   spacing={1}
   sx={{ justifyContent: 'center',  alignContent: 'center'}}
    >
      <EditEvent id={event.id} name={event.name} category={event.category} dateOfEvent={event.dateOfEvent} content={event.content} image={event.imageUrl} setOpenUpdate={setOpenUpdate} />
     </Stack>
        </DialogContent>
        <DialogActions>
         
         <Button onClick={handleCloseUpdate} autoFocus>
           Cancle
         </Button>
       </DialogActions>
        </Dialog>

      <Link href={`/AllEvents/${event.id}`}>
        <button  type="button" className='border-0 bg-white' >
        <FontAwesomeIcon icon={faEye}  className='edit-pen '/>
        </button>
        </Link>
        </td>

    </tr>
      ))): (
        <tr>
          <td colSpan="7">No Events</td>
        </tr>
        )}
    
    
  </tbody>
</table>
<Stack spacing={2} sx={{ width: '100%', maxWidth: 500, margin: '0 auto' }}>
     
     <Pagination
     className="pb-3"
       count={totalPages}
       page={pageNumber}
       onChange={handlePageChange}
       variant="outlined"
       color="secondary"
       showFirstButton
       showLastButton
     />
   </Stack>


      </>
  )
}
