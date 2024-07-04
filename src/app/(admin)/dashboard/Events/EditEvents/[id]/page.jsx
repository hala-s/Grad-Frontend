'use client'
import Input from '@/component/input/Input';
import TextArea from '@/component/input/TextArea';
import { editEvent } from '@/component/validation/validation';
import { UserContext } from '@/context/user/User';
import { Button } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';


const formatDate = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };
export default function EditEvent({id   , name   , category    ,dateOfEvent   , content   , image,   setOpenUpdate}) {

  let [errmsg,setErrmsg] = useState()
  const { userData, userToken } = useContext(UserContext);

  const handleFieldChange = (event) => {
    formik.setFieldValue('image', event.target.files[0]);
  };

  const onSubmit = async (updatedData) => {
    if (userData) {
      try {
        const formData = new FormData();
        formData.append('name', updatedData.name);
        formData.append('dateOfEvent', updatedData.dateOfEvent);
        formData.append('category', updatedData.category);
        formData.append('content', updatedData.content);
        if (updatedData.image) {
          formData.append('image', updatedData.image);
        }

        const { data } = await axios.put(`${process.env.NEXT_PUBLIC_EDUCODING_API}EventContraller/EditEvent?id=${id}`, formData, { headers: { Authorization: `Bearer ${userToken}` } });
        if(data.errorMassages != null){
          setErrmsg(data.errorMassages)
          }
        else{
          formik.resetForm();
          setOpenUpdate(false);
          Swal.fire({
            title: "Event updated successfully",
            text: "You can see the data updated in Events page",
            icon: "success"
          });
      } }catch (error) {
        console.error('Error updating Course:', error);
      }
    }

  };

  const formik = useFormik({
    initialValues: {
      name: name || '',
      dateOfEvent: formatDate(dateOfEvent) || '',
      category: category || '',
      content: content || '',
      image: image || null,
    },
    onSubmit,
    validationSchema:editEvent,
  });

  useEffect(() => {
    formik.setValues({
      name,
      dateOfEvent: formatDate(dateOfEvent),
      category,
      content,
      image,
    });
  }, [name, dateOfEvent, category, content, image]);

  const inputs = [
    {
      type: 'text',
      id: 'name',
      name: 'name',
      title: 'name',
      value: formik.values.name,
    },
   
    {
      type: 'date',
      id: 'dateOfEvent',
      name: 'dateOfEvent',
      title: ' dateOfEvent',
      value: formik.values.dateOfEvent,
    },
    {
      type: 'text',
      id: 'category',
      name: 'category',
      title: 'Category',
      value: formik.values.category,
    },
    
    {
      type: 'file',
      id: 'image',
      name: 'image',
      title: 'Image',
      onChange: handleFieldChange,
    },
    {
        type: 'number',
        id: 'content',
        name: 'content',
        title: 'Content',
        value: formik.values.content,
      },
   
  ];

  const renderInputs = inputs.slice(0, -1).map((input, index) => (
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      title={input.title}
      value={input.value}
      key={index}
      errors={formik.errors}
      onChange={input.onChange || formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
    />
  ));
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
      <div className="row justify-content-center">
          {renderInputs}
        {textAraeInput}
        
      </div>
      
      <div className='text-center mt-3'>
      <Button sx={{px:2}} variant="contained"
              className="m-2 btn primaryBg"
              type="submit"
              disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0 }
            >
              Update
            </Button>
            <p className='text-danger'>{errmsg}</p>
      </div>
      
    </form>  )
}
