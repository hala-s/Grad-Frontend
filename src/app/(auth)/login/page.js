
'use client';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import * as yup from "yup";
import axios from 'axios';
import './style.css';
import {  Link } from '@mui/material';
import { useRouter } from 'next/navigation'
import Register from '../register/Register.jsx'
import Input from '../../../component/input/Input.jsx';
import { UserContext } from '../../../context/user/User.jsx';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Layout from '@/app/(pages)/Layout/Layout';

export default function page() {
  const [open, setOpen] = React.useState(false);
  let [errmsg,setErrmsg] = useState()
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  const {userToken, setUserToken,userData, setUserData}=useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if(userData && userToken){
      if ( userData.role=="admin") {
      router.push('/dashboard');
    }
    else if (userData.role=="subadmin") {
      router.push('/dashboardS');
    }
    else if ( userData.role=="main-subadmin") {
      router.push('/dashboardM');
    }
    else if ( userData.role=="instructor") {
      router.push('/dashboardI');
    }
    else if ( userData.role=="student") {
      router.push('/MyDashboard');
    }
    }
    
  }, [userToken,userData, router]);
    const [isActive, setIsActive] = useState(false);
  
    const handleRegisterClick = () => {
        setIsActive(true);
    };
  
    const handleLoginClick = () => {
        setIsActive(false);
    };
    const [signUpMode, setSignUpMode] = useState(false);

    const handleSignUpClick = () => {
      setSignUpMode(true);
    };
  
    const handleSignInClick = () => {
      setSignUpMode(false);
    };
  
  const initialValues={
    email:'',
    password:'',
  };
  const loginSchema = yup.object({
    email: yup.string().required("email is required").email(),
    password: yup
      .string()
      .required("password is required")
      .min(8, "must be at least 8 character")
      .max(20, "must be at max 20 character"),
  });

  const onSubmit = async (users) => {

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_EDUCODING_API}UserAuth/Login`,
      users,

    );
     if(data.errorMassages != null){
        setErrmsg(data.errorMassages)
        
      }
      else{
      setOpen(true);
      localStorage.setItem("userToken", data.result.token);
      setUserToken(data.result.token);
      setUserData(data.result.user);
      if(data.result.user.role === "admin") {
        router.push('/dashboard');
        }
        if(data.result.user.role == "subadmin") {
          router.push('/dashboardS');
          }
      if(data.result.user.role === "student") {
      router.push('/MyDashboard');
      }
      if(data.result.user.role == "instructor") {
        router.push('/dashboardI');
        }
        if(data.result.user.role == "main-subadmin") {
          router.push('/dashboardM');
          }
      }
    
  };

  const formik=useFormik(
 {   initialValues,
    onSubmit,
    validationSchema : loginSchema,}
  )
  const inputs = [
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
      title: "password",
      value: formik.values.password,
    },
  ];
  const renderInputs = inputs.map((input, index) => (
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      value={input.value}
      title={input.title}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
      errors={formik.errors}
      key={index}
    />
  ));
  return (
    <>
    <Layout>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Log in succssfully!
        </Alert>
      </Snackbar>
    {/* <div className='Body'>
      <div className={isActive ? "logIncontainer active  loginBody" : "logIncontainer loginBody"} id="container">
        <Register/>
  <div className="form-container sign-in">
    <form onSubmit={formik.handleSubmit}>
      <h1 className='pb-3'>Log In</h1>
      
        {renderInputs}
        <Link className='bg-transparent border-0 text-primary text-decoration-underline' href='/AddEmailForgetPass'>Forget Password?</Link>
        
        <div className="text-center mt-3 loginActions">
              <button
                className="m-2 btn "
                type="submit"
                disabled={!formik.isValid ||formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0}
              >
                Login
              </button>
            </div>
            <p className='text-danger'>{errmsg}</p>
    </form>
  </div>
  <div className="toggle-container">
    <div className="toggle">
      <div className="toggle-panel toggle-left">
        <h1>Welcome Back !</h1>
        <p>Enter your personal details to use all of site features</p>
        <button className="hidden" id="login" onClick={handleLoginClick}>Sign In</button>
      </div>
      <div className="toggle-panel toggle-right">
        <h1>Welcome, Friend!</h1>
        <p>Enter your personal details to use all of site features</p>
        <button className="hidden" id="register"  onClick={handleRegisterClick}>Sign Up</button>
      </div>
    </div>
  </div>
</div>

 
    </div> */}
     <div className={`Authcontainer ${signUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={formik.handleSubmit} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            {renderInputs}
            <Link className='bg-transparent border-0 text-primary text-decoration-underline' href='/AddEmailForgetPass'>Forget Password?</Link>
        
        <div className="text-center mt-3 loginActions">
              <button
                className="m-2 btn solid "
                type="submit"
                disabled={!formik.isValid ||formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0}
              >
                Login
              </button>
            </div>
            <p className='text-danger'>{errmsg}</p>           
          </form>
         <Register/>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>EduCoding</h3>
            <p>
            Welcome back to EduCoding! We're thrilled to see you again. Please sign in to continue your journey with us. <br/>Don't have an account?
            </p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
          <h3>EduCoding</h3>
            <p>
            Join EduCoding today! Sign up to explore and enjoy all the amazing features we offer.<br/>do you have an account?
            </p>
            <button className="btn transparent" onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
    </Layout>
    </>
  )
}
