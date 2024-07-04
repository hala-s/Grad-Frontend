

'use client'
import Input from '@/component/input/Input';
import InputTime from '@/component/input/InputTime';
import { addWeeklyHours } from '@/component/validation/validation';
import { Button } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState, useContext } from 'react'
import Swal from 'sweetalert2';
import { UserContext } from '@/context/user/User';

export default function WeeklyHours({id}) {
  const {userToken, setUserToken, userData , userId}=useContext(UserContext);

 const[hours,setHours] = useState([{}])
 const [selectedDay, setSelectedDay] = useState('');

  const initialValues={
   day:'',
   startTime:'',
   endTime:'',
};


const onSubmit = async (hours) => {
    try {
      const formData = new FormData();
      formData.append('startTime', hours.startTime);
      formData.append('endTime', hours.endTime);
      formData.append('day', selectedDay); // Use selectedGender from state
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_EDUCODING_API}Instructor/AddInstructorOfficeHours?InstructorId=${userId}`, formData,
      {headers :{Authorization:`Bearer ${userToken}`}}

      );
      
      formik.resetForm();
      Swal.fire({
        title: "Hours Added Successfully",
        text: "See it above",
        icon: "success"
      });
  

    } catch (error) {
      // Handle the error here
      console.error('Error submitting form:', error);
      console.log('Error response:', error.response);
      // Optionally, you can show an error message to the user
    }
  };





const formik = useFormik({
  initialValues : initialValues,
  onSubmit,
  validationSchema:addWeeklyHours
})

const inputs =[
  {
    type : 'time',
      id:'startTime',
      name:'startTime',
      title:'startTime',
      value:formik.values.startTime,
},

  {
      type : 'time',
      id:'endTime',
      name:'endTime',
      title:'endTime',
      value:formik.values.endTime,
  },
 
]



const renderInputs = inputs.map((input,index)=>
  <InputTime type={input.type} 
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
    <div className='p-5'>
<h2 className='pr '>Add Weekly Hours</h2>
    <form onSubmit={formik.handleSubmit} className="row justify-content-center">
        <div className="col-md-6 w-25">
        <select
          className="form-select p-3"
          aria-label="Default select example"
          value={selectedDay}
         onChange={(e) => {
            formik.handleChange(e);
            setSelectedDay(e.target.value);
          }}
        >
          <option value="" disabled>
Select Day          </option>
          <option value="0">Sun</option>
          <option value="1">Mon</option>
          <option value="2">Tue</option>
          <option value="3">Wed</option>
          <option value="4">Thu</option>
          <option value="5">Fri</option>
          <option value="6">Sat</option>
        </select>
      </div>


      {renderInputs}
       


      <div className='text-center mt-3'>
      <Button sx={{px:2}} variant="contained"
              className="m-2 btn primaryBg"
              type="submit"
              disabled={!selectedDay ||Object.keys(formik.touched).length === 0||formik.isSubmitting || Object.keys(formik.errors).length > 0}
            >
              Add
            </Button>
      </div>


    </form>
    </div>
  );
}
