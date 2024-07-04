'use client'
import React, { useContext, useEffect, useState } from 'react';
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { UserContext } from '@/context/user/User';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Rating from "@mui/material/Rating";
import AddCommentIcon from '@mui/icons-material/AddComment';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import TextArea from '../../../../component/input/TextArea.jsx';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export default function Review({courseId,isEnrolled}) {
  const { userToken, userId } = useContext(UserContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [reviews, setReviews]= useState([]);
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [Alertopen, setAlertOpen] = React.useState(false);
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const initialValues = {
    content: "",
  };
  const onSubmit = async (review) => {
    const payload = {
      content: review.content,
      range: value,
    };
  
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_EDUCODING_API}Feedback/AddCourseFeedback?studentId=${userId}&courseId=${courseId}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          }
        }
      );
      setAlertOpen(true);
      setOpen(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };
  
  
      const validationSchema = yup.object({
        content: yup
          .string()
          .required("course comment is required"),

    
      });
    
      const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: validationSchema,
      });
      const inputs = [
        {
          id: "content",
          type: "text",
          name: "content",
          title: "Comment",
          value: formik.values.content,
        }]
  const getReviews = async () => {
    try{
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_EDUCODING_API}Feedback/GetAllCourseFeedback?courseId=${courseId}`
        );
        setReviews(data.data.result.items);
      }catch(error){
        console.log(error);
      }};
  useEffect(() => {
    getReviews();
  }, [userId, reviews ]);
  const renderInputs = inputs.map((input, index) => (
    <TextArea
      type={input.type}
      id={input.id}
      name={input.name}
      value={input.value}
      title={input.title}
      onChange={input.onChange || formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
      errors={formik.errors}
      key={index}
      fullWidth

    />
  ));
  return (
    <>
     <Snackbar open={Alertopen} autoHideDuration={10000} onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your comment posted successfully!
        </Alert>
      </Snackbar>
     <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px!important",  
              minHeight: "250px!important",  

                        },
          },}}
      >
         <DialogTitle id="responsive-dialog-title" sx={{m:'auto'}}>
          {"Add a Review"}
        </DialogTitle>
       <Stack  direction="column"
  justifyContent="center"
  alignItems="center"
  spacing={2}
  mt='5px'>
        <Rating
        sx={{display: 'flex',
          justifyContent: 'center',}}
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <DialogContent sx={{m:'auto'}} className='post-review'>
          
          <DialogContentText  >
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
           {renderInputs}
       <Button  type="submit" autoFocus variant="contained" sx={{background:"#4c5372 !important", mt:3, ml:7}}>
            Post
          </Button>
            </form>
          
          </DialogContentText>
        </DialogContent>

       </Stack> 
        
        
        <DialogActions>
          <Button autoFocus variant="outlined" color="success" onClick={handleClose} >
            Cancle
          </Button>
         
        </DialogActions>
      </Dialog>
    <Box sx={{display:'flex', justifyContent: 'flex-end'}}>
      
    <IconButton aria-label="add" sx={{alignself:'end'}} onClick={handleClickOpen}>
  {isEnrolled &&<AddCommentIcon sx={{color:"#4c5372" , fontSize:30, mr:3}} />}
</IconButton>
    </Box>
    <List sx={{ width: '100%', bgcolor: 'background.paper' }} className='Reviews'>
  {reviews?.length ? (
    reviews.map((review, index) => (
      <ListItem key={index}>
        <ListItemAvatar>
          {review.imageUrl ? (
            <Avatar alt="User Image" src={review.imageUrl} />
          ) : (
            <Avatar>
              <AccountCircle />
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              {review.name} <Rating name="rating" value={review.range} readOnly />
            </>
          }
          secondary={review.content}
        />
      </ListItem>
    ))
  ) : (
    <h4>No comments yet</h4>
  )}
</List>

   
   
    </>
  )
}
