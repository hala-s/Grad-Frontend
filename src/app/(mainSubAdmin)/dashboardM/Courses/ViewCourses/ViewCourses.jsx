'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { faArrowUpFromBracket, faEllipsisVertical, faEye, faFilter, faPen } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import axios from 'axios';
// import CreateCourse from '../CreateCourse/CreateCourse';
import { UserContext } from '@/context/user/User';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Pagination, Select, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateCourse from '@/app/(subadmin)/dashboardS/Courses/CreateCourse/CreateCourse';


export default function ViewCourses() {


  const [courses, setCourses] = useState([]);
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


  const fetchCourses = async (pageNum = pageNumber, pageSizeNum = pageSize) => {
    if(userData){
    try{
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/GetAllAccreditCourses?pageNumber=${pageNum}&pageSize=${pageSize}`);
    setCourses(data.result.items);
    setTotalPages(data.result.totalPages);
  }
    catch(error){
      console.log(error);
    }
  }
  };

  useEffect(() => {
    fetchCourses();
  }, [courses,userData, pageNumber, pageSize]);  // Fetch courses on mount and when page or size changes
  
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPageNumber(1); // Reset to the first page when page size changes
  };
  
  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleStatusFilter = (type) => {
    setSelectedStatus(type);
  };

  const filteredCourses = Array.isArray(courses) ? courses.filter((course) => {
    const matchesSearchTerm = Object.values(course).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus = selectedStatus ? course.status.toLowerCase() === selectedStatus.toLowerCase() : true;
    return matchesSearchTerm && matchesStatus;
  }) : [];
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
                <div className="icons d-flex gap-2 pt-3">
                    
                <div className="dropdown ">
                   <Tooltip title="Filter by Status" placement="top">
                  <button
                    className="dropdown-toggle border-0 bg-white edit-pen"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faFilter} className="pt-1"/>
                  </button>
                  </Tooltip>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleStatusFilter("")}
                        
                      >
                        All
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleStatusFilter("start")}
                      >
                        Start
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleStatusFilter("finish")}
                      >
                        Finish
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleStatusFilter("accredit")}
                      >
                        Accredit
                      </a>
                    </li>
                  </ul>
                </div>
                    
                </div>
                </form>
                {/* <button type="button" className="btn btn-primary ms-2 addEmp" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                    <span>+ Add new</span> 
                </button> */}

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

        {/* <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModal1Label" aria-hidden="true"> */}
        {/* <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdrop1Label" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content row justify-content-center">
              <div className="modal-body text-center ">
                <h2 className='fs-1'>CREATE COURSE</h2>
                  <div className="row">
                    <CreateCourse/>
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
          {"Add New Course"}
        </DialogTitle>

        <DialogContent >
        
      <CreateCourse setOpen={setOpen}/>
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
      <th scope="col">Price</th>
      <th scope="col">Status</th>
      <th scope="col">Start Date</th>
      <th scope="col">Instructor</th>
      <th scope="col">Option</th>
    </tr>
  </thead>
  <tbody>
  {filteredCourses.length ? (
    filteredCourses.map((course,index) =>(
      
      <tr key={course.id}>
      <th scope="row">{++index}</th>
      <td>{course.name}</td>
      <td>{course.price}</td>
      <td>{course.status}</td>
      <td>{course.startDate}</td>
      <td>{course.instructorName}</td>
      
      <td className='d-flex gap-1'>
      {/* <button className="border-0 bg-white " type="button" data-bs-toggle="modal" data-bs-target={`#exampleModal2-${course.id}`}>
                    <FontAwesomeIcon icon={faPen} className="edit-pen" />
                  </button> */}

                  {/* <div className="modal fade" id={`exampleModal2-${course.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content row justify-content-center">
                        <div className="modal-body text-center ">
                          <h2>Edit Course</h2>
                          <div className="row">
                            <EditCourse id = {course.id}  name = {course.name} price = {course.price} category ={course.category} description = {course.description} InstructorId = {course.instructorId} image = {course.imageUrl}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
      <Link href={`CourseDetails/${course.id}`}>
        <button  type="button" className='border-0 bg-white '>
        <FontAwesomeIcon icon={faEye}  className='edit-pen'/>
        </button>
        </Link>
        </td>

    </tr>
    
      ))): (
        <tr>
          <td colSpan="7">No Courses</td>
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
