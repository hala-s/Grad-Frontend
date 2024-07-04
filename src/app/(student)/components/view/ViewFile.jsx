'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { useQuery } from "react-query";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import fileDownload from 'js-file-download'
import { UserContext } from '../../../../context/user/User.jsx';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CircularProgress from "@mui/material/CircularProgress";
import './style.css'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
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
export default function ViewFile({ materialID }) {
 const [material, setMaterial]=useState(null);
 const {userToken, setUserToken, userData}=useContext(UserContext);

 const [loading ,setLoading]=useState(true);
 const getMaterial=async()=>{
  if(userToken){
    try{
  const {data}= await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}MaterialControllar/GetMaterialById?id=${materialID}`,
  {headers :{Authorization:`Bearer ${userToken}`}}

  )

  setMaterial(data.result);
  setLoading(false);

  }
catch(error){
  console.log(error);
}}
 }
 useEffect(() => {
    getMaterial();
  
}, [materialID, userToken]);


  const style = {
    p: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
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
  
if (loading) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress color="primary" />
    </Box>
  );
}
  return (
    <div className='studentMaterial mt-5 pt-5'>
         <TableContainer component={Paper} sx={{ width: '84%', mt: 7 , align:'center', ml:7, }} className='filee'>
      <Table  aria-label="customized table">
        <TableBody>
         
            <StyledTableRow >
            <StyledTableCell component="th" scope="row">
             title
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
    
   
  </div>
  )
}
