'use client'
import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/system/Box';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Link from '@mui/material/Link';
import './style.css'
import Layout from '../studentLayout/Layout.jsx';
import { UserContext } from '../../../context/user/User.jsx';
import { Button, FormControl, InputLabel, MenuItem, Pagination, Select, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
export default function page() {
  const {userToken, setUserToken, userData}=useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);


  const getCourses = async (pageNum = pageNumber, pageSizeNum = pageSize) => {
    if(userData){
      try{
        const {data} = await axios.get(
          `${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/GetAllEnrolledCoursesForAStudent?studentid=${userData.userId}&pageNumber=${pageNum}&pageSize=${pageSize}`,{headers :{Authorization:`Bearer ${userToken}`}}
        );
         setCourses(data.result.items);
         setTotalPages(data.result.totalPages);

      }catch(error){
        console.log(error);
      }
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
    <Layout title='My Courses'>
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
      {filteredCourses.length ? (
          filteredCourses.map((course) => (
    <Box
      height={150}
      width={1000}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      className='singleCourse'
    
    >
<img
        width={200}
        height={149}
          src={course.course.imageUrl}
          className='m-0 p-0 rounded-start border border-3 border-black'

          alt='Course Image'
        />  
        <Typography variant='h5'>{course.course.name }</Typography>
        {/* <Link href={`MyCourses/${course.courseId}`}> <ArrowCircleRightIcon sx={{ fontSize: 40 }} /></Link> */}
         <Button onClick={()=>router.push(`MyCourses/${course.courseId}`)}><ArrowCircleRightIcon sx={{ fontSize: 40 }} className='arrowIcon'/></Button>
        </Box>
        ))
        ) : (
          <p>No Courses Yet</p>
        )}

<Stack spacing={2} sx={{ width: '100%', maxWidth: 500, margin: '0 auto' }} className='pt-5'>
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
      
</Layout>

  )
}
