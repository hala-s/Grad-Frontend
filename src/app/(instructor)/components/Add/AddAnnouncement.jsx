'use client';
import React, { useContext, useState } from 'react';
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Input from '../../../../component/input/Input.jsx';
import TextArea from '../../../../component/input/TextArea.jsx';

import { UserContext } from '../../../../context/user/User.jsx';

export default function AddAnnouncement({ open, onClose,handleCloseAdd, type ,Id }) {
  const {userToken, setUserToken, userData}=useContext(UserContext);

  const [Alertopen, setAlertOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };
  const initialValues = {
    name: "",
    description: "",
  };
  const onSubmit = async (tasks) => {
try{const formData = new FormData();
formData.append("name", tasks.name);
formData.append("description", tasks.description);
formData.append(type, Id);
formData.append("instructorId",userData.userId);

const { data } = await axios.post(
  `${process.env.NEXT_PUBLIC_EDUCODING_API}MaterialControllar/AddAnnouncement`,
  formData,
  {headers: {
    'Authorization':`Bearer ${userToken}`,

    'Content-Type': 'multipart/form-data','Content-Type': 'application/json',
  }}

);
 formik.resetForm();
 onClose(); 
 handleCloseAdd();
 setAlertOpen(true);

  }catch(error){
    console.log(error);
  }
  };
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("name is required"),
      description: yup.string(),

  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: validationSchema,
  });
  const inputs = [
    {
      id: "name",
      type: "text",
      name: "name",
      title: "name",
      value: formik.values.name,
    },
    {
      id: "description",
      type: "text",
      name: "description",
      title: "description",
      value: formik.values.description,
    },
 
  ];
  const renderInputs = inputs.slice(0, -1).map((input, index) => (
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      value={input.value}
      title={input.title}
      onChange={input.onChange || formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
      errors={formik.errors}
      key={index}
    />
  ));
  const lastInput = inputs[inputs.length - 1];

const textAraeInput = (
  <TextArea
    type={lastInput.type}
    id={lastInput.id}
    name={lastInput.name}
    value={lastInput.value}
    title={lastInput.title}
    onChange={lastInput.onChange || formik.handleChange}
    onBlur={formik.handleBlur}
    touched={formik.touched}
    errors={formik.errors}
    key={inputs.length - 1}
  />
);


  return (
    <>
     <Snackbar open={Alertopen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Link Added successfully!
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

    <DialogTitle>Add Announcement</DialogTitle>
    <DialogContent>
          <div className="form-container sign-up">
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">        
        {renderInputs}
        {textAraeInput}
        <div className="text-center mt-3">
        <Button sx={{px:2}} variant="contained"
              className="m-2 btn "
              type="submit"
              disabled={!formik.isValid}
            >
              Add
            </Button>
        </div>
      </form>
    </div>
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
