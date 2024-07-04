
'use client';
import React, { useState, useEffect } from 'react';
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import './style.css'
import Link from '@mui/material/Link';
import Input from '../../../component/input/Input.jsx';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = React.useState();
  const [result, setResult] = React.useState();
  let [errmsg,setErrmsg] = useState()

  const router = useRouter()
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role:""
  };
  const onSubmit = async (users) => {
    try{
const formData = new FormData();
formData.append("userName", users.userName);
formData.append("email", users.email);
formData.append("password", users.password);
formData.append("confirmPassword", users.confirmPassword);
formData.append("role", 'student');

const { data } = await axios.post(
  `${process.env.NEXT_PUBLIC_EDUCODING_API}UserAuth/Register`,
 formData,
 {headers: {
  'Content-Type': 'multipart/form-data','Content-Type': 'application/json',}}
);
if(data.errorMassages != null){
  setErrmsg(data.errorMassages)
  
}
else{
setResult(data.result);
//   formik.resetForm();
setOpen(true);
router.push(`/RegisterCode?email=${users.email}`);
 }}catch(error){
console.log(error.response.data.errors);
// setErrors(error.response.data.errors);
setErrors(error.response.data.errors.errorMassages);
 
  }
  }

  const validationSchema = yup.object({
    userName: yup
      .string()
      .required("user name is required")
      .min(3, "must be at least 3 character")
      .max(15, "must be at max 15 character"),
    email: yup.string().required("email is required").email(),
    password: yup
      .string()
      .required("password is required")
      .min(8, "must be at least 8 character"),
      confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref('password'), null], 'Passwords must match')
   
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: validationSchema,
  });
  const inputs = [
    {
      id: "username",
      type: "text",
      name: "userName",
      title: "User Name",
      value: formik.values.userName,
    },
    {
      id: "email",
      type: "email",
      name: "email",
      title: "Email",
      value: formik.values.email,
    },
    {
      id: "password",
      type: "password",
      name: "password",
      title: "Password",
      value: formik.values.password,
    },
    {
      id: "confirmPassword",
      type: "password",
      name: "confirmPassword",
      title: "confirm Password",
      value: formik.values.confirmPassword,
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
  useEffect(() => {
  }, [errors]); 
  return (
    <>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          // onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          You have registered successfully!
        </Alert>
      </Snackbar>
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            {renderInputs}

            <div className="text-center mt-3">
        <button
              className="m-2 btn "
              type="submit"
              disabled={!formik.isValid}
            >
              Register
            </button>
        </div>
        {errors&&<p className='text-danger'>{errors}</p>}
        <p className='text-danger'>{errmsg}</p>
          
          </form>

    </>
  );
}
