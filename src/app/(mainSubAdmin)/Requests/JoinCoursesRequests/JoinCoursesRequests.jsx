import { UserContext } from '@/context/user/User';
import { faArrowUpFromBracket, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl, InputLabel, MenuItem, Pagination, Select, Stack } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export default function JoinCoursesRequests() {

    
    const {userToken, setUserToken, userData}=useContext(UserContext);
    const [joinCoursesReq, setJoinCoursesReq] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const fetchRequestsForJoinCourses = async (pageNum = pageNumber, pageSizeNum = pageSize) => {
      if(userData){
      try{
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Request/GetAllRequestToJoinCourses?pageNumber=${pageNum}&pageSize=${pageSize}`,{headers :{Authorization:`Bearer ${userToken}`}});


      setJoinCoursesReq(data.result.items);
      setTotalPages(data.result.totalPages);
    }
      catch(error){
        console.log(error);
      }
    }
    };

    const joinCourse = async (courseId, studentId, status) => {
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
              const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_EDUCODING_API}StudentCourse/ApprovelToJoin?courseId=${courseId}&studentId=${studentId}&status=${status}`, {},
                {
                  headers: {
                    Authorization: `Bearer ${userToken}`,
                  },
                });
    
              if (status == "joind") {
                Swal.fire({
                  title: `This student enrolled to this course Successfully`,
                  text: "Request Accepted",
                  icon: "success"
                });
              } else if (status == 'reject') {
                Swal.fire({
                  icon: "error",
                  title: "Request Rejected ):",
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
        fetchRequestsForJoinCourses();
      }, [joinCoursesReq,userData, pageNumber, pageSize]);  // Fetch courses on mount and when page or size changes
      
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



const filteredRequestsToJoinCourses = Array.isArray(joinCoursesReq) ? joinCoursesReq.filter((course) => {
  const matchesSearchTerm = Object.values(course).some(
    (value) =>
      typeof value === "string" &&
      value.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return matchesSearchTerm;
}) : [];


  return (
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
      <th scope="col">ID</th>
      <th scope="col">Student name</th>
      {/* <th scope="col">Student ID</th> */}
      <th scope="col">Course name</th>
      {/* <th scope="col">Course Id</th> */}
      <th scope="col">Enrollment date</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {filteredRequestsToJoinCourses.length ? (
    filteredRequestsToJoinCourses.map((req, index) => (
        <tr key={index}>
        <th scope="row">{index + 1}</th>
      <td>{req.studentName}</td>
      {/* <td>{req.studentId}</td> */}
      <td>{req.courseName}</td>
      {/* <td>{req.courseId}</td> */}
      <td>{req.enrollDate}</td>
      {/* <td className='d-flex gap-1'>

      <Link href={`/Profile/${course.studentId}`}>
        <button  type="button" className='edit-pen border-0 bg-white '>
        <FontAwesomeIcon icon={faEye} />
        </button>
        </Link>
        </td> */}
         <td className="d-flex gap-1">
                  {/* <Link href={"/Profile"}>
                    <button type="button" className="border-0 bg-white ">
                      <FontAwesomeIcon icon={faEye} className="edit-pen" />
                    </button>
                  </Link> */}
                  <button type="button" className="btn accredit" onClick={()=>joinCourse(req.courseId,req.studentId,'joind')} >Accept</button>  
                {/* <Link href='/dashboard' className='text-decoration-none acc'>Accredit </Link> */}
                <button type="button" className="btn accredit" onClick={()=>joinCourse(req.courseId,req.studentId,'reject')} >Reject</button>

                </td>

    </tr>
      ))): (
        <tr>
          <td colSpan="7">No Requests for joining courses</td>
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
  )
}
