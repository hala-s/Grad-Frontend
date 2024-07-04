'use client'
import Layout from '@/app/(admin)/AdminLayout/Layout'
import { faArrowUpFromBracket, faEye, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import '../../dashboard/dashboard.css'
import { UserContext } from '@/context/user/User'
import { FormControl, InputLabel, MenuItem, Pagination, Select, Stack, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'

export default function page({params}) {
    const {userToken, setUserToken, userData}=useContext(UserContext);
    const [studentCourses,setStudentCourses] = useState([])
    const [studentName, setStudentName] = useState('');
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const getStudentCourses = async (pageNum = pageNumber, pageSizeNum = pageSize) =>{
      if(userData){
    try {
      //setLoading(false)
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/GetAllEnrolledCoursesForAStudent?studentid=${params.studentid}&pageNumber=${pageNum}&pageSize=${pageSize}`,{ headers: { Authorization: `Bearer ${userToken}` } });
      setStudentCourses(data.result.items);
      setTotalPages(data.result.totalPages);
      //setLoading(false)
      }
      catch (error) {
      console.log(error)
      }
    }   
  };

  const [students, setStudents] = useState([]);


      const fetchStudents = async () => {
        if(userData){
        try{
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}StudentsContraller/GetAllStudents?pageNumber=1&pageSize=100000`,{ headers: { Authorization: `Bearer ${userToken}` } });
        setStudents(data.result.items);
      }
        catch(error){
          console.log(error);
        }}
      };


  useEffect(() => {
    getStudentCourses();
    fetchStudents();
    }, [studentCourses,userData, pageNumber, pageSize]);  // Fetch courses on mount and when page or size changes
  
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPageNumber(1); // Reset to the first page when page size changes
  };
  
  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

 useEffect(() => {
    const student = students.find(student => student.studentId == params.studentid);
    if(student) {
        setStudentName(`${student.userName}`);
    }
}, [students, params.studentid]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSCourses = studentCourses.filter((SCourse) => {
const matchesSearchTerm =
  Object.values(SCourse).some(
    (value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
  );
return matchesSearchTerm ;

 
});

  return (
    <Layout title = {`Courses for Student "${studentName}"`}>
        
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
      <th scope="col">Category</th>
      <th scope="col">Status</th>
      <th scope="col">Start Date</th>
      <th scope="col">Option</th>
    </tr>
  </thead>
  <tbody>
  {filteredSCourses.length ? (
    filteredSCourses.map((course,index) =>(
      <tr key={course.course.id}>
      <th scope="row">{++index}</th>
      <td>{course.course.name}</td>
      <td>{course.course.price}</td>
      <td>{course.course.category}</td>
      <td>{course.course.status}</td>
      <td>{course.course.startDate}</td>
      <td className='d-flex gap-1'>

      <Tooltip title="View Course details" placement="top">
                  <Link href={`CourseDetails/${course.course.id}`}>
                    <button
                      type="button"
                      className="edit-pen border-0 bg-white "
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </Link>
                  </Tooltip>
        </td>

    </tr>
      ))): (
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


      
    </Layout>
)
}
