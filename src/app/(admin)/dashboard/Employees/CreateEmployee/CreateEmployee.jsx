'use client'
import Input from '@/component/input/Input';
import { createEmployee } from '@/component/validation/validation';
import { UserContext } from '@/context/user/User';
import { Button } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export default function CreateEmployee({setOpen}) {
  const router = useRouter();
  let [errmsg,setErrmsg] = useState()
  const {userToken, setUserToken, userData,userId}=useContext(UserContext);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [loading,setLoading] = useState(false);
  const [pageLoading,setPageLoading] = useState(false);

  const initialValues={
    FName: '',
    LName:'',
    email: '',
    password:'',
    phoneNumber:'',
    address:'',
    role:'',
    gender:'',
    
};


const onSubmit = async (users) => {
  setLoading(true);
    try {
      const formData = new FormData();
      formData.append('FName', users.FName);
      formData.append('LName', users.LName);
      formData.append('email', users.email);
      formData.append('password', users.password);
      formData.append('phoneNumber', users.phoneNumber);
      formData.append('address', users.address);
      // formData.append('gender', users.gender);;
      // formData.append('role', users.role);
      formData.append('gender', selectedGender); // Use selectedGender from state
    formData.append('role', selectedRole); 
  
      
  
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_EDUCODING_API}Employee/CreateEmployee`, formData,{ headers: { Authorization: `Bearer ${userToken}` } });
      if(data.errorMassages != null){
        setErrmsg(data.errorMassages)
        
      }
      else{
      
      setPageLoading(true);
      formik.resetForm();
      setOpen(false);
      // router.push('/dashboard');

      Swal.fire({
        title: "Account Created Successfully!",
        text: "Check Dashboard to see it",
        icon: "success"
      });

    } }catch (error) {
      // Handle the error here
      console.error('Error submitting form:', error);
      console.log('Error response:', error.response);
      // Optionally, you can show an error message to the user
    }
    finally {
      setLoading(false); // Set loading back to false regardless of success or failure
    }
  };


  useEffect(() => {
    // Check if page loading state is true, then set it back to false after a certain duration
    if (pageLoading) {
      const timer = setTimeout(() => {
        setPageLoading(false);
      }, 2000); // You can adjust the duration as needed
      return () => clearTimeout(timer);
    }
  }, [pageLoading]);


const formik = useFormik({
  initialValues : initialValues,
  onSubmit,
  validationSchema:createEmployee
})
const inputs =[
  {
    type : 'text',
      id:'FName',
      name:'FName',
      title:'First Name',
      value:formik.values.FName,
},

  {
      type : 'text',
      id:'LName',
      name:'LName',
      title:'Last Name',
      value:formik.values.LName,
  },
 
    {
        type : 'email',
        id:'email',
        name:'email',
        title:'User Email',
        value:formik.values.email,
    },
    
  {
      type : 'password',
      id:'password',
      name:'password',
      title:'User Password',
      value:formik.values.password,
  },
  {
    type : 'text',
    id:'phoneNumber',
    name:'phoneNumber',
    title:'User phoneNumber',
    value:formik.values.phoneNumber,
},
{
  type : 'text',
  id:'address',
  name:'address',
  title:'User address',
  value:formik.values.address,
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
    <>
    {pageLoading ? ( // Show loading indicator while page is loading
        <div>Loading...</div>
      ) : (

    <form onSubmit={formik.handleSubmit} className="row justify-content-center">
      {renderInputs}
       <div className="col-md-10 pb-2">
        <select
          className="form-select p-3 primaryColor"
          aria-label="Default select example"
          value={selectedGender}
         onChange={(e) => {
            formik.handleChange(e);
            setSelectedGender(e.target.value);
          }}
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="col-md-10">
        <select
          className="form-select p-3 primaryColor"
          aria-label="Default select example"
          value={selectedRole}
          
          onChange={(e) => {
            formik.handleChange(e);
            setSelectedRole(e.target.value);
          }}
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="subadmin">SubAdmin</option>
          <option value="main-subadmin">Main-SubAdmin</option>
          <option value="instructor">Instructor</option>
        </select>
      </div> 
     
      <div className='text-center mt-3'>
      <Button sx={{px:2}} variant="contained"
              className="m-2 btn primaryBg"
              type="submit"
              disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0||!selectedGender || 
                !selectedRole }
            >
              Add
            </Button>
            <p className='text-danger'>{errmsg}</p>
      </div>
    </form>)}
    </>
  );
}
