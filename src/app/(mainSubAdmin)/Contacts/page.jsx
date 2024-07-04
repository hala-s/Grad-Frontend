'use client'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../MainSumAdminLayout/Layout'
import { UserContext } from '@/context/user/User';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Pagination, Select, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faComments, faEye, faFilter, faPen } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Link from 'next/link';
import '../../(admin)/dashboard/dashboard.css'


export default function page() {
    

  const [contacts, setContacts] = useState([]);
  const {userToken, setUserToken, userData}=useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [contactId, setContactId] = useState(null);

  const handleClickOpenUpdate = (id) => {
    setContactId(id);
          setOpenUpdate(true);
      };
      const handleCloseUpdate = () => {
        setOpenUpdate(false);
      };


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const fetchContacts = async (pageNum = pageNumber, pageSizeNum = pageSize) => {
    if(userData){
    try{
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Contact/GetAllContact?pageNumber=${pageNum}&pageSize=${pageSize}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }});
    setContacts(data.items);
    setTotalPages(data.totalPages);
  }
    catch(error){
      console.log(error);
    }
  }
  };

  useEffect(() => {
    fetchContacts();
  }, [contacts,userData, pageNumber, pageSize]);  // Fetch courses on mount and when page or size changes
  
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

  const filteredContacts = Array.isArray(contacts) ? contacts.filter((contact) => {
    const matchesSearchTerm = Object.values(contact).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesSearchTerm;
  }) : [];

  return (
    <Layout title="Contacts">
        <div className="filter py-2 text-end">
          <nav className="navbar">
            <div className="container justify-content-end">
              <form className="d-flex gap-1" role="search">
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
              <th scope="col">Email</th>
              <th scope="col">Subject</th>
              <th scope="col">Message</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.length ? (
              filteredContacts.map((contact, index) => (
                <tr key={contact.id}>
                 
                  <th scope="row">{++index}</th>
                  <td>{contact.name}</td>
                  <td>
                    <Link
                      className="text-decoration-none"
                      href={`mailto:${contact.email}`}
                    >
                      {contact.email}
                    </Link>
                  </td>
                  <td>{contact.subject}</td>

                  <td className="d-flex gap-1">
                    <Tooltip title="See Message" placement="top">
                      <button
                        className="border-0 bg-white"
                        type="button"
                        onClick={() => handleClickOpenUpdate(contact.id)}
                      >
                        <FontAwesomeIcon
                          icon={faComments}
                          className="edit-pen"
                        />
                      </button>
                    </Tooltip>
                    <Dialog
                      fullScreen={fullScreen}
                      open={openUpdate && contactId === contact.id}
                      onClose={handleCloseUpdate}
                      aria-labelledby="responsive-dialog-title"
                      sx={{
                        "& .MuiDialog-container": {
                          "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "400px!important",
                            height: "300px!important",
                          },
                        },
                      }}
                    >
                      <DialogTitle
                        id="responsive-dialog-title"
                        className="primaryColor fw-bold text-center"
                      >
                        {"Message"}
                      </DialogTitle>

                      <DialogContent>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{
                            justifyContent: "center",
                            alignContent: "center",
                          }}
                        >
                          <div className="message">{contact.message}</div>
                        </Stack>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseUpdate} autoFocus>
                          Cancle
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No Contacts</td>
              </tr>
            )}
          </tbody>
        </table>
        <Stack
          spacing={2}
          sx={{ width: "100%", maxWidth: 500, margin: "0 auto" }}
        >
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
  );
}
