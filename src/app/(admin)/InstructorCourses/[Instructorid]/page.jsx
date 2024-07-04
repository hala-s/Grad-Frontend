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

export default function InstructorCourses({params}) {
    const {userToken, setUserToken, userData}=useContext(UserContext);
    const [instructorCourse,setInstructorCourse] = useState([])
    const [employeeName, setEmployeeName] = useState('');

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const getInstructorCourses = async (pageNum = pageNumber, pageSizeNum = pageSize) =>{
      if(userData){
    try {
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/GetAllCoursesGivenByInstructor?Instructorid=${params.Instructorid}&pageNumber=${pageNum}&pageSize=${pageSize}`,{ headers: { Authorization: `Bearer ${userToken}` } });
      setInstructorCourse(data.result.items);
      setTotalPages(data.result.totalPages);
      }
      catch (error) {
      console.log(error)
      }
    }   
  };

  const [employees, setEmployees] = useState([]);


      const fetchEmployees = async () => {
        if(userData){
        try{
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Employee/GetAllEmployee`);
        setEmployees(data.result.items);
      }
        catch(error){
          console.log(error);
        }}
      };


  useEffect(() => {
    getInstructorCourses();
    fetchEmployees();
    }, [instructorCourse,userData, pageNumber, pageSize]);  // Fetch courses on mount and when page or size changes
  
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPageNumber(1); // Reset to the first page when page size changes
  };
  
  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

  useEffect(() => {
    const employee = employees.find(employee => employee.id == params.Instructorid);
    if(employee) {
        setEmployeeName(`${employee.fName} ${employee.lName}`);
    }
}, [employees, params.Instructorid]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredICourses = instructorCourse.filter((ICourse) => {
const matchesSearchTerm =
  Object.values(ICourse).some(
    (value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
  );
return matchesSearchTerm ;

 
});

  
  return (
    
    <Layout title = {`Courses for "${employeeName}"`}>
        
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
                <div className="icons d-flex gap-2 pt-2">
                    
                    <div className="dropdown">
  <button className="dropdown-toggle border-0 bg-white edit-pen" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <FontAwesomeIcon icon={faFilter} />
  </button>
  <ul className="dropdown-menu">
 
  </ul>
</div>
<FontAwesomeIcon icon={faArrowUpFromBracket} />
                    
                </div>
                </form>
               

            </div>
        </nav>
        
      </div>
      {/* {employees ? employees.map((employee) =>{
          {params.Instructorid == employee.id ? <h2>Courses for {employee.fName} {employee.lName}</h2> : <p> None </p>}
      }) : <p>None</p>} */}

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
  {filteredICourses.length ? (
    filteredICourses.map((course,index) =>(
      <tr key={course.id}>
      <th scope="row">{++index}</th>
      <td>{course.name}</td>
      <td>{course.price}</td>
      <td>{course.category}</td>
      <td>{course.status}</td>
      <td>{course.startDate}</td>
      <td className='d-flex gap-1'>

      <Tooltip title="View Course details" placement="top">
                  <Link href={`CourseDetails/${course.id}`}>
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
