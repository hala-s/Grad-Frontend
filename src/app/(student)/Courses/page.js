'use client'
import React, { useEffect, useState, useContext } from 'react'
import Layout from '../studentLayout/Layout.jsx'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import Rating from "@mui/material/Rating";
import Link from '@mui/material/Link';
import { Box } from '@mui/material'
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './style.css'
import { UserContext } from '@/context/user/User';
import { useRouter } from 'next/navigation'

export default function page() {
  
  const {userToken, setUserToken, userData,userId}=useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();
const [role, setRole]=useState('student');
    const [courses, setCourses] = useState([]);
    const getCourses = async (pageNum = pageNumber, pageSizeNum = pageSize)=> {
      if(userId&&userToken){
        try{
      const {data} = await axios.get(
        `${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/GetAllCoursesToStudent?studentId=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {headers :{Authorization:`Bearer ${userToken}`}}

      );
    
       setCourses(data.result.items);
       setTotalPages(data.result.totalPages);
    }catch(error){
      console.log(error);
    }}
    };

    const handlePageSizeChange = (event) => {
      setPageSize(event.target.value);
      setPageNumber(1); // Reset to the first page when page size changes
    };
    
    const handlePageChange = (event, value) => {
      setPageNumber(value);
    };

    const handleClick = (course) => {
      router.push(`/Courses/${course.id}?isEnrolled=${course.isEnrolled}&isAvailable=${course.isAvailable}`);
    };
    
  useEffect(() => {
    getCourses();
  }, [page,userId,userToken, pageNumber, pageSize]);

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

  
if (role=='student'){
  return (
    <Layout title='Courses'>
         <Grid container spacing={2}>
      <Grid item xs={12} sm={9} my={2}>
      {/* <FormControl fullWidth className=""  sx={{ width: '15%' }}>
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
        <Box display="flex" flexWrap="wrap">
        {filteredCourses.length ? (
          filteredCourses.map((course, index) => (
            <Box
              key={index}
              color="primary.contrastText"
              mb={2}
              m={2}
            >
                       <Button onClick={()=>handleClick(course)}>
<Card sx={{ maxWidth: 230 , borderRadius: 3, height:200 , display:'inline-block', m:2}}  key={course.id}>
      <CardActionArea>
       
                  <img
                    src={course.imageUrl}
                    alt="category"
                    width={230}
        height={150}
                  />
                   <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
          {course.name}          </Typography>
          <Box
                        sx={{
                          "& > legend": { mt: 2 },
                        }}
                        className="d-inline-block "
                      >
                     
                      </Box>
         
        </CardContent>
      </CardActionArea>
        
      </Card>
      </Button>
            </Box>
           ))
           ) : (
             <p>No courses yet</p>
           )}
        </Box>
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
      </Grid>
      <Grid item xs={12} sm={3} my={3}>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            height: 500,
            background: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            zIndex: 999, 
            boxShadow: 4 
          }}
        >
           <Box
           sx={{height: 250, justifyContent: 'center', borderBottom: '1px solid grey', flexDirection: 'column' }}  display="flex"
           alignItems="center"
           >
         <Typography sx={{p:3}}> Choose specific topics to create your own course</Typography> 
         <Button variant="contained" className='iconCreate'><Link href='/requestCourse' color='inherit' underline='none'>Create Now!</Link></Button>

        </Box>
        <Box
           sx={{height: 250, justifyContent: 'center', borderBottom: '1px solid grey', flexDirection: 'column' }}  display="flex"
           alignItems="center"
           >
         <Typography sx={{p:3}}> If you have questions about a specific topic Book a lecture now!</Typography> 
         <Button variant="contained" className='iconCreate'><Link href='/calender' color='inherit' underline='none'>Book Now!</Link></Button>

        </Box>
        </Box>
      </Grid>
      
      
    </Grid>
    </Layout>
  )
 }
 
}
