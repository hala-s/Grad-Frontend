"use client";
import React ,{ useContext }from "react";
import Layout from "../../studentLayout/Layout.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation.js";
import Link from "@mui/material/Link";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import "../../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Grid from '@mui/system/Unstable_Grid';
import Button from '@mui/material/Button';
import './style.css'
import { useSearchParams } from 'next/navigation'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { UserContext } from "../../../../context/user/User.jsx";
import ReviewsIcon from '@mui/icons-material/Reviews';
import InfoIcon from '@mui/icons-material/Info';
import Review from './Review.jsx';
export default function page() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {userToken, setUserToken, userData}=useContext(UserContext);
  const searchParams = useSearchParams();
  let isEnrolled = searchParams.get('isEnrolled')
  let isAvailable = searchParams.get('isAvailable')
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const [course, setCourse] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const { courseId } = useParams();
  const getCourses = async () => {
try{
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/GetCourseById?id=${courseId}`
    );
    setCourse(data.data.result);
  }catch(error){
    console.log(error);
  }};
  
  const [studentId, setStudentId]=useState(null);
  const enrollCourse = async () => {
    try{
    const formData = new FormData();

    formData.append("courseId", courseId);
    formData.append("studentId", userData.userId);
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_EDUCODING_API}StudentCourse/EnrollInCourse`,formData,
     { headers: {
        'Content-Type': 'multipart/form-data','Content-Type': 'application/json',Authorization: `Bearer ${userToken}`
      }
},
    );
    // router.push(`/MyCourses/${courseId}`);
    setOpen(true);
  }catch(error){
    console.log(error);
  }};

  useEffect(() => {
    if(userData){
      setStudentId(userData.userId);
    }
    getCourses();
  }, [userData, course, isEnrolled,isAvailable]);
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }
  return (
    <Layout title={course.name}>
       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your request to join this course done successfully, please wait for Accreditation!
        </Alert>
      </Snackbar>

           <Grid container spacing={2}>
            <div className="row justify-content-center align-items-center "></div>
        <Grid item  className='col-xl-4 co-lg-4 col-sm-12 ps-5 pt-5'>
          <Box
            height={250}
            width={300}
            m={3}
       
          >
            <img
              width={300}
              height={280}
              className="rounded pe-5"
              src={`${course.imageUrl}`}
              alt="course Image"
            />
          </Box>
        </Grid>
        <Grid item  className='col-xl-6 co-lg-6 col-sm-12'>
          <Box m={3} p={5}>
            <Typography variant="h6" >Category :{course.category}</Typography>
            <Typography variant="h6">Price :{course.price}</Typography>
            <Typography variant="h6">Started At :{course.startDate}</Typography>
            <Typography variant="h6">Deadline :{course.deadline}</Typography>
            <Typography variant="h6">Total hours :{course.totalHours}</Typography>
            <Typography variant="h6">Instructor :{course.instructorName}</Typography>
            {isEnrolled=='true' || isAvailable == 'false'?(<Button disabled variant="contained" className="addButton" sx={{mt:2}}>Enroll Now!</Button>):(<Button onClick={enrollCourse} variant="contained" sx={{mt:2}}>Enroll Now!</Button>)}

          </Box>
        </Grid>
      </Grid>


      <Box sx={{ width: '100%', typography: 'body1', mt:3,  }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" >
          
          <Tab icon={<InfoIcon sx={{color:"#4c5372" }}/>}label="Description" value="1" />
          <Tab icon={<ReviewsIcon sx={{color:"#4c5372" }}/>} label="Reviews" value="2"/>

          </TabList>
        </Box>
        <TabPanel value="1">
        {course.description}
        </TabPanel>
        <TabPanel value="2">
        <Review courseId={courseId} isEnrolled = {isEnrolled} />
        </TabPanel>
      </TabContext>
    </Box>
      
    </Layout>
  );
}
