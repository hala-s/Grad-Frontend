
'use client'
import Input from '@/component/input/Input';
import TextArea from '@/component/input/TextArea';
import { createCourse } from '@/component/validation/validation';
import { UserContext } from '@/context/user/User';
import { Button } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export default function CreateCourse({setOpen}) {
  const {userToken, setUserToken, userData,userId}=useContext(UserContext);
  let [instructors,setInstructors] = useState([]);
  const [selectedIns, setSelectedIns] = useState('');
  const fetchIns = async ()=>{
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Instructor/GetAllInstructorsList`,{headers :{Authorization:`Bearer ${userToken}`}});
     setInstructors(data.result);
  }

  useEffect(() => {
    fetchIns();
  }, [instructors,userData]);
  let [errmsg,setErrmsg] = useState()

  const initialValues={
    name: '',
    description:'', 
    price:0,
    category: '',
    subAdminId:userId,
    instructorId:'',
    startDate:'',
    Deadline:'',
    limitNumberOfStudnet:'',
    totalHours:'',
    image:'',
    
};

const handleFieldChange = (event) => {
  formik.setFieldValue('image', event.target.files[0]); // Set the file directly to image
};

const onSubmit = async (values) => {
  if(userData){

  try {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('category', values.category);
    formData.append('subAdminId', values.subAdminId);
    formData.append('startDate', values.startDate);
    formData.append('Deadline', values.Deadline);
    formData.append('limitNumberOfStudnet', values.limitNumberOfStudnet);
    formData.append('totalHours', values.totalHours);
    formData.append('instructorId', selectedIns);
    //formData.append('image', values.image,values.image.name);
    if (values.image) {
      formData.append('image', values.image);
    }
   
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/CreateCourse`,formData,{headers :{Authorization:`Bearer ${userToken}`}});
    if(data.errorMassages != null){
      setErrmsg(data.errorMassages)
      
    }
    else{
    formik.resetForm();
    setOpen(false);
    Swal.fire({
      title: "Course Created Successfully",
      text: "Wait for Admin accredit this Course",
      icon: "success"
    });

  } }catch (error) {
    if (error.isAxiosError) {
      const requestConfig = error.config;
      console.log("Request Configuration:", requestConfig);
    } else {
      console.error("Non-Axios error occurred:", error);
    }
  };
}
};

const formik = useFormik({
  initialValues : initialValues,
  onSubmit,
  validationSchema:createCourse
});


const inputs =[
  {
    type : 'text',
      id:'name',
      name:'name',
      title:'Course name',
      value:formik.values.name,
},

  {
      type : 'number',
      id:'price',
      name:'price',
      title:'Course price',
      value:formik.values.price,
  },
 
    {
        type : 'text',
        id:'category',
        name:'category',
        title:'Course category',
        value:formik.values.category,
    },
    {
      type : 'number',
      id:'limitNumberOfStudnet',
      name:'limitNumberOfStudnet',
      title:'limit number of studnets',
      value:formik.values.limitNumberOfStudnet,
  },

{
  type : 'date',
  id:'startDate',
  name:'startDate',
  title:'Course start date',
  value:formik.values.startDate,
},
{
  type : 'date',
  id:'Deadline',
  name:'Deadline',
  title:'Course Deadline',
  value:formik.values.Deadline,
},
{
  type : 'number',
  id:'totalHours',
  name:'totalHours',
  title:'# of hours',
  value:formik.values.totalHours,
},

    {
        type:'file',
        id:'image',
        name:'image',
        title:'image',
        onChange:handleFieldChange,
    },
      
  {
    type : 'text',
    id:'subAdminId',
    name:'subAdminId',
    title:`SubAdmin Id`,
    value:formik.values.subAdminId,
    disabled: true,
},

    {
      type : 'text',
      id:'description',
      name:'description',
      title:'Description',
      value:formik.values.description,
    },
];

const renderInputs =  inputs.slice(0, -1).map((input,index)=>
  <Input type={input.type} 
        id={input.id}
         name={input.name}
          title={input.title} 
          key={index} 
          errors={formik.errors} 
          onChange={input.onChange||formik.handleChange}
           onBlur={formik.handleBlur}
            touched={formik.touched}
            disabled={input.disabled}
            />  
    );
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
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data" >
      <div className="row justify-content-center align-items-center">
          {renderInputs}
          <div className="col-md-10">
        <select
          className="form-select p-3 primaryColor"
          aria-label="Default select example"
          value={selectedIns}
          
          onChange={(e) => {
            formik.handleChange(e);
            setSelectedIns(e.target.value);
          }}
        >
          <option value="" disabled>
            Select Instructor
          </option>
          {instructors.map((instructor) => (
            <option key={instructor.id} value={instructor.id}>{instructor.name}</option>
          ))}
        </select>
      </div> 
        {textAraeInput}
      
        
        
      </div>
      

              
              
      

      <div className='text-center mt-3'>
      <Button sx={{px:2}} variant="contained"
              className="m-2 btn primaryBg"
              type="submit"
              disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0 }
            >
              Add
            </Button>
            <p className='text-danger'>{errmsg}</p>
      </div>
      
    </form>
  )
}
