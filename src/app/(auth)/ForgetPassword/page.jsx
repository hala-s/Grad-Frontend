'use client'
import Layout from '@/app/(pages)/Layout/Layout'
import Input from '@/component/input/Input';
import { resetPass } from '@/component/validation/validation';
import { Button } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import '../RegisterCode/RegisterCode.css'

export default function page() {
  let [errmsg,setErrmsg] = useState()
    const router = useRouter();
    const [email, setEmail] = useState(null);
    const initialValues={
        password: '',
        confirmPassword: '',
    };
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const email = params.get('email');
        setEmail(email);
      }, []);


const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('password', values.password);
      formData.append('confirmPassword', values.confirmPassword);
      const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_EDUCODING_API}UserAuth/ForgetPassword?email=${email}`, formData,{ headers: {
        'Content-Type': 'application/json',
      }});
      if(data.errorMassages != null){
        setErrmsg(data.errorMassages)
      }
      else{
      formik.resetForm();

    router.push(`/login`,undefined, { shallow: true })

    }} catch (error) {
      console.error('Error submitting form:', error);
      console.log('Error response:', error.response);
    }
  };



const formik = useFormik({
  initialValues : initialValues,
  onSubmit,
  validationSchema:resetPass
})
const inputs =[
 
    {
        type : 'password',
        id:'password',
        name:'password',
        title:'New password',
        value:formik.values.password,
    },
    {
        type : 'password',
        id:'confirmPassword',
        name:'confirmPassword',
        title:'Confirm New password',
        value:formik.values.confirmPassword,
    },
]



const renderInputs = inputs.map((input,index)=>
  <Input type={input.type} 
        id={input.id}
         name={input.name}
          title={input.title} 
          key={index} 
          errors={formik.errors} 
          onChange={formik.handleChange}
           onBlur={formik.handleBlur}
            touched={formik.touched}
            />
        
    )

  return (
    <Layout>
        <div className="forgetPass">
            <div className="container">
                <div className="forgetPassSection">
                    <div className="titleColor text-center">
                        <h2 className='tit'>Password Reset</h2>
                    </div>
                    <div className="forgetPassForm">
                    <form
                    onSubmit={formik.handleSubmit}
                    className="row justify-content-center align-items-center flex-column w-100"
                  >
                        {renderInputs}
                    
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
                        Reset
                      </Button>
                      <p className='text-danger'>{errmsg}</p>
                      </div>
                      </form>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
    )
}
