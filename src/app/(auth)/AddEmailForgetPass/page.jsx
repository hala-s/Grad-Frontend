'use client'
import Layout from '@/app/(pages)/Layout/Layout'
import Input from '@/component/input/Input';
import { AddEmailForgetPass } from '@/component/validation/validation';
import { Button } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import '../RegisterCode/RegisterCode.css'
import { useState } from 'react';

export default function page() {

    const router = useRouter();
    const initialValues={
        email: '',
    };

    let [errmsg,setErrmsg] = useState()



const onSubmit = async (users) => {
    try {
      const formData = new FormData();
      formData.append('email', users.email);
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_EDUCODING_API}UserAuth/AddEmailForForgetPassword`, formData,{ headers: {
        'Content-Type': 'application/json',
      }});
      if(data.errorMassages != null){
        setErrmsg(data.errorMassages)
      }
      else{
      formik.resetForm();

    router.push(`/ForgetCode?email=${users.email}`,undefined, { shallow: true })
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      console.log('Error response:', error.response);
    }
  };



const formik = useFormik({
  initialValues : initialValues,
  onSubmit,
  validationSchema:AddEmailForgetPass
})
const inputs =[
 
    {
        type : 'email',
        id:'email',
        name:'email',
        title:'User Email',
        value:formik.values.email,
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
      <div className="pb-5">
        <div className="container">
          <div className="row align-items-center addEmailForget">
            <div className="col-lg-6 ">
              
              <iframe classname="animationForget" src="https://lottie.host/embed/f6b5b6ea-e09e-458e-b071-e4a75fcb4dc4/MtyUSDKS59.json" />

            </div>
            <div className="col-lg-6 ">
              <div className=" pt-3">
                <div className="title pb-4">
                  <h2 className='titleColor'>Insert your email here please</h2>
                </div>
                <div className="addEmailForm">
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
                        Add Email
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
    </Layout>
  );
}
