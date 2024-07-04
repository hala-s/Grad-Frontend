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

export default function Education() {
  const { userToken, userId } = useContext(UserContext);
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [instructorSkills, setInstructorSkills] = useState([]);
  const [selectedSkillIds, setSelectedSkillIds] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const [skillId, setSkillId] = useState();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_EDUCODING_API}Skill/DeleteAnInstructorSkill?InstructorId=${userId}&SkillId=${skillId}`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
        setOpen(false);
        setOpenAlert(true);
        setInstructorSkills(instructorSkills.filter(skill => skill.id !== skillId));
        setSelectedSkills(selectedSkills.filter(skill => skill.id !== skillId));
        setSelectedSkillIds(selectedSkills.filter(skill => skill.id !== skillId).map(skill => skill.id));
      
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSkills = async () => {
    if (userId) {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Skill/GetAllSkillOptionsToInstructor?instructorId=${userId}`,{ headers: { Authorization: `Bearer ${userToken}` } });
          setAllSkills(data.result || []);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getInstructorSkills = async () => {
    if (userId) {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Skill/GetAllInstructorSkills?instructorId=${userId}`, {
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
  const AddSkills = async () => {
    const formData = new FormData();
    selectedSkillIds.forEach(skillId => {
      formData.append("skills", skillId);
  });
    if (userId) {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_EDUCODING_API}Skill/selectAnInstructorSkills?instructorId=${userId}`,
          formData,
          { headers: { Authorization: `Bearer ${userToken}` },'Content-Type':'application/problem+json','Content-Type':'charset=utf-8' } // Authorization token as the third element
        );
          setSelectedSkills([]);
          setSelectedSkillIds([]);
          setOpenAlert(true);

        
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  const handleEdit =()=>{
    setIsEditing(!isEditing);
   }
   const handleCloseAlert =()=>{
    setOpenAlert(false);
   }
  useEffect(() => {
    getAllSkills();
    getInstructorSkills();
  }, [userId, instructorSkills, isEditing, skillId]);

  const handleSkillChange = (event, value) => {
    setSelectedSkills(value);
    const ids = value.map(skill => skill.id);
    setSelectedSkillIds(ids);
  };
  const handleClickOpen = (id) => {
    setOpen(true);
    setSkillId(id);
  };
 
  return (
    <>
     <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Done succssfully!
        </Alert>
      </Snackbar>
    <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{p:7}}
      >
       <Stack  direction="column"
  justifyContent="center"
  alignItems="center"
  spacing={2}
  mt='5px'>
       <HighlightOffIcon sx={{fontSize:100, mt:5}} color="error"/>
       <Typography variant='h4'>Are you sure?</Typography>

       </Stack>
        <DialogContent>
          
          <DialogContentText>
           Do you really want to delete this task? This process cannot be undone.
          </DialogContentText>
        </DialogContent>
        <Stack  direction="row"
  justifyContent="center"
  alignItems="center"
  spacing={2}
  mt='5px'>
        <DialogActions>
          <Button autoFocus variant="outlined" color="success" onClick={handleClose} >
            Cancle
          </Button>
          <Button onClick={handleDelete} autoFocus variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
        </Stack>
      </Dialog>
      <h2 className='pr'>My Skills</h2>

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
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      {isEditing?(instructorSkills && instructorSkills.map((data) => (
        <ListItem key={data.id} sx={{ display: 'inline-flex', p: 1 }}>
          <Chip
            label={data.name}
            onDelete={()=>handleClickOpen(data.id)}
          />
        </ListItem>
      ))):(instructorSkills && instructorSkills.map((data) => (
        <ListItem key={data.id} sx={{ display: 'inline-flex', p: 1 }}>
          <Chip
            label={data.name}
          />
        </ListItem>
      )))}
    </Box>
  </Paper>
      
      <Autocomplete
        multiple
        id="tags-standard"
        options={allSkills}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        value={selectedSkills}
        isOptionEqualToValue={(option, value) => option.id === value.id} // custom equality test
        onChange={handleSkillChange} // handle changes here
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add Skills"
            variant="standard"
            placeholder="Skills"
          />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={AddSkills}
        disabled={selectedSkills.length === 0}
        style={{ marginTop: '10px' }}
      >
        Add All Selected
      </Button>

    </>
  );
}
