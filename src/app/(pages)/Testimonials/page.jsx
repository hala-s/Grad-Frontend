'use client'
import React, { useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import './Testimonials.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from 'axios';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import '../../(admin)/dashboard/dashboard.css'
import { faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { Tooltip } from '@mui/material';

export default function Testimonials() {

  let [contacts,setContacts] = useState([]);
  const fetchContacts = async () => {
    try{
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Employee/GetAllEmployee?pageNumber=1&pageSize=1000`);

    setContacts(data.result.items);
  }
    catch(error){
      console.log(error);
    }
  
  };

  useEffect(() => {
    fetchContacts();
  }, []);
  
  return (
    <div className="testimonials py-5 mt-4">
      <div className="container">
        <div className="title text-center">
          <div className="shape1">
          <img src="assets/img/shape3.svg" alt=""/>
          </div>
          <h2> Our Experience Instructors</h2>
          <div className='py-3'><div className="bar"></div></div>
          
          <p className='instructorParagraph py-2 text-center w-75 m-auto'>Our team of highly qualified professionals is dedicated to providing personalized education using innovative techniques and the latest tools, ensuring a comprehensive and engaging learning experience for all students.</p>
        </div>
        <Swiper 
           modules={[Navigation, Pagination, Scrollbar, A11y]}
           spaceBetween={50}
           slidesPerView={3.5}
           autoplay = {2000}
           breakpoints={{
            // when window width is >= 640px
            1100: {
              width: 1100,
              slidesPerView: 3.5,
              spaceBetween : 50
            },
            // when window width is >= 768px
            1000: {
              width: 1100,
              slidesPerView: 3.5,
              spaceBetween:40
            },
            900: {
              width: 900,
              slidesPerView: 3,
              spaceBetween:40
            },
            800: {
              width: 800,
              slidesPerView: 2.7,
              spaceBetween:40
            },
            700: {
              width: 700,
              slidesPerView: 2,
              spaceBetween:40
            },
            600: {
              width: 600,
              slidesPerView: 2,
              spaceBetween:40
            },
            500: {
              width: 500,
              slidesPerView: 1.5,
              spaceBetween:40
            },
            400: {
              width: 400,
              slidesPerView: 1.3,
              spaceBetween:40
            },
            300: {
              width: 300,
              slidesPerView: 1.1,
              spaceBetween:40
            },
            200: {
              width: 200,
              slidesPerView: 1,
              spaceBetween:40
            },
            100: {
              width: 100,
              slidesPerView: 1,
              spaceBetween:40
            },
          }}
          //  navigation
           pagination={{ clickable: true }}
           onSwiper={(swiper) => console.log(swiper)}
           onSlideChange={() => console.log('slide change')}
           loop = {true}
        >

           {contacts.length? contacts.map((contact,index)=>(
            <div> {contact.type == "instructor" &&
          <SwiperSlide key={contact.id} className='py-5' >
                     <div className="col-md-4">
                    <div className="card text-center mb-3" style={{ width: "18rem" }}>
                      <div className="card-body m-3">
                      <img src={contact.imageUrl ? contact.imageUrl : "./user1.png"} 
           className="pho pb-3 img-fluid" 
           alt="Profile" 
           onError={(e) => { 
             console.error("Error loading image:", contact.imageUrl); 
             e.target.onerror = null; // prevents looping
             e.target.src = "./user1.png"; // default image if error
           }} />                          
                      <h4 className="card-title contactName"><Link href={`/Testimonials/${contact.id}`}>{contact.fName} {contact.lName}</Link></h4>
                        
                        <div className="d-flex justify-content-center gap-3 pt-3 border-top">
                        <Tooltip title="phone" placement="top">
                          <Link className='social' href={`tel:${contact.phoneNumber}`}><FontAwesomeIcon icon={faPhone} /></Link></Tooltip>
                        <Tooltip title="Email" placement="top">
                          <Link className='social' href={`mailto:${contact.email}`}><FontAwesomeIcon icon={faEnvelope} /></Link></Tooltip>
                        </div>
                      </div>
                    </div>
                  </div> 

          </SwiperSlide>}</div>
                )) : <h1>No Data</h1>}
          
         
        </Swiper>
      </div>
    </div>
  )
}
