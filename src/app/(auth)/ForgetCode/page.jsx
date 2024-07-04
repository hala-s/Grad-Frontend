'use client'
import Layout from '@/app/(pages)/Layout/Layout';
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import '../RegisterCode/RegisterCode.css'
import Input from '@/component/input/Input';
import axios from 'axios';
import { useFormik } from 'formik';
import { addCode } from '@/component/validation/validation';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { UserContext } from '@/context/user/User';

export default function page() {
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const {userToken, setUserToken,userData, setUserData}=useContext(UserContext);
  let [errmsg,setErrmsg] = useState()


  
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
      router.push('/myDashboard');
    }
    else if ( userData.role=="student") {
      router.push('/MyDashboard');
    }
    }
    
  }, [userToken,userData, router]);

  const initialValues={
    code: '',
};

const resendCode = async()=>{
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}UserAuth/reSendCode?email=${email}`);
  
}

const onSubmit = async (values) => {
      try {
        const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_EDUCODING_API}UserAuth/addCode?email=${email}&code=${values.code}`,
            );
            if(data.errorMassages != null){
              setErrmsg(data.errorMassages)
            }
            else{
        formik.resetForm();
        router.push(`/ForgetPassword?email=${email}`)
      }} catch (error) {
        console.error('Error submitting form:', error);
        console.log('Error response:', error.response);
      }
    };

    const formik = useFormik({
        initialValues : initialValues,
        onSubmit,
         validationSchema:addCode
      })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    setEmail(email);
  }, []);
  return (
    <Layout>
      {/* <div>
    {email ? (
      <p>A verification code has been sent to your email: {email}</p>
    ) : (
      <p>Loading...</p>
    )}
  </div> */}

      <div className="registerCode pb-5">
        <div className="container">
          <div className="addCodeWrapper">
            <div className="row align-items-center">
              <div className="col-lg-6">
                {/* <div className="addCodeImage">
                  <img
                    src="/layer.png"
                    alt="courseAcademy"
                    className="img-fluid"
                  />
                </div> */}
                <iframe className='animationForget' src="https://lottie.host/embed/629592a9-1330-4a01-930a-c026358c5ec7/ZsOD8XZiio.json" />

              </div>
              <div className="col-lg-6">
                <div className="addCodeForm">
                  <div className="title text-center">
                    <h2 className="titleColor">Insert code from your Email</h2>
                  </div>
                  <div className="formRegCode">
                    <form
                      onSubmit={formik.handleSubmit}
                      className="row justify-content-center align-items-center flex-column"
                    >
                      <div className="form-floating  col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="code"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.skillName}
                        />

                        <label htmlFor="floatingInput">Code</label>
                        {formik.touched.code && formik.errors.code ? (
                          <p className="text text-danger">
                            {" "}
                            {formik.errors.code}
                          </p>
                        ) : null}
                      </div>
                      <div className="resendCode row justify-content-center">
                          <p className='text-center'>Dont receive any code?</p>
                          <button onClick={resendCode} className='border-0 bg-transparent'>re-send code</button>
                      </div>
                      
                      <div className="text-center mt-3">
                        <Button
                          sx={{ px: 2 }}
                          variant="contained"
                          className="m-2 btn primaryBg"
                          type="submit"
                          disabled={
                            formik.isSubmitting ||
                            Object.keys(formik.errors).length > 0 ||
                            Object.keys(formik.touched).length === 0
                          }
                        >
                          click!
                        </Button>
                        <p className='text-danger'>{errmsg}</p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
