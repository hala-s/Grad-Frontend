'use client';
import React, { useContext, useState } from 'react';
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
import Input from '../../../../component/input/Input.jsx';
import TextArea from '../../../../component/input/TextArea.jsx';
import { useRouter } from 'next/navigation'

import { UserContext } from '../../../../context/user/User.jsx';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import './style.css'
export default function AddTaskSubmission({materialID}) {
  const router = useRouter();

  const {userToken, setUserToken, userData}=useContext(UserContext);
  const [Alertopen, setAlertOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };
  const handelFieldChang = (event) => {
    formik.setFieldValue("pdf", event.target.files[0]);
  };
 
  const initialValues = {
    description: "",
    pdf: "",
  };
  const onSubmit = async (tasks) => {
try{const formData = new FormData();
formData.append("description", tasks.description);
formData.append("pdf", tasks.pdf);

const { data } = await axios.post(
  `${process.env.NEXT_PUBLIC_EDUCODING_API}Submissions/AddTaskSubmission?Studentid=${userData.userId}&Id=${materialID}`,
  formData,
  {headers :{Authorization:`Bearer ${userToken}`}}


);
 formik.resetForm();
 setAlertOpen(true);
 router.back();

}catch(error){
  console.log(error);
}
  };
  const validationSchema = yup.object({
      description: yup.string(),

  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: validationSchema,
  });
  const inputs = [
 

 
    {
      id: "pdf",
      type: "file",
      name: "pdf",
      title: "Upload File",
      onChange: handelFieldChang,
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
          you have submitted this task successfully!
        </Alert>
      </Snackbar>
   

      <Stack  direction="column"
  justifyContent="center"
  alignItems="center"
  spacing={2}
  mt='5px'>
                <div className="form-container AddSubmition">
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">        
        {renderInputs}
        {textAraeInput}
        <div className="text-center mt-3">
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
  )
}
