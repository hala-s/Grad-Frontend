'use client'
import Input from '@/component/input/Input';
import { editProfile } from '@/component/validation/validation';
import { UserContext } from '@/context/user/User';
import { Button } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
};

export default function EditProfile({ id, FName, LName, gender, phoneNumber, DateOfBirth, address, image ,openUpdate,setOpenUpdate}) {
  const { userData,userToken } = useContext(UserContext);
  let [errmsg,setErrmsg] = useState()
  const [selectedGender, setSelectedGender] = useState(gender);

  const handleFieldChange = (event) => {
    formik.setFieldValue('image', event.target.files[0]); // Set the file directly to image
  };

  const onSubmit = async (updatedData) => {
    if(userData){
          try {
      const formData = new FormData();
      formData.append('FName', updatedData.FName);
      formData.append('LName', updatedData.LName);
      formData.append('phoneNumber', updatedData.phoneNumber);
      formData.append('address', updatedData.address);
      formData.append('DateOfBirth', updatedData.DateOfBirth);
      formData.append('gender', selectedGender);
      if (updatedData.image) {
        formData.append('image', updatedData.image);
      }

      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_EDUCODING_API}UserAuth/EditProfile?id=${id}`, formData,{headers :{Authorization:`Bearer ${userToken}`}},);
      if(data.errorMassages != null){
        setErrmsg(data.errorMassages)
        
      }
      else{
        formik.resetForm();
        setOpenUpdate(false);
        Swal.fire({
          title: "Profile updated successfully",
          text: "You can see the data updated in your profile",
          icon: "success"
        });
    } }catch (error) {
      console.error('Error updating employee:', error);
    }}
  };

  const formik = useFormik({
    initialValues: {
      FName: FName || '',
      LName: LName || '',
      phoneNumber: phoneNumber || '',
      address: address || '',
      DateOfBirth: formatDate(DateOfBirth) || '',
      gender: gender || '',
      image: image || null,
    },
    // validationSchema: editProfile,
    onSubmit,
  });

  useEffect(() => {
    formik.setValues({
      FName,
      LName,
      phoneNumber,
      address,
      DateOfBirth: formatDate(DateOfBirth),
      gender,
      image,
    });
    setSelectedGender(gender);
  }, [FName, LName, phoneNumber, address, DateOfBirth, gender, image]);

  const inputs = [
    {
      type: 'text',
      id: 'FName',
      name: 'FName',
      title: 'First Name',
      value: formik.values.FName,
    },
    {
      type: 'text',
      id: 'LName',
      name: 'LName',
      title: 'Last Name',
      value: formik.values.LName,
    },
    {
      type: 'text',
      id: 'phoneNumber',
      name: 'phoneNumber',
      title: 'User phoneNumber',
      value: formik.values.phoneNumber,
    },
    {
      type: 'text',
      id: 'address',
      name: 'address',
      title: 'User address',
      value: formik.values.address,
    },
    {
      type: 'date',
      id: 'DateOfBirth',
      name: 'DateOfBirth',
      title: 'Date of birth',
      value: formik.values.DateOfBirth,
    },
    {
      type: 'file',
      id: 'image',
      name: 'image',
      title: 'Image',
      onChange: handleFieldChange,
    },
  ];

  const renderInputs = inputs.map((input, index) => (
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

  return (
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className="row justify-content-center">
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
          name="gender"
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className='text-center mt-3'>
        <Button
          sx={{ px: 2 }}
          variant="contained"
          className="m-2 btn primaryBg"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Update
        </Button>
        <p className='text-danger'>{errmsg}</p>
      </div>
    </form>
  );
}
