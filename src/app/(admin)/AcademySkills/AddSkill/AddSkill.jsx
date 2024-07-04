'use client';
import Input from '@/component/input/Input';
import { addSkills } from '@/component/validation/validation';
import { UserContext } from '@/context/user/User';
import { Button } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2';

export default function AddSkill({setOpen}) {
  let [errmsg,setErrmsg] = useState();
    const { userData,userToken } = useContext(UserContext);
    const initialValues={
        skillName: '',
    };

    const onSubmit = async (values) => {
        if(userData){
          try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_EDUCODING_API}Skill/AddSkillOptionsByAdmin?skillName=${values.skillName}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                if(data.errorMassages != null){
                  setErrmsg(data.errorMassages)
                  
                }
                else{
            formik.resetForm();
            setOpen(false);      
            Swal.fire({
              title: "Skill Added Successfully!",
              text: "Check AcademySkills page to see it",
              icon: "success"
            });
        
          }} catch (error) {
            console.error('Error submitting form:', error);
            console.log('Error response:', error.response);
          }}
        };

        const formik = useFormik({
            initialValues : initialValues,
            onSubmit,
             validationSchema:addSkills
          })
         
  return (
    <>
        <form onSubmit={formik.handleSubmit} className="row justify-content-center">
      <div className="form-floating mb-3">
  <input type="text" className="form-control" id="floatingInput" placeholder="Skill Name" name="skillName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.skillName} />

  <label htmlFor="floatingInput">Skill Name</label>
  {formik.touched.skillName && formik.errors.skillName ? (
                        <p className='text text-danger'> {formik.errors.skillName}</p>
                    ) : null}
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
    </>
  )
}
