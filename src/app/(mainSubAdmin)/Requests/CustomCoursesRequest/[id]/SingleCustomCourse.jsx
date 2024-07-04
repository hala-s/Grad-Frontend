import { UserContext } from '@/context/user/User';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import '../CustomCoursesRequest.css'

export default function SingleCustomCourse({id}) {
    const {userToken, setUserToken, userData}=useContext(UserContext);
    const [course, setCourse] = useState({})
    const fetchSingleCustomCourse = async () => {
        if(userData){
        try{
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/GetCustomCoursesById?id=${id}`,{headers :{Authorization:`Bearer ${userToken}`}});
        setCourse(data.result);
      }
        catch(error){
          console.log(error);
        }
      }
      };
      useEffect(() => {
        fetchSingleCustomCourse();
      }, [course,userData]); 

  return (
    <>
    <div className="customCourseContent">
        <ul>
            <li className=' fs-5 content list-unstyled p-2'>Custom course name: <span>{course.name}</span></li>
            <li className=' fs-5 content list-unstyled p-2'>student name: <span>{course.studentFName} {course.studentLName}</span></li>
            <li className=' fs-5 content list-unstyled p-2'>student id: <span className='fs-6'>{course.studentId}</span></li>
            <li className=' fs-5 content list-unstyled p-2'>custom course start date:<span>{course.startDate}</span></li>
            <li className=' fs-5 content list-unstyled p-2'>custom course end date:<span> {course.endDate}</span></li>
            <li className=' fs-5 content list-unstyled p-2'>custom course description: <span>{course.description}</span></li>
        </ul>
    </div>
    </>
  )
}