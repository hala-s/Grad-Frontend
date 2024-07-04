'use client'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Typography from '@mui/material/Typography';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Link from '@mui/material/Link';
import './style.css'
import Layout from '../instructorLayout/Layout.jsx'
import { UserContext } from '../../../context/user/User.jsx';
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select, Stack } from '@mui/material'

export default function page() {
  const {userToken, setUserToken, userData}=useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [courses, setCourses] = useState([]);
  const getCourses = async (pageNum = pageNumber, pageSizeNum = pageSize) => {
    try{
    if(userData){
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/GetAllCoursesGivenByInstructor?Instructorid=${userData.userId}&pageNumber=${pageNum}&pageSize=${pageSize}`,{headers :{Authorization:`Bearer ${userToken}`}}
      );
    setCourses(data.data.result.items);
    setTotalPages(data.data.result.totalPages);
    }}catch(error){
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
    getCourses();
  }, [userData, pageNumber, pageSize]);

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

const filteredCourses = Array.isArray(courses) ? courses.filter((course) => {
  const matchesSearchTerm = Object.values(course).some(
    (value) =>
      typeof value === "string" &&
      value.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return matchesSearchTerm;
}) : [];


  return (
    <Layout title='Courses'>
      <div className="filter py-2 text-end pe-5">
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
              <FormControl fullWidth  sx={{ width: '50%' }} >
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
          </div>
        </nav>
      </div>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
      
              </Stack>
      {filteredCourses?(
          filteredCourses?.map((course) => (
    <Box
      height={150}
      width={1000}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
    
    >
<img
        width={200}
        height={149}
          src={course.imageUrl}
          className='m-0 p-0 rounded-start border border-3 border-black'

          alt='htgkkkkkkkkkkk'
        />  
        <Typography variant='h5'>{course.name }</Typography>
        <Link href={`coursesI/${course.id}`}> <ArrowCircleRightIcon sx={{ fontSize: 40 }} className='arrowIcon'/></Link>
         
        </Box>
        ))
        ) : (
          <p>No courses yet.</p>
        )}

<Stack spacing={2} sx={{ width: '100%', maxWidth: 500, margin: '0 auto' }}>
     
     <Pagination
     className="pb-3 "
       count={totalPages}
       page={pageNumber}
       onChange={handlePageChange}
       variant="outlined"
       color="secondary"
       showFirstButton
       showLastButton
     />
   </Stack>
</Layout>

  )
}
