'use client'
import Input from '@/component/input/Input';
import { updateEmployee } from '@/component/validation/validation';
import { UserContext } from '@/context/user/User';
import { Button } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export default function UpdateEmployee({id , fName , lName , email, gender, phoneNumber , address,setOpenUpdate}) {

    const [employeeData, setEmployeeData] = useState(null);
    const [selectedGender, setSelectedGender] = useState(gender);
    const {userToken, setUserToken, userData,userId}=useContext(UserContext);
    let [errmsg,setErrmsg] = useState()
    const onSubmit = async (updatedData) => {
      if(userData){
      try {
        const formData = new FormData();
        formData.append('fName', updatedData.fName);
        formData.append('lName', updatedData.lName);
        formData.append('email', updatedData.email);
        formData.append('phoneNumber', updatedData.phoneNumber);
        formData.append('address', updatedData.address);

        formData.append('gender', selectedGender); // Use selectedGender from state

        const {data} = await axios.put(`${process.env.NEXT_PUBLIC_EDUCODING_API}Employee/UpdateEmployeeFromAdmin?id=${id}`, formData, { headers: { Authorization: `Bearer ${userToken}` } });
        if(data.errorMassages != null){
          setErrmsg(data.errorMassages)
          
         
        }
        else{
            formik.resetForm();
            setOpenUpdate(false);
            Swal.fire({
                title: "Account updated successfully",
                text: "You can see the modified account in dashboard",
                icon: "success"
              });
            

      } }catch (error) {
        console.error('Error updating employee:', error);
      }}
    };
  
    const formik = useFormik({
      initialValues: {
        fName: `${fName}`,
        lName: `${lName}`,
        email: `${email}`,
        phoneNumber: `${phoneNumber}`,
        gender: `${gender}`,
        address: `${address}`,
      },
      validationSchema:updateEmployee,
      onSubmit,
    });
  
    useEffect(() => {
      if (employeeData) {
        formik.setValues(employeeData);
      }
      setSelectedGender(gender);
    }, [employeeData,gender]);

  
    const inputs =[
        {
          type : 'text',
            id:'fName',
            name:'fName',
            title:'First Name',
            value:formik.values.fName,
      },
      
        {
            type : 'text',
            id:'lName',
            name:'lName',
            title:'Last Name',
            value:formik.values.lName,
        },
       
          {
              type : 'email',
              id:'email',
              name:'email',
              title:'User Email',
              value:formik.values.email,
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
          value={input.value || ''}
          key={index} 
          errors={formik.errors} 
          onChange={formik.handleChange}
           onBlur={formik.handleBlur}
            touched={formik.touched}
            />
        
    )

  return (
    <form onSubmit={formik.handleSubmit} className="row justify-content-center">
      {renderInputs}
       <div className="col-md-6">
        <select
          className="form-select p-3"
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
      
    <div className='text-center mt-3'>
      <Button sx={{px:2}} variant="contained"
              className="m-2 btn primaryBg"
              type="submit"
              disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0||!selectedGender  }
            >
              Update
            </Button>
            <p className='text-danger'>{errmsg}</p>
      </div>
    </form>
  )
}
