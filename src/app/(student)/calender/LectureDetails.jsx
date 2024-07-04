'use client';
import React, { useContext, useState, useEffect } from 'react';
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { UserContext } from '../../../context/user/User.jsx';
import './style.css'
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

export default function LectureDetails({ open, onClose, lectureID}) {
    const { userToken, setUserToken, userData, userId } = useContext(UserContext);
    const [Alertopen, setAlertOpen] = React.useState(false);
  const [lecture, setLecture] = React.useState(false);
  const [openList, setOpenList] = React.useState(true);

  const handleClick = () => {
    setOpenList(!openList);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };
  const getLectures = async () => {
    try {
      if (lectureID) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_EDUCODING_API}Lectures/GetConsultationById?consultationId=${lectureID}`,
          

          {headers :{Authorization:`Bearer ${userToken}`}}

        );

setLecture(response.data.result);
        
      }
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };
  const JoinLecture = async () => {
    try {
      if (lectureID&&userId) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_EDUCODING_API}StudentsContraller/JoinToPublicLecture?StudentId=${userId}&ConsultaionId=${lectureID}          `,
          {},

          {headers :{Authorization:`Bearer ${userToken}`}}

        );

        if (response.data.isSuccess) {
            setAlertOpen(true);
            onClose();
         }
      }
    } catch (error) {
      console.error('Error joining lectures:', error);
    }
  };
  useEffect(() => {
    getLectures();

  }, [lecture,lectureID,userId]);


  return (
    <>
     <Snackbar open={Alertopen} autoHideDuration={10000} onClose={handleClose} >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%'}}
        >
          You Are Joined successfully!
        </Alert>
      </Snackbar>
    <Dialog
     open={open} 
     onClose={onClose}
     sx={{
      "& .MuiDialog-container": {
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "500px!important",  
                    },
      },}} >

    <DialogTitle id="responsive-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
  <span className='mx-auto'>{lecture.name}</span>
</DialogTitle>
    <DialogContent>
   <div className="lecture-details mb-2 ">
      Date: {lecture.date}
    </div>
    <div className="lecture-details mb-2 ">
      Start time: {lecture.startTime}
    </div>
    <div className="lecture-details mb-2 ">
      End time: {lecture.endTime}
    </div>
    <div className="lecture-details mb-2 ">
      Duration: {lecture.duration}
    </div>
    <div className="lecture-details mb-2 ">
      Instructor Name: {lecture.instructoruserName} {lecture.instructorLName}
    </div>
 
    <div className="lecture-details mb-2 ">
      Student Name: {lecture.studentuserName} {lecture.studentLName}
    </div>
    {lecture.studentId!=userId&&
     <div className="text-center mt-3">
     <Button sx={{px:2}} variant="contained"
           className="m-2 btn "
           type="submit"
           onClick={JoinLecture}
         >
           Join Lecture
         </Button>
     </div>}
    {/* <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>

            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse> */}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
  </>
  )
}
