'use client'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import '../CourseDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCode, faEnvelope, faHourglassHalf, faLayerGroup, faPersonChalkboard, faPhone, faStopwatch, faUser, faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import '../../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { UserContext } from '@/context/user/User';
import axios from 'axios';
import { faCss3, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { useSearchParams } from 'next/navigation'
import Swal from 'sweetalert2'
import Review from './Review.jsx'
import { Tooltip } from '@mui/material'
import Link from 'next/link'
export default function CourseDetails({params}) {
  const {userToken, setUserToken, userData,userId}=useContext(UserContext);




  let [course,setCourse] = useState({});
  let [instructors,setInstructors] = useState([]);
  let[instructor,setInstructor] = useState({});
  let[role,setRole] = useState();
 const fetchIns = async ()=>{
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Employee/GetAllEmployee?pageNumber=1&pageSize=1000`);
     setInstructors(data.result.items);
  }
  const getCourse =async ()=>{
    try {
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/GetCourseById?id=${params.id}`,);
        setCourse(data.result);
    }
      catch (error) {
      console.log(error)
      }
      
  }


  useEffect(() => {
    getCourse();
    fetchIns();
  }, [course,userData]);

  useEffect(() => {
    if (course && instructors.length > 0) {
      const courseInstructor = instructors.find(ins => ins.id === course.instructorId);
      if (courseInstructor) {
        setInstructor(courseInstructor);
      }
    }
  }, [course, instructors]);

  useEffect(() => {
    if (userData){
      setRole(userData.role)
    }
  }, [userData]);



  return (
    <Layout>
      <div className="pageTitle text-center py-4">
        <h2 className='courseDetailsTitle'>Course Details</h2>
        <div className="shape1">
          <FontAwesomeIcon icon={faCode} style={{color: "#4c5372",}} className='shape1a fs-3'/>
        </div>
        <div className="shape2">
          <FontAwesomeIcon icon={faCss3} style={{color: "#4c5372",}} className='shape1a fs-3'/>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="row gx-10">
            <div className="col-lg-8">
              <div className="course-details">
                <div className="course-details-image">
                  <img src={course.imageUrl} alt="course image" />
                  <span>{course.category}</span>
                </div>
                <h2 className="title fw-bolder">Name: {course.name}</h2>
                <div className="courses-details-admin d-flex">
  <div className="admin-author d-flex justify-content-between align-items-center">
    <div className="author-thumb">
      <img src={instructor.imageUrl} alt="Author" className='Iimage' />
    </div>
    <div className="author-content">
      <a className="name" href="#">{course.instructorName}</a>
      <span className="Enroll">{course.limitNumberOfStudnet}  Students</span>
    </div>
  </div>
  {/* <div className="admin-rating">
    <span className="rating-count">4.9</span>
    <span className="rating-star">
      <span className="rating-bar" style={{width: '80%'}} />
    </span>
    <span className="rating-text">(5,764 Rating)</span>
  </div> */}
                </div>

                <div className='py-4'>
                  <nav className='navTab mb-4'>
                    <div className="nav nav-tabs d-flex justify-content-center align-items-center gap-3" id="nav-tab" role="tablist">
                      <button className="nav-link active" id="nav-desc-tab" data-bs-toggle="tab" data-bs-target="#nav-desc" type="button" role="tab" aria-controls="nav-desc" aria-selected="true">Description</button>
                      <button className="nav-link" id="nav-Ins-tab" data-bs-toggle="tab" data-bs-target="#nav-Ins" type="button" role="tab" aria-controls="nav-Ins" aria-selected="false">Instructor</button>
                      <button className="nav-link" id="nav-reviwe-tab" data-bs-toggle="tab" data-bs-target="#nav-reviwe" type="button" role="tab" aria-controls="nav-reviwe" aria-selected="false">Reviews</button>
                      {/* <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Courses</button> */}
                    </div>
                  </nav>
                  <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-desc" role="tabpanel" aria-labelledby="nav-desc-tab" tabIndex={0}>
                      <h3 className='title'>Description:</h3>
                      <p>{course.description}</p>
                    </div>
                    <div className="tab-pane fade" id="nav-Ins" role="tabpanel" aria-labelledby="nav-Ins-tab" tabIndex={1}>
                      
                      <div className="courseIns text-center">
                        <h3 className='crsIns'>Course Instructor:</h3>
                      <div className="crsInsContent d-flex gap-2 flex-column justify-content-center align-items-center">
                          <img src={instructor.imageUrl} alt="instructor" className='' />
                          <h4>{course.instructorName}</h4>
                          {/* <ul className='d-flex pe-4 gap-2'>
                            <li className=' social'><FontAwesomeIcon icon={faLinkedinIn} /></li>
                            <li className=' social'><FontAwesomeIcon icon={faGithub} /></li>
                            <li className=' social'><FontAwesomeIcon icon={faFacebookF} /></li>
                            <li className=' social'><FontAwesomeIcon icon={faEnvelope} /></li>
                          </ul> */}
                          <div className="d-flex justify-content-center gap-3 pt-3">
                        <Tooltip title="phone" placement="top">
                          <Link className='social' href={`tel:${instructor.phoneNumber}`}><FontAwesomeIcon icon={faPhone} /></Link></Tooltip>
                        <Tooltip title="Email" placement="top">
                          <Link className='social' href={`mailto:${instructor.email}`}><FontAwesomeIcon icon={faEnvelope} /></Link></Tooltip>
                        </div>
                          <p>{instructor.skillDescription}</p>
                          {/* <ul className='d-flex gap-2 pe-4'>
                            <li className='social'>j</li>
                            <li className='social'>k</li>
                            <li className='social'>k</li>
                          </ul> */}
                      </div>
                      </div>
                      
                    </div>
                    <div className="tab-pane fade" id="nav-reviwe" role="tabpanel" aria-labelledby="nav-reviwe-tab" tabIndex={2}>
                      <Review courseId={params.id}/>
                    </div>
                    {/* <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex={0}>
                      ,,,,,
                    </div> */}
                  </div>
                </div>

              </div>
            </div>
            <div className="col-lg-4 pb-5">
              <div className="sidebar">
                <div className="sidebar-widget widget-information">
                  <div className="info-price pb-3">
                    <span className='price'>$ {course.price}</span>
                  </div>
                  <div className="info-list">
                    <ul>
                      <li>
                      <FontAwesomeIcon icon={faUser} className='icon-list pe-2'/>
                      <strong>Instructor</strong>
                      <span>{course.instructorName}</span>
                      </li>
                      <li>
                      <FontAwesomeIcon icon={faClock} className='icon-list pe-2'/>
                      <strong>Start date</strong>
                      <span>{course.startDate}</span>
                      </li>
                      <li>
                      <FontAwesomeIcon icon={faLayerGroup} className='icon-list pe-2'/>
                      <strong>Category</strong>
                      <span>{course.category}</span>
                      </li>
                      <li>
                      <FontAwesomeIcon icon={faUserGraduate} className='icon-list pe-2'/>
                      <strong>Number of Studets</strong>
                      <span>{course.limitNumberOfStudnet}</span>
                      </li>
                      <li>
                      <FontAwesomeIcon icon={faHourglassHalf} className='icon-list pe-2'/>
                        <strong>Total hours</strong>
                        <span>{course.totalHours}</span>
                      </li>
                      <li>
                      <FontAwesomeIcon icon={faStopwatch} className='icon-list pe-2'/>
                      <strong>Deadline</strong>                        
                        <span>{course.deadline}</span>
                      </li>
                    </ul>
                  </div>
                  {/* {userData && role == "student"&&
                    <div className="info-btn">
                    
                    <button onClick={enrollCourse}  className="btn btn-primary btn-hover-dark enroll">Enroll Now</button>
                  </div>
                  } */}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
