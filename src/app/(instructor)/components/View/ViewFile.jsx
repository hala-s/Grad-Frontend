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
import Button from '@mui/material/Button';
import { useQuery } from "react-query";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from '@mui/material/Snackbar';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Alert from '@mui/material/Alert';
import './style.css'
import EditFile from '../Edit/EditFile.jsx';
import { useRouter } from 'next/navigation'
import { UserContext } from '../../../../context/user/User.jsx';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import fileDownload from 'js-file-download'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: ' #4c5372',
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
export default function ViewFile({ materialID ,type, Id }) {
 const [material, setMaterial]=useState(null);
 const [loading ,setLoading]=useState(true);
 const [isEditing, setIsEditing] = useState(false);
 const router = useRouter();
 const {userToken, setUserToken, userData}=useContext(UserContext);

 const [open, setOpen] = React.useState(false);
 const theme = useTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
 const [openAlert, setOpenAlert] = React.useState(false);
 const handleClickOpen = () => {
  setOpen(true);
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
const handleClose = () => {
  setOpen(false);
};

 const handleCloseAlert = (event, reason) => {
   if (reason === 'clickaway') {
     return;
   }

   setOpenAlert(false);
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
console.log(data);
  }catch(error){
    console.log(error);
  }
}
 }
 const [isChecked, setIsChecked] = useState();

 const hideMaterial= async(event)=>{
  try{
    setIsChecked(event.target.checked);
    const {data}= await axios.patch(`${process.env.NEXT_PUBLIC_EDUCODING_API}MaterialControllar/HideOrShowMaterials?Id=${materialID}&isHidden=${event.target.checked}`,
      
      { headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }}
    
      )
    console.log(data);
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
  
}, [materialID,userToken, isChecked]);


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
   <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          The File Deleted succssfully!
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
           Do you really want to delete this file? This process cannot be undone.
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
  
<Stack direction="row" alignItems="center"  justifyContent= 'end' width='89%' mt='2px'>
    <div >
    <FormControlLabel
          value="top"
          control={<Switch color="success" onChange={hideMaterial} checked={isChecked} />}
          label="Hide"
          labelPlacement="top"
        />
    <IconButton aria-label="delete" onClick={handleClickOpen} >
      <DeleteIcon  color="error"/>
    </IconButton>
    <IconButton aria-label="Edit"  onClick={handleEdit}>
      <ModeEditIcon color="success" />
    </IconButton >
    </div>
  </Stack>
  {isEditing?(
    <EditFile materialID={materialID} name={material?.name} description={material?.description} type={type} Id={Id}/>

):(
  <div className ='pt-5 mt-5'>
<TableContainer component={Paper} sx={{ width: '84%', mt: 7 , align:'center', ml:7, }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableBody>
         
            <StyledTableRow >
            <StyledTableCell component="th" scope="row">
             title
              </StyledTableCell>
              <StyledTableCell align="left">{material?.name}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
            <StyledTableCell component="th" scope="row">
            Description
              </StyledTableCell>
              <StyledTableCell align="left">{material?.description}</StyledTableCell>
            </StyledTableRow>
        
            <StyledTableRow >
            <StyledTableCell component="th" scope="row">
            Files 
              </StyledTableCell>
              <StyledTableCell align="left">
              {material?.materialFiles?.length ? (
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
           <Link download target='_blank'  href={`${material?.pdfUrl}`}>{material?.name}</Link>
           <IconButton aria-label="download" onClick={()=>DownloadMaterial(material?.pdfUrl)} >
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
</div>
)}
  </>
  )
}
