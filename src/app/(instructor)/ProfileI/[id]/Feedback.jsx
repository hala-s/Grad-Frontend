'use client'
import React, { useContext, useEffect, useState , useRef} from 'react';
import axios from 'axios';
import { UserContext } from '@/context/user/User';
import './feedback.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import Rating from "@mui/material/Rating";

export default function Feedback() {
  const { userToken, userId } = useContext(UserContext);
  const [feedbacks, setFeedbacks] = useState([]);

  const getFeedbacks = async () => {
    if (userId) {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Feedback/GetAllInstructorFeedback?instructorId=${userId}`);
        setFeedbacks(data.result.items || []);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getFeedbacks();
  }, [userId, feedbacks ]);

  return (
    <div className='instructor-feedback'>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {feedbacks?.length?(
          feedbacks.map((feedback)=>(
            <SwiperSlide>
              <p>{feedback.content}</p>
              <div className='client-info d-flex align-items-center mt-4'>
              <img src={feedback?.imageUrl} class="rounded-circle" alt="image"/>
              <div class="title"><h3>{feedback?.name}</h3><span><Rating name="rating" value={feedback?.range} readOnly /></span></div>
              </div>

              </SwiperSlide>
          ))
        ):(<p>no feedback yet</p>)}
       
      </Swiper>
    </div>
  )
}
