'use client'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import '../../dashboard/dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faEye, faFilter, faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import { UserContext } from '@/context/user/User';
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select, Stack } from '@mui/material';
import Swal from 'sweetalert2';
import '../../dashboard/loading.css'
import { Padding } from '@mui/icons-material';


export default function AccreditCourses() {
  const {userToken, setUserToken, userData}=useContext(UserContext);

  const [accreditCourses, setAccreditCourses] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);


  const fetchCoursesForAccredit = async (pageNum = pageNumber, pageSizeNum = pageSize)=> {
    if(userData){
    try{
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/GetAllCoursesForAccredit?pageNumber=${pageNum}&pageSize=${pageSize}`);
    setAccreditCourses(data.result.items);
    setTotalPages(data.result.totalPages);
  }
    catch(error){
      console.log(error);
    }

  }
  };


  const accreditCourse = async (courseId , Status) => {
    if (userData) {
      Swal.fire({
        title: `Are you sure?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/accreditCourse?courseId=${courseId}`, {Status},
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                },
              });
  
            if (Status == "accredit") {
              Swal.fire({
                title: `Course Accredit Successully`,
                text: "Request Accepted",
                icon: "success"
              });
            } else if (Status == 'reject') {
              Swal.fire({
                icon: "error",
                title: "Event Rejected ):",
                text: "Opsss...",
              });
            }
  
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  };

  useEffect(() => {
    fetchCoursesForAccredit();
  }, [accreditCourses,userData, pageNumber, pageSize]);

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

const filteredAccreditCourses = Array.isArray(accreditCourses) ? accreditCourses.filter((course) => {
  const matchesSearchTerm = Object.values(course).some(
    (value) =>
      typeof value === "string" &&
      value.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return matchesSearchTerm;
}) : [];

const getStatusStyle = (status) => {
  switch (status) {
    case 'accredit':
      return { borderRadius:'6px', color: 'green',backgroundColor:'rgba(0, 128, 0, 0.1)'};
    case 'reject':
      return {  borderRadius:'6px', color: 'red' ,backgroundColor:'rgba(255, 0, 0, 0.1)'};
    case 'finish':
      return { borderRadius:'6px', color: 'blue',backgroundColor:'rgba(0, 0, 255, 0.1)' };
    case 'start':
      return {  borderRadius:'10px', color: 'purple',backgroundColor:'#4c53721d' };
    default:
      return {  borderRadius:'6px', color: 'rgb(101, 101, 101)' ,backgroundColor:'rgba(128, 128, 128, 0.07)'};
  }
};


  return (
    <>


        <>
      <div className="filter py-2 text-end">
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
     


      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Start Date</th>
            <th scope="col">Instructor</th>
            <th scope="col">SubAdmin</th>
            <th scope="col">Status</th>
            <th scope='col'>Det.</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccreditCourses.length ? (
            filteredAccreditCourses.map((course,index) => (
              <tr key={course.id} >
                <th scope="row">{++index}</th>
                <td>{course.name}</td>
                <td>{course.price}</td>
                <td>{course.startDate}</td>
                <td>{course.instructorFName} {course.instructorLName}</td>
                <td>{course.subAdminFName} {course.subAdminLName}</td>
                <td className='text-center align-content-center'><span className='p-2 border-2' style={getStatusStyle(course.status)}>{course.status}</span></td>
                <td>
                <Link href={`CourseDetails/${course.id}`}>
                    <button
                      type="button"
                      className="edit-pen border-0 bg-white "
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </Link>
                </td>
                <td className="d-flex gap-1">
                  
                  <button type="button" className="btn accredit" onClick={()=>accreditCourse(course.id,'accredit')} disabled = {course.status == 'accredit' || course.status == 'reject' || course.status == 'finish'||course.status == 'start'} >
                  Accredit
                  </button>  
                <button type="button" className="btn accredit" onClick={()=>accreditCourse(course.id,"reject")} disabled = {course.status == 'accredit' || course.status == 'reject' || course.status == 'finish'||course.status == 'start'} >
                Reject
                </button>

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No Courses</td>
            </tr>
          )}
        </tbody>
      </table>
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
    </>
    
    </>
  );
}
