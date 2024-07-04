import { UserContext } from '@/context/user/User';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export default function ChangeRole({userId ,   role,    setOpenChange}) {
    const { userData,userToken } = useContext(UserContext);

    const [selectedRole, setSelectedRole] = useState(role);
    let [errmsg,setErrmsg] = useState()

    const onSubmit = async () => {
      if(userData){
            try {
       
  
        const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_EDUCODING_API}Employee/EditroleBetweenSubAdmin&MainSubAdmin?userId=${userId}&role=${selectedRole}`,{},{headers :{Authorization:`Bearer ${userToken}`}},);
        if(data.errorMassages != null){
          setErrmsg(data.errorMassages)
          
        }
        else{
          formik.resetForm();
          setOpenChange(false);
          Swal.fire({
            title: "Role changed successfully",
            text: `Role changed to ${selectedRole}`,
            icon: "success"
          });
      }} catch (error) {
        console.error('Error updating employee:', error);
      }}
    };
  
    const formik = useFormik({
      initialValues: {
        role: role || '',
      },
      onSubmit,
    });
  
    useEffect(() => {
      formik.setValues({
        role,
        });
      setSelectedRole(role);
    }, [role]);
  
  return (
    <form onSubmit={formik.handleSubmit} className="row justify-content-center pt-3">
      <div className="col-md-10">
        <select
          className="form-select p-3"
          aria-label="Default select example"
          value={selectedRole}
          onChange={(e) => {
            formik.handleChange(e);
            setSelectedRole(e.target.value);
          }}
          name="role"
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="subadmin">sub-admin</option>
          <option value="main-subadmin">main-subadmin</option>
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
  )
}
