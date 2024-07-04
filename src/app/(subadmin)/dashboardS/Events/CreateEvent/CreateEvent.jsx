import Input from '@/component/input/Input';
import TextArea from '@/component/input/TextArea';
import { createEvent } from '@/component/validation/validation';
import { UserContext } from '@/context/user/User';
import { Button } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'


export default function CreateEvent({setOpen}) {
  const {userToken, setUserToken, userData,userId}=useContext(UserContext);

  const initialValues={
    name: '',
    content:'',
    category: '',
    SubAdminId:userId,
    dateOfEvent:'',
    image:'',
};
let [errmsg,setErrmsg] = useState()

const handleFieldChange = (event) => {
  formik.setFieldValue('image', event.target.files[0]); // Set the file directly to image
};

const onSubmit = async (values) => {
  if(userData){
  try {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('content', values.content);
    formData.append('category', values.category);
    formData.append('SubAdminId', values.SubAdminId);
    formData.append('dateOfEvent', values.dateOfEvent);
    if (values.image) {
      formData.append('image', values.image);
    }

    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_EDUCODING_API}EventContraller/CreateEvent`, formData,{headers :{Authorization:`Bearer ${userToken}`}});
    if(data.errorMassages != null){
      setErrmsg(data.errorMassages)
      
    }
    else{
    formik.resetForm();
    setOpen(false);
    Swal.fire({
      title: "Event Created Successfully",
      text: "Wait for Admin accredit this Event",
      icon: "success"
    });

  } }catch (error) {
    // Handle the error here
    console.error('Error submitting form:', error);
    console.log('Error response:', error.response);
    // Optionally, you can show an error message to the user
  }}
};

const formik = useFormik({
  initialValues : initialValues,
  onSubmit,
  validationSchema:createEvent
})


const inputs =[
  {
    type : 'text',
      id:'name',
      name:'name',
      title:'Event Name',
      value:formik.values.name,
},

  
 
    {
        type : 'category',
        id:'category',
        name:'category',
        title:'Event category',
        value:formik.values.category,
    },
    
  {
      type : 'number',
      id:'SubAdminId',
      name:'SubAdminId',
      title:`SubAdmin Id`,
      value:formik.values.SubAdminId,
      disabled: true,
  },
  {
    type : 'date',
    id:'dateOfEvent',
    name:'dateOfEvent',
    title:'Event Date',
    value:formik.values.dateOfEvent,
},
  {
    type:'file',
    id:'image',
    name:'image',
    title:'image',
    onChange:handleFieldChange,
},{
      type : 'text',
      id:'content',
      name:'content',
      title:'Content',
      value:formik.values.content,
  },
];


const renderInputs = inputs.slice(0, -1).map((input,index)=>
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
        
    )
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
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className="row justify-content-center">
      {renderInputs}
      {textAraeInput}
      {/* <button
        type="submit"
        className="btn btn-primary createButton mt-3 fs-3 px-3 w-50"
        disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0}
      >
        CREATE Event
      </button> */}
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
