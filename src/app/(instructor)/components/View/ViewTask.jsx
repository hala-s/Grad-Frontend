'use client';
import React, { useContext, useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CircularProgress from "@mui/material/CircularProgress";
import './style.css'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation'
import EditTask from '../Edit/EditTask.jsx';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserContext } from '../../../../context/user/User.jsx';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import fileDownload from 'js-file-download'
import { KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#4c5372', // Change the background color here
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function ViewTask({ materialID , type, Id}) {
    const [openRows, setOpenRows] = useState([]);
  
    const handleToggleRow = (index) => {
      const newOpenRows = [...openRows];
      newOpenRows[index] = !newOpenRows[index];
      setOpenRows(newOpenRows);
    };
  
  const router = useRouter();
 const [material, setMaterial]=useState(null);
 const [submission, setSubmission]=useState(null);
 const {userToken, setUserToken, userData}=useContext(UserContext);
 const [taskOpen, setTaskOpen] = React.useState(false);

 const [loading ,setLoading]=useState(true);
 const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = React.useState(false);
 const theme = useTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
 const [openAlert, setOpenAlert] = React.useState(false);
 const handleCloseAlert = (event, reason) => {
   if (reason === 'clickaway') {
     return;
   }

   setOpenAlert(false);
 };
 const handleClickOpen = () => {
   setOpen(true);
 };

 const handleClose = () => {
   setOpen(false);
 };
 const DownloadMaterial = async (url) => {
  const apiUrl = process.env.NEXT_PUBLIC_EDUCODING_API;
  const baseApiUrl = apiUrl.substring(0, apiUrl.lastIndexOf("api/"));
  let cleanUrl = url.replace(`${baseApiUrl}`, "");
  let fileName = url.replace(`${baseApiUrl}Files\\`, "");


  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_EDUCODING_API}Files/DownloadFile?filename=${cleanUrl}`,
    {
      responseType: 'blob',
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    }
  );

  fileDownload(data, fileName);
};
 const getMaterial=async()=>{
  if(userToken){
    try{
  const {data}= await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}MaterialControllar/GetMaterialById?id=${materialID}`,
    { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    }}

  )


  setMaterial(data.result);
  setIsChecked(data.result.isHidden);
  setLoading(false);
    }
    catch(error){
      console.log(error);
    }
  }
 }
 const getSubmission=async()=>{
  if(userToken){
  const {data}= await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Submissions/GetAllSubmissionForTask?taskId=${materialID}`,
  {headers :{Authorization:`Bearer ${userToken}`}}

  )

   setSubmission(data.result.items);
 }
 }
 const [isChecked, setIsChecked] = useState();

 const hideMaterial= async(event)=>{
  try{
    setIsChecked(event.target.checked);
    const {data}= await axios.patch(`${process.env.NEXT_PUBLIC_EDUCODING_API}MaterialControllar/HideOrShowMaterials?Id=${materialID}&isHidden=${event.target.checked}`,
      {},
      {headers :{Authorization:`Bearer ${userToken}`}}
    
      )
  }catch(error){
    console.log(error);
  }
 }
 const deleteMaterial=async()=>{
  const {data}= await axios.delete(`${process.env.NEXT_PUBLIC_EDUCODING_API}MaterialControllar/DeleteMaterial?id=${materialID}`,
  {headers :{Authorization:`Bearer ${userToken}`}}

  )
  setOpenAlert(true);
  setOpen(false);
  router.back();

 }
 const handleEdit =()=>{
  setIsEditing(!isEditing);
 }
 useEffect(() => {
    getMaterial();
    getSubmission();
  
}, [materialID, isEditing, userToken, isChecked]);


  const style = {
    p: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  };



if (loading) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress color="primary" />
    </Box>
  );
}
  return (
    <>
      <Stack direction="row" alignItems="center"  justifyContent= 'end' width='89%' mt='2px'>
    <div >
    <FormControlLabel
          value="top"
          control={<Switch color="success" onChange={hideMaterial} checked={isChecked} />}
          label="Hide"
          labelPlacement="top"
        />
    <IconButton aria-label="delete" onClick={handleClickOpen}>
      <DeleteIcon  color="error"/>
    </IconButton>
    <IconButton aria-label="Edit" onClick={handleEdit}>
      <ModeEditIcon color="success" />
    </IconButton >
    </div>
  </Stack>
    <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          The Task Deleted succssfully!
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
          <Button onClick={deleteMaterial} autoFocus variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
        </Stack>
      </Dialog>
    {isEditing?(
    <EditTask materialID={materialID} name={material.name} description={material.description}  deadLine={material.deadLine} pdf={material.pdfUrl} type={type} Id={Id}/>

):(
<div className='mt-5 pt-5 ms-5 task'>

<TableContainer component={Paper} sx={{ width: '84%', mt: 7 , align:'center', ml:7, }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableBody>
         
            <StyledTableRow >
            <StyledTableCell component="th" scope="row">
            Task title
              </StyledTableCell>
              <StyledTableCell align="left">{material.name}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
            <StyledTableCell component="th" scope="row">
            Description
              </StyledTableCell>
              <StyledTableCell align="left">{material.description}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
            <StyledTableCell component="th" scope="row">
            DeadLine
              </StyledTableCell>
              <StyledTableCell align="left">{material.deadLine}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
            <StyledTableCell component="th" scope="row">
            Files 
              </StyledTableCell>
              <StyledTableCell align="left">
              {material.materialFiles?.length ? (
             material.materialFiles.map((file, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', border: '1px solid #adb5bd', p: 1, mb: 1 }}>
                <PictureAsPdfIcon sx={{ mr: 1, color:'#4c5372' }} />
                <Link target='_blank' href={`${file.pdfUrl}`}>
                  File {index + 1}
                </Link>
                <IconButton aria-label="download" onClick={()=>DownloadMaterial(file.pdfUrl)}>
        <FileDownloadIcon sx={{color:'#4c5372' }} />
      </IconButton>
              </Box>
         ))
        ) : (
          <>
           <Link download target='_blank'  href={`${material.pdfUrl}`}>{material.name}</Link>
           <IconButton aria-label="download" onClick={()=>DownloadMaterial(material.pdfUrl)} >
        <FileDownloadIcon sx={{color:'#4c5372' }} />
      </IconButton>
        
          
          </>
         
          )
        }
              </StyledTableCell>
            </StyledTableRow>
       
        </TableBody>
      </Table>
    </TableContainer>
    <Typography variant="h6" gutterBottom component="div" className='mt-5 ms-5 ps-1'>
      Submissions
    </Typography>
    <TableContainer component={Paper} sx={{ width: '84%', ml: 7, mt: 4 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell />
            <StyledTableCell>Student Name</StyledTableCell>
            <StyledTableCell align="center">Submissions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submission?.length ? (
            submission.map((sub, index) => (
              <React.Fragment key={sub.studentId}>
                <TableRow>
                  <StyledTableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleToggleRow(index)}
                    >
                      {openRows[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell>{sub.userName}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Link target='_blank' href={sub.pdfUrl}>File</Link>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openRows[index]} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h5" gutterBottom component="div">
                          Description
                        </Typography>
                        <Typography variant="body1" gutterBottom component="div">
                          {sub.description}
                        </Typography>
                      </Box>
                    </Collapse>
                  </StyledTableCell>
                </TableRow>
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <StyledTableCell colSpan={3} align="center">No data</StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
</div>
)}
      
   
  </>
  )
}

