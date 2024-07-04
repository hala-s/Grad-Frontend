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
import CircularProgress from "@mui/material/CircularProgress";
import './style.css'
import Layout from '../instructorLayout/Layout.jsx'
import { UserContext } from '../../../context/user/User.jsx';
export default function page() {
  const [courses, setCourses] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const {userToken, setUserToken, userData}=useContext(UserContext);

  const getCourses = async (pageNum = pageNumber, pageSizeNum = pageSize) => {
    if(userData){
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/GetAllCoursesGivenByInstructor?Instructorid=${userData.userId}&pageNumber=${pageNum}&pageSize=${pageSize}`,{headers :{Authorization:`Bearer ${userToken}`}}
    );
    setCourses(data.data.result.items);
    setTotalPages(data.data.result.totalPages);
    }
    
  };


 useEffect(() => {
        getCourses();
      }, [userData, pageNumber, pageSize]);  // Fetch courses on mount and when page or size changes
      
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
    <Layout title='Dashboard'>
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
  >

    {userData &&<Typography variant='h4' sx={{ mt: 6, ml: 3 }} color={deepPurple[50]}>Welcome {userData.userName},</Typography>}
    <Typography variant='h6' sx={{ ml: 3 }} color={deepPurple[50]}>Have a nice day!</Typography>
  </Box>
</div>
<div className='d-flex justify-content-between'><Typography className='ps-4' gutterBottom variant="h5" component="div">
          Your Courses         </Typography>
          {/* <FormControl fullWidth className="page-Size">
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
              </FormControl> */}
              <div className="filter py-2 text-end pe-5">
        <nav className="navbar">
          <div className="container justify-content-end">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search about course"
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
          filteredCourses.map((course) => (
            <Link href={`coursesI/${course.id}`}>
<Card sx={{ maxWidth: 200 , borderRadius: 3, height:270 , display:'inline-block', m:2}}  key={course.id}>
      <CardActionArea>
       
                  <img
                    src={course.imageUrl}
                    // className="card-img-top img-fluid "
                    alt="category"
                    width={200}
        height={150}
                  />
                   <CardContent>
          <Typography gutterBottom variant="h6" component="div">
          {course.name}          </Typography>

         
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
