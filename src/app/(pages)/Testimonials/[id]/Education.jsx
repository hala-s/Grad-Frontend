'use client'
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { UserContext } from '@/context/user/User';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function Education({id}) {
  const { userToken, userId } = useContext(UserContext);
  const [instructorSkills, setInstructorSkills] = useState([]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClose = () => {
    setOpen(false);
  };
  

  const getInstructorSkills = async () => {
    if (id) {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Skill/GetAllInstructorSkills?instructorId=${id}`, {
          headers: { Authorization: `Bearer ${userToken}`}
        });
        if (data) {
          setInstructorSkills(data.result || []);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  useEffect(() => {
    getInstructorSkills();
  }, [id, instructorSkills, ]);

 
  return (
    <>
      <h2 className='pr'> Skills</h2>

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

    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      {instructorSkills && instructorSkills.map((data) => (
        <ListItem key={data.id} sx={{ display: 'inline-flex', p: 1 }}>
          <Chip
            label={data.name}
          />
        </ListItem>
      ))}
    </Box>
  </Paper>
 </>
  );
}
