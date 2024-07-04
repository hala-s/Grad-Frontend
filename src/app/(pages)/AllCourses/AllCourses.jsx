'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './AllCourses.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Box, Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function AllCourses() {
    const [courses, setCourses] = useState([]);
    const router = useRouter()
    const [loading,setLoading] = useState(true);
    const fetchCourses = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/GetAllAccreditCourses?pageNumber=1&pageSize=100`
          );
          setCourses(data.result.items);
        } catch (error) {
          console.log(error);
        }
        finally {
          setLoading(false);
        }
      
    };
  
    useEffect(() => {
      fetchCourses();
    }, []);
  return (
    <>
    {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
          <div className='loading bg-white position-fixed vh-100 w-100 d-flex justify-content-center align-items-center z-3'>
      <span class="loader"></span>
    </div>
        </Box>
        
      ) : (
    <>
        <div className="container">
        <div className="pageTitle text-center py-5">
        <h2 className='coursesPageTitle'>Courses in academy</h2>
        <div className="courseSectionDesc pt-2">
            <p>
            Our programming course offers a structured curriculum designed to take students from basic concepts to advanced techniques. Each section includes interactive lectures, hands-on coding exercises, and real-world projects to reinforce learning. Students receive personalized mentorship, regular assessments, and access to a supportive community, ensuring they gain the practical skills and confidence needed for a successful programming career.
            </p>
        </div>
      </div>
          <div className="row justify-content-center align-items-center pb-5">
          {courses.length ? (
            courses.map((course) => (
              <div className="col-lg-4 col-md-6 col-sm-12 pb-4" key={course.id}>
               <div className="singleCourse">
                <div className="course-image row">
                  {course.imageUrl ? (
                  <img src={`${course.imageUrl}`} className="pho pb-3 img-fluid" />
            ) : (
              <img src="/course.jpg" className="pho pb-3 img-fluid" />
            )}
                  <div className="price col-md-6">
                    <span className=''>${course.price}</span>
                  </div>
                </div>
                <div className="course-content">
                    <div className="instructor-rating">
                      <ul>
                        <li><img src="./user1.png" alt="instructor-img"/></li>
                        <li><p className='instructorName'>{course.instructorName}</p></li>
                      </ul>
                      {/* <ul>
                        <li><FontAwesomeIcon icon={faStar} style={{color: "#FFD43B",}} /></li>
                        <li>(4.9)</li>
                      </ul> */}
                    </div>
                    <h4 className="title">{course.name}</h4>
                    {/* <p>{course.description}</p> */}
                    <div className="category row align-items-center">
                      <p className='col-6 pt-4 pe-5'>{course.category}</p>
                      <div className="courses-button col-6 justify-content-end pt-2 ps-4">
                                <Link href={`CourseDetails/${course.id}`} className = "text-decoration-none viewDetailsButton p-3">View Details</Link>
                                {/* <Button className='viewDetailsButton p-2'  onClick={() => router.push(`CourseDetails/${course.id}?isEnrolled=${course.isEnrolled}`)}>View Details</Button> */}
                      </div>
                    </div>
                </div>
            </div>
           
            </div>
            ))
          ) : (
            <div>No Courses Found!</div>
          )}
            
          </div>
           
        </div>
    </>
    )}</>
  )
}
