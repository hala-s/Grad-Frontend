'use client'
import { UserContext } from '@/context/user/User';
import { faArrowUpFromBracket, faEye, faFilter, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Pagination, Select, useMediaQuery } from '@mui/material';
import { Stack, useTheme } from '@mui/system';
import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import EditCourse from './EditCourse/[id]/page';

export default function UnAccreditCourses() {
  const { userToken, setUserToken, userData,userId } = useContext(UserContext);

  const [nonAccreditcourses, setNonAccreditCourses] = useState([]);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [courseId, setCourseId] = useState(null);

const handleClickOpenUpdate = (id) => {
  setCourseId(id);
    setOpenUpdate(true);
};
const handleCloseUpdate = () => {
  setOpenUpdate(false);
};

  const fetchCoursesBeforeAccredittion =  async (pageNum = pageNumber, pageSizeNum = pageSize) => {
    if (userData) {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/GetallUndefinedCoursesToSubAdmin?subAdminId=${userId}&pageNumber=${pageNum}&pageSize=${pageSize}`,{
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }
        );
        setNonAccreditCourses(data.result.items);
        setTotalPages(data.result.totalPages);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchCoursesBeforeAccredittion();
  }, [nonAccreditcourses,userData, pageNumber, pageSize]);  // Fetch courses on mount and when page or size changes
  
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPageNumber(1); // Reset to the first page when page size changes
  };
  
  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCoursesBeforeAccreditation = Array.isArray(nonAccreditcourses) ? nonAccreditcourses.filter((course) => {
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
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Start Date</th>
            <th scope="col">Instructor</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoursesBeforeAccreditation.length ? (
            filteredCoursesBeforeAccreditation.map((course,index) => (
              <tr key={course.id}>
                <th scope="row">{++index}</th>
                <td>{course.name}</td>
                <td>{course.price}</td>
                <td>{course.startDate}</td>
                <td>{course.instructorName}</td>
                <td className="d-flex gap-1">
                <button className="border-0 bg-white" type="button" onClick={() => handleClickOpenUpdate(course.id)}>
                <FontAwesomeIcon icon={faPen} className="edit-pen" />
            </button>
            <Dialog
        fullScreen={fullScreen}
        open={openUpdate && courseId === course.id}
        onClose={handleCloseUpdate}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "600px!important",  
              height: "600px!important",            },
          },
          
        }}
        >
          <DialogTitle id="responsive-dialog-title" className='primaryColor fw-bold' >
          {"Edit Course"}
        </DialogTitle>

        <DialogContent>
        <Stack
   direction="row"
   spacing={1}
   sx={{ justifyContent: 'center',  alignContent: 'center'}}
    >
     <EditCourse id={course.id} name={course.name} price={course.price} category={course.category} instructorId={course.instructorId} startDate={course.startDate} Deadline={course.Deadline} totalHours={course.totalHours} limitNumberOfStudnet={course.limitNumberOfStudnet} description={course.description} image={course.imageUrl} setOpenUpdate={setOpenUpdate} />
     </Stack>
        </DialogContent>
        <DialogActions>
         
         <Button onClick={handleCloseUpdate} autoFocus>
           Cancle
         </Button>
       </DialogActions>
        </Dialog>
                  <Link href={`CourseDetails/${course.id}`}>
                    <button
                      type="button"
                      className="edit-pen border-0 bg-white "
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </Link>
                  
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
  )
}
