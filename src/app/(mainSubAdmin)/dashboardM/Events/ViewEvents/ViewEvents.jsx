'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { faArrowUpFromBracket, faEye, faFilter } from '@fortawesome/free-solid-svg-icons'
import CreateEvent from '../CreateEvent/CreateEvent';
import axios from 'axios';
import Link from 'next/link';
import { UserContext } from '@/context/user/User';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Pagination, Select, Stack, useMediaQuery, useTheme } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


export default function ViewEvents() {

    const [events, setEvent] = useState([]);
    const {userToken, setUserToken, userData}=useContext(UserContext);
    const [open, setOpen] = React.useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
  

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  

    const fetchEvents = async (pageNum = pageNumber, pageSizeNum = pageSize) => {
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
                <form className="d-flex gap-1" role="search">
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
                
                </form>
               
                <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 1,
          mr: 6,
        }}
      >
<Button sx={{px:2,m:0.5}} variant="contained" className='primaryBg' startIcon={<AddCircleOutlineIcon />} onClick={handleClickOpen}>
  Add New
</Button>
      </Box>
               

            </div>
        </nav>

        {/* <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModal2Label" aria-hidden="true"> */}
        {/* <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content row justify-content-center">
              <div className="modal-body text-center ">
                <h2 className='fs-1'>CREATE  EVENT</h2>
                  <div className="row">
                    <CreateEvent/>
                  </div>
              </div>
            </div>
          </div>
        </div> */}
        <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "600px!important",  
              height: "500px!important",            },
          },
          
        }}
        >
          <DialogTitle id="responsive-dialog-title" className='primaryColor fw-bold' >
          {"Add New Event"}
        </DialogTitle>

        <DialogContent >
          <CreateEvent setOpen={setOpen}/>
        </DialogContent>
        <DialogActions>
         
         <Button onClick={handleClose} autoFocus>
           Cancle
         </Button>
       </DialogActions>
        </Dialog>
        
      </div>
      


      <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Category</th>
      <th scope="col">Event Date</th>
      <th scope="col">SubAdmin </th>
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
      <td >{event.subAdminName}</td>
      <td className='d-flex gap-1'>

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
