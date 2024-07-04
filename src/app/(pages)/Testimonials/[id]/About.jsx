'use client';
import React, { useEffect, useState } from 'react'
import TextArea from '@/component/input/TextArea';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default function About({id}) {
    const [bio, setBio] = React.useState();

    const getBio = async () => {
        if (id) {
          try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Employee/GetEmployeeById?id=${id}`);
            setBio(data.result.skillDescription);
        } catch (error) {
         console.log(error);
        }
     }
    };

    useEffect(()=>{
        getBio();
    },[id, bio, ])
    
  return (
    <>
    
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
   
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
          <div>
            <h2 className='pr '>Bio</h2>
             {bio&&<p>{bio}</p>}
          </div>
    </Box>
  </Paper>

        </>
  )
}
