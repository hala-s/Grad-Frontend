'use client';
import React, { useEffect, useState, useContext } from 'react'
import TextArea from '@/component/input/TextArea';
import { UserContext } from '@/context/user/User';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from "yup";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export default function About() {
    const {userToken, setUserToken, userData, userId}=useContext(UserContext);
    const [bio, setBio] = React.useState();
    const [isEditing, setIsEditing] = useState(false);

    const [Alertopen, setAlertOpen] = React.useState(false);
    const getBio = async () => {
        if (userId) {
          try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Employee/GetEmployeeById?id=${userId}`);
            setBio(data.result.skillDescription);
        } catch (error) {
         console.log(error);
        }
     }
    };
    const handleEdit =()=>{
      setIsEditing(!isEditing);
     }
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setAlertOpen(false);
    };
    let initialValues = {
        skillDescription: `${bio}`
    };
    const onSubmit = async (description) => {
      try{
  const formData = new FormData();
  formData.append("skillDescription", description.skillDescription);

  
  const { data } = await axios.patch(
    `${process.env.NEXT_PUBLIC_EDUCODING_API}Instructor/AddASkillDescription?instructorId=${userId}`,
    formData,
    {headers: {
    'Authorization':`Bearer ${userToken}`,
  
      'Content-Type': 'multipart/form-data','Content-Type': 'application/json',
    }}
  
  );
   formik.resetForm();
   setAlertOpen(true);
   setIsEditing(false);
      }catch(error){
        console.log(error);
      }
    
    };
    const validationSchema = yup.object({
        skillDescription: yup
        .string()
        .required("Description is required"),
  
    });
  
    const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema: validationSchema,
    });
    const inputs = [
      {
        id: "skillDescription",
        type: "text",
        name: "skillDescription",
        title: "About me",
        value: formik.values.skillDescription,
      },

   
    ];
    const renderInputs = inputs.map((input, index) => (
      <TextArea
        type={input.type}
        id={input.id}
        name={input.name}
        value={bio}
        title={input.title}
        onChange={input.onChange || formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched}
        errors={formik.errors}
        key={index}
      />
    ));
    useEffect(()=>{
        getBio();
    },[userId, bio, isEditing])
    
  return (
    <>
     <Snackbar open={Alertopen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Bio Updated successfully!
        </Alert>
      </Snackbar>
      <Paper
    sx={{
      display: 'flex',
      flexDirection: 'column',
      listStyle: 'none',
      p: 1,
      m: 5,
    }}
    component="ul"
  >
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <IconButton aria-label="Edit" onClick={handleEdit}>
        <ModeEditIcon color="success" />
      </IconButton>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
      {isEditing?(<form onSubmit={formik.handleSubmit} className="row justify-content-center w-100">
            
            {renderInputs}
             
            <div className='text-center mt-3'>
            <Button sx={{px:2}} variant="contained"
                    className="m-2 btn primaryBg"
                    type="submit"
                    disabled={!formik.isValid}
  
                  >
                    Update
                  </Button>
            </div>
      
      
          </form>):(   
          <div>
            <h2 className='pr '>Bio</h2>
             {bio&&<p>{bio}</p>}
          </div>)}
    </Box>
  </Paper>

        </>
  )
}
