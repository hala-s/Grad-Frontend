'use client';
import React, { useContext, useState, useEffect } from 'react';
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Input from '../../../../component/input/Input.jsx';
import './style.css'
import { UserContext } from '../../../../context/user/User.jsx';
import { useRouter } from 'next/navigation'
import TextArea from '../../../../component/input/TextArea.jsx';

export default function EditAnnouncement({materialID, name, description, type ,Id }) {
  const {userData, userToken}=useContext(UserContext);
const router = useRouter();

  const [Alertopen, setAlertOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  let initialValues = {
   name:` ${name}`,
    description: ` ${description}`,

  };

  const onSubmit = async (tasks) => {
    try {
const formData = new FormData();
formData.append("name", tasks.name);
formData.append("description", tasks.description);
formData.append(type, Id);
formData.append("instructorId", userData.userId);

const { data } = await axios.put(
 `${process.env.NEXT_PUBLIC_EDUCODING_API}MaterialControllar/EditAnnouncement?id=${materialID}`,
  formData,
  {headers: {
 'Authorization':`Bearer ${userToken}`,

    'Content-Type': 'multipart/form-data','Content-Type': 'application/json',
  }}


);
 formik.resetForm();
 setAlertOpen(true);
 router.back();

  }
  catch (error) {
    if (error.isAxiosError) {
      const requestConfig = error.config;
  
      console.log("Request Configuration:", requestConfig);
    } else {
      console.error("Non-Axios error occurred:", error);
    }
  }};
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("title is required"),
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
      title: "Title",
      value:formik.values.name,
    },
    {
      id: "description",
      type: "text",
      name: "description",
      title: "Description",
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
     <Snackbar open={Alertopen} autoHideDuration={10000} onClose={handleClose} >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%'}}
        >
          Announcement Edited successfully!
        </Alert>
      </Snackbar>
          <div className="form-container EditTask edit">
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">        
        {renderInputs}{textAraeInput}
        <div className="text-center mt-3">
        <Button sx={{px:2}} variant="contained"
              className="m-2  "
              type="submit"
              disabled={!formik.isValid}
            >
              Save
            </Button>
        </div>
      </form>
    </div>

  </>
  )
}
