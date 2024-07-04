'use client'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import  './about.css'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Avatar from '@mui/material/Avatar';
import { Box, Typography } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function page() {
  const [instructors, setInstructors] = useState([]);
  const getInstructors = async () => {
    try{
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Employee/GetAllEmployee?pageNumber=1&pageSize=1000`);
  
      setInstructors(data.result.items);
    }
      catch(error){
        console.log(error);
      }
    
  };
  useEffect(() => {
    getInstructors();
  }, []);
  return (
    <Layout>
      <div classNmae='container'>
       <div calssName='About-title'>
        <h2 className='text-center pt-4'>About US</h2>
       </div>
       <div className='row About-section1 py-5 my-5'>
  <div className='col-md-6 pe-5'>

          <Player
            autoplay
            loop
            src="https://lottie.host/2330db67-36e9-449d-87a0-7d87db127411/Yj6o3HZliJ.json"
            style={{ height: '500px', width: '500px' }}
          >
            <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
          </Player>

          {/* <Player
            autoplay
            loop
            src="https://lottie.host/6a2ef10e-cb21-4428-91e4-01c463e7bc75/IXokpwYwY1.json"
            style={{ height: '400px', width: '1000px' }}
          >
            <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
          </Player> */}
 

  </div>
  <div className='col-md-5'>
    <h3>Welcome to our academy, the premier destination for personalized learning in programming and technology!</h3>
    <p className='pt-3'>At our academy, we understand that every learner is unique, with distinct goals, learning styles, and aspirations. That's why we've built a platform that goes beyond standardized courses to offer a truly personalized learning experience.</p>
    <p> Whether you're a novice coder or a seasoned tech enthusiast, our platform empowers you to take control of your learning journey like never before.</p>
    <div className='row pt-2'>
        <div className='col-md-5 box' >
        <Box display="flex" alignItems="center">
      <Avatar  sx={{ bgcolor: '#4c5372' }}>
        <LocalLibraryIcon />
      </Avatar>
      <Typography sx={{ml:1}} >Remote Learning</Typography>
    </Box>
        </div>
        <div className='col-md-5 ms-3  box'>
        <Box display="flex" alignItems="center">
      <Avatar  sx={{ bgcolor: '#4c5372' }}>
        <AccessTimeFilledOutlinedIcon />
      </Avatar>
      <Typography sx={{ml:1}} >Lifetime Access
</Typography>
    </Box>
        </div>
        <div className='col-md-5 box' >
        <Box display="flex" alignItems="center">
      <Avatar  sx={{ bgcolor: '#4c5372' }}>
        <ArticleOutlinedIcon />
      </Avatar>
      <Typography sx={{ml:1}} >Expert Instruction</Typography>
    </Box>
        </div>
        <div className='col-md-5 ms-3  box'>
        <Box display="flex" alignItems="center">
      <Avatar  sx={{ bgcolor: '#4c5372' }}>
        <DirectionsRunOutlinedIcon />
      </Avatar>
      <Typography sx={{ml:1}} >Self Development

</Typography>
    </Box>
        </div>
      </div>
  </div>

</div>
<div className='row About-section2  p-3 my-5'>

      <div calssName='About-title  my-5 '>
        <h2 className='text-center pt-5'>Online Coaching Lessons For<br/> Remote Learning</h2>
        <p className='text-center pt-2 w-50 mx-auto' >With our academy, the power is in your hands. Want to dive deep into a particular programming language? Need guidance on a complex technical concept? Simply Enroll a course or submit a request for a personalized course, and our team of expert instructors will work with you to create a customized learning plan that suits your needs.</p>
       </div>
       <div className='row mx-auto my-5'>
       <div class="col-lg-3 col-sm-6 col-md-6"><div class="single-features-box"><div class="icon"><Avatar sx={{mx:'auto', p:5,bgcolor: '#4c5372' }} ><MenuBookRoundedIcon sx={{fontSize:'50px'}}/></Avatar></div><h3 className='w-75 mx-auto'>Learn the Latest Skills
</h3><p>Learning top skills can bring an extra-ordinary outcome in a career.

</p><a href="/login" class="link-btn">Start Now!</a></div></div>
       <div class="col-lg-3 col-sm-6 col-md-6"><div class="single-features-box"><div class="icon"><Avatar sx={{mx:'auto', p:5,bgcolor: '#4c5372' }} ><ComputerRoundedIcon sx={{fontSize:'50px'}}/></Avatar></div><h3 className='w-75 mx-auto'>Learn in Your Own Pace
</h3><p>Everyone prefers to enjoy learning at their own pace & that gives a great result.</p><a href="/login" class="link-btn">Start Now!</a></div></div>
       <div class="col-lg-3 col-sm-6 col-md-6"><div class="single-features-box"><div class="icon"><Avatar sx={{mx:'auto', p:5,bgcolor: '#4c5372' }} ><CheckCircleRoundedIcon sx={{fontSize:'50px'}}/></Avatar></div><h3 className='w-75 mx-auto'>Learn from Industry Experts
</h3><p>Experienced teachers can assist in learning faster with their best approaches!</p><a href="/login" class="link-btn">Start Now!</a></div></div>
       <div class="col-lg-3 col-sm-6 col-md-6"><div class="single-features-box"><div class="icon"><Avatar sx={{mx:'auto', p:5,bgcolor: '#4c5372' }} ><PublicRoundedIcon sx={{fontSize:'50px'}}/></Avatar></div><h3 className='w-75 mx-auto'>Learn Anywhere in the World</h3><p>We are delighted to give you options to enjoy learning from anywhere in the world.</p><a href="/login" class="link-btn">Start Now!</a></div></div>

       </div>

</div>

<div className='container'>
<div calssName='About-title  my-5 '>
        <h2 className='text-center pt-5'>Flexible Study at Your Own Pace,<br/> According to Your Own Needs</h2>
       </div>
<div className='row About-section3 py-5 mb-5'>
<div className='col-md-6 pe-5 pt-5 mt-3'>
    <p className='pt-3'>Personalized learning isn't just about courses; it's also about meaningful interactions with instructors who are passionate about helping you succeed. That's why we offer the option to book one-on-one lectures with our instructors, where you can discuss topics, ask questions, and receive personalized feedback in real-time. Whether you're struggling with a challenging concept or seeking guidance on a passion project, our instructors are here to support you every step of the way.</p>
    <p>At our academy, we're not just building a learning platform; we're building a community, a community of lifelong learners who are passionate about programming, technology, and continuous growth. Join us on this journey of discovery, and together, let's unlock your full potential in the world of tech.</p>

  </div>
  <div className='col-md-5 ps-5'>

          <Player
            autoplay
            loop
            src="https://lottie.host/3800730c-8029-4a16-893d-b3a5630d6761/EW0Db5CCzO.json"
            style={{ height: '500px', width: '500px' }}
          >
            <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
          </Player>

          {/* <Player
            autoplay
            loop
            src="https://lottie.host/6a2ef10e-cb21-4428-91e4-01c463e7bc75/IXokpwYwY1.json"
            style={{ height: '400px', width: '1000px' }}
          >
            <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
          </Player> */}


  </div>
  

</div>

</div>
<div className='about-section4'>
<div calssName='About-title py-5'>
        <h2 className='text-center pt-5'>Our Team</h2>
        <p  className='text-center py-3 w-50 mx-auto'>Our team of highly qualified professionals is dedicated to providing personalized education using innovative techniques and the latest tools, ensuring a comprehensive and engaging learning experience for all students.

</p>
       </div>
<Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
        loop={true}
        autoplay={{
          delay: 2500,
        }}
        >
             {instructors?(
          instructors?.map((instructor) => (
            <SwiperSlide className='d-flex justify-content-center'>
           {!instructor.imageUrl?(<AccountCircleIcon  sx={{fontSize:150, color:"#4c5372" , mt:5}}/>):(<img src={instructor.imageUrl}/>)}
           <div className='ps-5 pt-5'>
            <h4 className='pt-3'>{instructor.fName} {instructor.lName}</h4>
            <h5 className='pt-3'>Email : {instructor.email}</h5>
            <h5 className='pt-3'>Phone : {instructor.phoneNumber}</h5>
</div>
          </SwiperSlide>
        ))
        ) : (
          <p>No instructors yet.</p>
        )}
       
      </Swiper>
</div>
</div>

       
    </Layout>
   
  )
}

