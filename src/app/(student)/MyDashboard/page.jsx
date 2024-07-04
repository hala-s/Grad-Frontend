'use client'
import React, { useContext } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select, Stack } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { deepPurple ,purple} from '@mui/material/colors';
import { useEffect, useState } from "react";
import axios from "axios";
import Link from '@mui/material/Link';
import './style.css'
import Layout from '../studentLayout/Layout.jsx';
import { UserContext } from '../../../context/user/User.jsx';
export default function page() {
  const [courses, setCourses] = useState([]);
  const {userToken, setUserToken, userData}=useContext(UserContext); const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const getCourses = async (pageNum = pageNumber, pageSizeNum = pageSize) => {
    if(userData){
      try{
        const {data} = await axios.get(
          `${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/GetAllEnrolledCoursesForAStudent?studentid=${userData.userId}&pageNumber=${pageNum}&pageSize=${pageSize}`,
          {headers :{Authorization:`Bearer ${userToken}`}}
        );
         setCourses(data.result.items);
         setTotalPages(data.result.totalPages);

      }catch(error){
        console.log(error);
        throw new Error('This is errrooooorrrrrrrrrr')
      }
    }
  };
  useEffect(() => {
    getCourses();
  }, [userData]);

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

const filteredCourses = Array.isArray(courses) ? courses.filter((course) => {
  const matchesSearchTerm = Object.values(course).some(
    (value) =>
      typeof value === "string" &&
      value.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return matchesSearchTerm;
}) : [];

  return (
    <Layout title='My Dashboard'>
      <div>
        <>
        <div className='d-flex justify-content-center'>
  <Box
    height={250}
    width={1000}
    my={4}
    display="flex"
    flexDirection="column"
    alignItems="flex-start" 
    gap={4}
    p={2}
    sx={{ border: '1px solid grey', borderRadius: 3, boxShadow: 3 }}
    className='studentDash'
  >
    {userData &&<Typography className='welcome' variant='h4' sx={{ mt: 6, ml: 3 }} color={deepPurple[50]}>Welcome {userData.userName}, </Typography>}
    <Typography variant='h6' className='wel' sx={{ ml: 3 }} color={deepPurple[50]}>Have a nice day!</Typography>
  </Box>
</div>
<div className="d-flex justify-content-between courses">
<Typography gutterBottom variant="h5" component="div" className='pe-1'>
          Your Courses         
          </Typography>

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
          </div>
        </nav>
      </div>
</div>
    
        {filteredCourses?.length ? (
          filteredCourses?.map((course) => (
            <Link href={`/MyCourses/${course.courseId}`}>
<Card sx={{ maxWidth: 200 , borderRadius: 3, height:270 , display:'inline-block', m:2}}  key={course.id}>
      <CardActionArea>
       {console.log(course.imageUrl)}
                  <img
                    src={course.course.imageUrl}
                    
                    alt="course image"
                    width={200}
        height={200}
                  />
                   <CardContent>
          <Typography gutterBottom variant="h6" component="div">
          {course.course.name}          </Typography>

         
        </CardContent>
      </CardActionArea>
        
      </Card>
      </Link>
                 
          ))
        ) : (
          <p>No Enrolled Courses Yet</p>
        )}
       
        </>
      
</div>
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
    </Layout>
    
  )
}
