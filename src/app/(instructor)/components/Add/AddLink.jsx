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
import { UserContext } from '../../../../context/user/User.jsx';
export default function AddLink({ open, onClose ,handleCloseAdd,type, Id}) {
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
    linkUrl: "",
  };
  const onSubmit = async (tasks) => {
    try{
const formData = new FormData();
formData.append("name", tasks.name);
formData.append("linkUrl", tasks.linkUrl);
formData.append(type ,Id);
formData.append("InstructorId",userData.userId);

const { data } = await axios.post(
  `${process.env.NEXT_PUBLIC_EDUCODING_API}MaterialControllar/AddLink`,
  formData,
  {headers: {
  'Authorization':`Bearer ${userToken}`,

    'Content-Type': 'multipart/form-data','Content-Type': 'application/json',
  }}

);
 formik.resetForm();
 setAlertOpen(true);
 onClose(); 
 handleCloseAdd();
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
      id: "linkUrl",
      type: "text",
      name: "linkUrl",
      title: "linkUrl",
      value: formik.values.linkUrl,
    },
 
  ];
  const renderInputs = inputs.map((input, index) => (
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

    <DialogTitle>Add File</DialogTitle>
    <DialogContent>
          <div className="form-container sign-up">
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">        
        {renderInputs}
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
