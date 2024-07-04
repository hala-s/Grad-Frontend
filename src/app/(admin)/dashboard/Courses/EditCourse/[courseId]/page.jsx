'use client'
import Input from '@/component/input/Input';
import TextArea from '@/component/input/TextArea';
import { editCourse } from '@/component/validation/validation';
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
export default function EditCourse({courseId , startDate , Deadline , InstructorId , limitNumberOfStudnet , description , image , setOpenUpdate}) {

  const { userData, userToken } = useContext(UserContext);
  let [instructors,setInstructors] = useState([]);
  let [errmsg,setErrmsg] = useState()

  const [selectedIns, setSelectedIns] = useState(InstructorId || '');
  const fetchIns = async ()=>{
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Instructor/GetAllInstructorsList`,{headers :{Authorization:`Bearer ${userToken}`}});
     setInstructors(data.result);
  }

  useEffect(() => {
    fetchIns();
  }, [instructors,userData]);

  const handleFieldChange = (event) => {
    formik.setFieldValue('image', event.target.files[0]);
  };

  const onSubmit = async (updatedData) => {
    if (userData) {
      try {
        const formData = new FormData();
        // formData.append('InstructorId', updatedData.InstructorId);
        formData.append('startDate', updatedData.startDate);
        formData.append('Deadline', updatedData.Deadline);
        formData.append('limitNumberOfStudnet', updatedData.limitNumberOfStudnet);
        formData.append('description', updatedData.description);
        formData.append('InstructorId', selectedIns);
        if (updatedData.image) {
          formData.append('image', updatedData.image);
        }

        const { data } = await axios.put(`${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/EditOnCourseAfterAccredit?courseId=${courseId}`, formData, { headers: { Authorization: `Bearer ${userToken}` } });
        if(data.errorMassages != null){
          setErrmsg(data.errorMassages)
          
        }
        else{
        formik.resetForm();
          setOpenUpdate(false);
          Swal.fire({
            title: "Course updated successfully",
            text: "You can see the data updated in courses page",
            icon: "success"
          });}
      } catch (error) {
        console.error('Error updating Course:', error);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      InstructorId: InstructorId || '',
      startDate: formatDate(startDate) || '',
      Deadline: formatDate(Deadline) || '',
      limitNumberOfStudnet: limitNumberOfStudnet || '',
      description: description || '',
      image: image || null,
    },
    onSubmit,
    validationSchema:editCourse,
  });

  useEffect(() => {
    formik.setValues({
      InstructorId,
      startDate: formatDate(startDate),
      Deadline: formatDate(Deadline),
      limitNumberOfStudnet,
      description,
      image,
    });
    setSelectedIns(InstructorId);
  }, [InstructorId, startDate, Deadline, limitNumberOfStudnet, description, image]);

  const inputs = [
    // {
    //   type: 'number',
    //   id: 'InstructorId',
    //   name: 'InstructorId',
    //   title: 'InstructorId',
    //   value: formik.values.InstructorId,
    // },
    {
      type: 'number',
      id: 'limitNumberOfStudnet',
      name: 'limitNumberOfStudnet',
      title: 'Limit Number Of Student',
      value: formik.values.limitNumberOfStudnet,
    },
    {
      type: 'date',
      id: 'startDate',
      name: 'startDate',
      title: 'Start Date',
      value: formik.values.startDate,
    },
    {
      type: 'date',
      id: 'Deadline',
      name: 'Deadline',
      title: 'Dead line',
      value: formik.values.Deadline,
    },
    
    {
      type: 'file',
      id: 'image',
      name: 'image',
      title: 'Image',
      onChange: handleFieldChange,
    },
    {
      type: 'text',
      id: 'description',
      name: 'description',
      title: 'Description',
      value: formik.values.description,
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
        <div className="col-md-10 pb-4">
            <select
          className="form-select p-3"
          aria-label="Default select example"
          value={selectedIns}
          onChange={(e) => {
            formik.setFieldValue('InstructorId', e.target.value);
            setSelectedIns(e.target.value);
          }}
          name="InstructorId"
        >
          <option value="" disabled>
            Select Instructor
          </option>
          {instructors.map((instructor) => (
            <option key={instructor.id} value={instructor.id}>{instructor.name}</option>
          ))}
        </select>
          </div>
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
      
    </form>
  )
}
