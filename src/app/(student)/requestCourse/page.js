'use client';
import React, { useState } from 'react';
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Layout from '../studentLayout/Layout.jsx'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Input from '../../../component/input/Input.jsx';
import TextArea from '../../../component/input/TextArea.jsx';
import { UserContext } from '../../../context/user/User.jsx';
import Button from '@mui/material/Button';
import './style.css'
export default function page() {
  let { userToken, setUserToken ,userData,setUserData,userId} = React.useContext(UserContext);

  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const initialValues = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  };
  const onSubmit = async (courses) => {
const formData = new FormData();
formData.append("name", courses.name);
formData.append("description", courses.description);
formData.append("startDate", courses.startDate);
formData.append("endDate", courses.endDate);


const { data } = await axios.post(
  `${process.env.NEXT_PUBLIC_EDUCODING_API}Request/RequestToCreateCustomCourse?studentid=${userId}`,
 formData,
 {headers: {
  'Content-Type': 'application/json', 'Content-Type': 'charset=utf-8',
  'Authorization':`Bearer ${userToken}`
}}
);
  console.log("test");
setOpen(true);

  
  };
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("course name is required"),
      
      description: yup
      .string()
      .required("description is required"),
    
      startDate: yup
      .string()
      .required("Start Date is required"),
      endDate: yup
      .string()
      .required("End Date is required")

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
      title: "Course Name",
      value: formik.values.name,
    },
    {
      id: "startDate",
      type: "date",
      name: "startDate",
      title: "Start Date",
      value: formik.values.startDate,
    },
    {
      id: "endDate",
      type: "date",
      name: "endDate",
      title: "End Date",
      value: formik.values.endDate,
        },
        {
          id: "description",
          type: "text",
          name: "description",
          title: "Description",
          value: formik.values.description,
        }
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
    <Layout title='Request Course'>
             <>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          You have successfully requested the course!
        </Alert>
      </Snackbar>
      <Stack  direction="column"
  justifyContent="center"
  alignItems="center"
  spacing={2}
  mt='50px'
  pt='30px'

 >
                <div className="form-container RequestCourse ms-5 ">
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">        
        {renderInputs}
        {textAraeInput}
        <div className="text-center mt-3 w-75">
        <Button sx={{px:2}} variant="contained"
              className="m-2  "
              type="submit"
              disabled={!formik.isValid}
            >
              Submit
            </Button>
        </div>
      </form>
    </div>
    </Stack> 
    </>
    </Layout>
   
  )
}




