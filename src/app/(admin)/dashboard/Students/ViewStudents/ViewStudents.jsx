'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faBook, faEye, faFileCsv, faFilter } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link';
import { UserContext } from '@/context/user/User';
import { FormControl, InputLabel, MenuItem, Pagination, Select, Stack, Tooltip } from '@mui/material';

export default function ViewStudents() {
  const {userToken, setUserToken, userData}=useContext(UserContext);

  const [students, setStudents] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const ExportAllDataToPdf =async()=>{
    if(userData){
      try{
        const data = JSON.stringify(students);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_EDUCODING_API}Reports/export-all-Data-To-PDF?data=student`,
          {
            headers: { Authorization: `Bearer ${userToken}`, 'Content-Type': 'application/json' },
            responseType: 'blob'
          }
        );
  

        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Students.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }catch(error){
        console.log(error)
      }
    }
  }

  const ExportAllDataToCSV =async()=>{
    if(userData){
      try{
        const data = JSON.stringify(students);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_EDUCODING_API}Reports/export-all-data-to-excel?data=student`,
          {
            headers: { Authorization: `Bearer ${userToken}`, 'Content-Type': 'application/json' },
            responseType: 'blob'
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'students.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }catch(error){
        console.log(error)
      }
    }
  }


  const fetchStudents =  async (pageNum = pageNumber, pageSizeNum = pageSize) => {
    if(userData){
    try{
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}StudentsContraller/GetAllStudents?pageNumber=${pageNum}&pageSize=${pageSize}`,{ headers: { Authorization: `Bearer ${userToken}` } });
    setStudents(data.result.items);
    setTotalPages(data.result.totalPages);
  }
    catch(error){
      console.log(error);
    }
  }
  };

  // useEffect(() => {
  //   fetchStudents();
  // }, [userData]);
  useEffect(() => {
    fetchStudents();
  }, [students,userData, pageNumber, pageSize]);  // Fetch courses on mount and when page or size changes
  
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

  const filteredStudents = students.filter((student) => {
const matchesSearchTerm =
  Object.values(student).some(
    (value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
  );


return matchesSearchTerm ;
});

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
                <div className="icons d-flex gap-2 pt-3">
                    
                  

                    
                </div>
                </form>
                <Tooltip title="Convert students into pdf" placement="top">
                <button className='border-0 bg-transparent edit-pen' onClick={ExportAllDataToPdf}>
                <FontAwesomeIcon icon={faArrowUpFromBracket} className='px-2'/>
                </button>
               </Tooltip>

               <Tooltip title="Convert Students into Excel file" placement="top">
        <button className='border-0 bg-transparent edit-pen' onClick={ExportAllDataToCSV}>
              <FontAwesomeIcon icon={faFileCsv} />
            </button>
            </Tooltip>

            </div>
        </nav>
        
      </div>



      <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Option</th>
    </tr>
  </thead>
  <tbody>
  {filteredStudents.length ? (
    filteredStudents.map((student,index) =>(
      <tr key={student.studentId}>
      <th scope="row">{++index}</th>
      <td>{student.userName}</td>
      <td>{student.email}</td>
      <td className='d-flex gap-1'>

      <Link href={`/Profile/${student.studentId}`}>
      <Tooltip title="View Profile" placement="top">
        <button  type="button" className='edit-pen border-0 bg-white '>
        <FontAwesomeIcon icon={faEye} />
        </button>
      </Tooltip>
        </Link>
        {userData &&  (
                    <Link 
                    href={{
                      pathname: `/StudentCourses/${student.studentId}`,
                      query: { fName: student.userName }
                    }}>

                      <Tooltip title="View Student Courses" placement="top">
                    <button type="button" className="border-0 bg-white ">
                      <FontAwesomeIcon icon={faBook} className="edit-pen" />
                    </button>
                    </Tooltip>
                  </Link>
                  
                  )}
        </td>

    </tr>
      ))): (
        <tr>
          <td colSpan="7">No Students</td>
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
