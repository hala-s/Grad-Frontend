'use client'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Typography from '@mui/material/Typography';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Link from '@mui/material/Link';
import './style.css'
import Layout from '../studentLayout/Layout.jsx';
import { UserContext } from '../../../context/user/User.jsx';
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select, Stack } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#4c5372', // Change the background color here
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function page() {
  const { userToken, userId } = useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [lectures, setLectures] = useState([]);
  // const [loading, setLoading] = useState(true);
  const getLectures = async (pageNum = pageNumber, pageSizeNum = pageSize) => {
    if (userId) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_EDUCODING_API}Lectures/GetAllConsultations?studentId=${userId}&pageNumber=${pageNum}&pageSize=${pageSizeNum}`,
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        setLectures(response.data.result.items);
        setTotalPages(response.data.result.totalPages);
      } catch (error) {
        console.error('Error fetching lectures:', error);
      }// } finally {
      //   setLoading(false);
      // }
    }
  };

  useEffect(() => {
    getLectures();
  }, [userId, userToken, pageNumber, pageSize]);

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

const filteredLectures = Array.isArray(lectures) ? lectures.filter((lecture) => {
  const matchesSearchTerm = Object.values(lecture).some(
    (value) =>
      typeof value === "string" &&
      value.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return matchesSearchTerm;
}) : [];


  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  
  return (
    <Layout title='My Lectures'>
      <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={2}
    >
      {/* <FormControl fullWidth sx={{ width: '15%' }} className="page-Size mt-5 me-5" >
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
      </FormControl> */}
      <div className="filter py-2 text-end pe-5">
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
              <FormControl fullWidth  sx={{ width: '50%' }} >
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
    </Stack>
      <TableContainer component={Paper} sx={{ width: '90%', mt: 5 }} className='lecturesTable'>
        <Table  aria-label="customized table" className=''>
          <TableHead>
            <TableRow>
              <StyledTableCell>Lecture title</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLectures.length ? (
              filteredLectures.map((lecture) => (
                <StyledTableRow key={lecture.consultationId}>
                  <StyledTableCell component="th" scope="row">
                  <Link href={`MyLectures/${lecture.consultationId}`}>{lecture.name}</Link>
                  </StyledTableCell>
                  <StyledTableCell align="center">{lecture.date}</StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={2} align="center">
                  No Lectures Yet.
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} sx={{ width: '100%', maxWidth: 500, margin: '0 auto' }} className='pt-5'>
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
