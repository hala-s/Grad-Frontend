'use client'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'next/navigation.js';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MessageIcon from '@mui/icons-material/Message';
import LinkIcon from '@mui/icons-material/Link';
import { deepPurple } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import '../../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import './style.css'
import Layout from '../../instructorLayout/Layout.jsx';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTask from '../../components/Add/AddTask.jsx';
import AddFile from '../../components/Add/AddFile.jsx';
import AddLink from '../../components/Add/AddLink.jsx';
import AddAnnouncement from '../../components/Add/AddAnnouncement.jsx';
import ViewTask from '../../components/View/ViewTask.jsx';
import { FormControl, InputLabel, MenuItem, Pagination, Select } from '@mui/material';
import { UserContext } from '../../../../context/user/User.jsx';
import Chip from '@mui/material/Chip';

export default function page() {
  const {userToken, setUserToken, userData}=useContext(UserContext);

    const contents=[
        {
            title:'Task 1',
            color:'#7C7E9D',
            icon:AssignmentIcon,
            description:'this task until 3/3/2024',
            type:'task',
            inputs:
            {

            }
        },
        {
            title:'Chapter 1 ',
            color:'#949AB1',
            icon:InsertDriveFileIcon,
            description:'this file upload for chapter 1',
            type:'file'


        },
          {
            title:'Announcement 1',
            color:'#7388D7',
            icon:MessageIcon,
            description:'',
            type:'announcement'


        },
        {
            title:'Lecture 1',
            color:'#9AA6D7',
            icon:LinkIcon ,
            description:'Link of lecture one ',
            type:'link'

        }
];

const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };
const [openTaskDialog, setOpenTaskDialog] = useState(false);
const [openFileDialog, setOpenFileDialog] = useState(false);
const [openLinkDialog, setOpenLinkDialog] = useState(false);
const [openAnnouncementDialog, setOpenAnnouncementDialog] = useState(false);
const [openViewTaskDialog, setOpenViewTaskDialog] = useState(false);
const [materialId, setMaterialId]=useState();
  const handleAddContent=(type)=>{
if (type=='task'){
  setOpenTaskDialog(true);

}
if (type=='file'){
  setOpenFileDialog(true);

}
if (type=='link'){
  setOpenLinkDialog(true);

}
if (type=='announcement'){
  setOpenAnnouncementDialog(true);

}
}  
const handleViewContent=(type, mId)=>{
  if (type=='Task'){
    setOpenViewTaskDialog(true);
  
  }
  if (type=='file'){
    setOpenFileDialog(true);
  
  }
  if (type=='link'){
    setOpenLinkDialog(true);
  
  }
  if (type=='announcement'){
    setOpenAnnouncementDialog(true);
  
  }
  }  
const handleCloseTaskDialog = () => {
  setOpenTaskDialog(false);
};

const handleCloseFileDialog = () => {
  setOpenFileDialog(false);
};
const handleCloseLinkDialog = () => {
  setOpenLinkDialog(false);
};
const handleCloseAnnouncementDialog = () => {
  setOpenAnnouncementDialog(false);
};
const handleCloseViewTaskDialog = () => {
  setOpenViewTaskDialog(false);
};

  const handleClose = () => {
    setOpen(false);
  };
    const [materials, setMaterials] = useState([]);
    const { LectureId } = useParams();
    const [lecture, setLectre]=useState();
    const getLecture = async () => {
if(userToken&&LectureId){
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_EDUCODING_API}Lectures/GetConsultationById?consultationId=${LectureId}`,
        {headers :{Authorization:`Bearer ${userToken}`}}

      );
     setLectre(data.data.result);
    }};
    const getLectureMaterial = async () => {
      if(userToken&&LectureId){
        try{
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_EDUCODING_API}MaterialControllar/GetAllMaterial?ConsultationId=${LectureId}`,
          {headers :{Authorization:`Bearer ${userToken}`}}

          
        );
        setMaterials(data.result);
      }catch(error){
        console.log(error);
      }}
      };
      const [participants, setParticipants]= useState();
      const [pageNumber, setPageNumber] = useState(1);
      const [pageSize, setPageSize] = useState(10);
      const [totalPages, setTotalPages] = useState(0);
    

      useEffect(() => {
        getLectureMaterial();
        getLecture();
        //getParticipants();
      }, [participants, pageNumber, pageSize,materials,userToken, LectureId]);  // Fetch courses on mount and when page or size changes
      
      const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPageNumber(1); // Reset to the first page when page size changes
      };
      
      const handlePageChange = (event, value) => {
        setPageNumber(value);
      };

      
  return (
    <Layout title={lecture?.name}>
      
    <div>
  <ul className="nav nav-tabs" id="myTab" role="tablist">
    <li className="nav-item" role="presentation">
      <button className="nav-link active" id="content-tab" data-bs-toggle="tab" data-bs-target="#content-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Content</button>
    </li>
    <li className="nav-item" role="presentation">
      <button className="nav-link" id="Details-tab" data-bs-toggle="tab" data-bs-target="#Details-tab-pane" type="button" role="tab" aria-controls="Details-tab-pane" aria-selected="false">Details</button>
    </li>
   
  </ul>
  <div className="tab-content" id="myTabContent">
    <div className="tab-pane fade show active" id="content-tab-pane" role="tabpanel" aria-labelledby="content-tab" tabIndex={0}>
    <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 1,
          mr: 6,
        }}
      >
<Button sx={{px:2}} variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleClickOpen}>
  Add New
</Button>
      </Box>
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
              height: "300px!important",            },
          },
          
        }}
        >
        <DialogTitle id="responsive-dialog-title">
          {"ADD NEW"}
        </DialogTitle>
        
        <AddTask open={openTaskDialog} onClose={handleCloseTaskDialog} handleCloseAdd={handleClose} type='consultationId' Id={LectureId}/>
        <AddFile open={openFileDialog} onClose={handleCloseFileDialog} handleCloseAdd={handleClose} type='consultationId' Id={LectureId} />
        <AddLink open={openLinkDialog} onClose={handleCloseLinkDialog} handleCloseAdd={handleClose} type='consultationId' Id={LectureId}/>
        <AddAnnouncement open={openAnnouncementDialog} onClose={handleCloseAnnouncementDialog} type='consultationId' handleCloseAdd={handleClose} Id={LectureId} />

        <DialogContent>
        <Stack
   direction="row"
   spacing={1}
   sx={{ justifyContent: 'space-between',  alignContent: 'center'}}
    >
  
{contents.map(({ icon: Icon, type})=>( 
  <Button onClick={()=>handleAddContent(type)}>
   <Stack
   direction="column"
   justifyContent="center"
   alignItems="center"
   spacing={1}
    >
     <Icon sx={{fontSize:50, }}/>
     <Typography variant='h6'> {type}</Typography>
     </Stack>
     </Button>
))}
     </Stack>
        </DialogContent>
        <DialogActions>
         
          <Button onClick={handleClose} autoFocus>
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
   {materials&& materials?.map((material)=>( 

<Box
height={70}
width={1000}
gap={4}
p={2}
sx={{ border: '1px solid grey' ,borderRadius: 3, mt:2, display: 'flex',
  justifyContent: 'space-between',}}
className={material.type}
>
<div className='d-flex align-items-center '>
{material.type=='Task'&&<AssignmentIcon sx={{fontSize:50, }}/>}
{material.type=='File'&&<InsertDriveFileIcon sx={{fontSize:50, }}/>}
{material.type=='Link'&&<LinkIcon  sx={{fontSize:50, }}/>}
{material.type=='Announcement'&&<MessageIcon sx={{fontSize:50, }}/>}
<Link href={`${LectureId}/${material.id}`} underline="none">
<Typography variant='h6'> {material.name}</Typography>
</Link>
</div>
{material.isHidden?(<Chip label="Hidden" color="error" />):(<Chip label="Active" color="success" />)}



</Box>

        ))}



    </div>
    <div
            className="tab-pane fade"
            id="Details-tab-pane"
            role="tabpanel"
            aria-labelledby="Details-tab"
            tabIndex={0}
          >
            <div className="mt-5 ">
              <div className="sidebar">
                <div className="sidebar-widget widget-information">
                  <div className="info-list">
                    <ul>
                      <li>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="user"
                          className="svg-inline--fa fa-user icon-list pe-2"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="currentColor"
                            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                          />
                        </svg>
                        <strong >Instructor : </strong>
                        <span>
                          {lecture?.instructoruserName}{" "}
                          {lecture?.instructorLName}
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="clock"
    className="svg-inline--fa fa-clock icon-list pe-2 me-2"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
     
  >
    <path
      fill="currentColor"
      d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
    />
  </svg>
  <div>
    <strong>Date: </strong>
    <span>{lecture?.date.split(' ')[0]}<br/></span>
    <strong >Start Time: </strong>
    <span>{lecture?.startTime} <br/></span>
    <strong >End Time: </strong>
    <span>{lecture?.endTime}</span>

  </div>
</li>
                      
                      <li>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="user-graduate"
                          className="svg-inline--fa fa-user-graduate icon-list pe-2"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="currentColor"
                            d="M219.3 .5c3.1-.6 6.3-.6 9.4 0l200 40C439.9 42.7 448 52.6 448 64s-8.1 21.3-19.3 23.5L352 102.9V160c0 70.7-57.3 128-128 128s-128-57.3-128-128V102.9L48 93.3v65.1l15.7 78.4c.9 4.7-.3 9.6-3.3 13.3s-7.6 5.9-12.4 5.9H16c-4.8 0-9.3-2.1-12.4-5.9s-4.3-8.6-3.3-13.3L16 158.4V86.6C6.5 83.3 0 74.3 0 64C0 52.6 8.1 42.7 19.3 40.5l200-40zM111.9 327.7c10.5-3.4 21.8 .4 29.4 8.5l71 75.5c6.3 6.7 17 6.7 23.3 0l71-75.5c7.6-8.1 18.9-11.9 29.4-8.5C401 348.6 448 409.4 448 481.3c0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-71.9 47-132.7 111.9-153.6z"
                          />
                        </svg>
                        <strong>Studet : </strong>
                        <span>{lecture?.studentuserName} {lecture?.studentLName}</span>
                      </li>
                      <li>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="hourglass-half"
                          className="svg-inline--fa fa-hourglass-half icon-list pe-2"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                        >
                          <path
                            fill="currentColor"
                            d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64V75c0 42.4 16.9 83.1 46.9 113.1L146.7 256 78.9 323.9C48.9 353.9 32 394.6 32 437v11c-17.7 0-32 14.3-32 32s14.3 32 32 32H64 320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V437c0-42.4-16.9-83.1-46.9-113.1L237.3 256l67.9-67.9c30-30 46.9-70.7 46.9-113.1V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320 64 32zM96 75V64H288V75c0 19-5.6 37.4-16 53H112c-10.3-15.6-16-34-16-53zm16 309c3.5-5.3 7.6-10.3 12.1-14.9L192 301.3l67.9 67.9c4.6 4.6 8.6 9.6 12.1 14.9H112z"
                          />
                        </svg>
                        <strong >Duration : </strong>
                        <span>{lecture?.duration}</span>
                      </li>
                      <li>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="layer-group"
                          className="svg-inline--fa fa-layer-group icon-list pe-2"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"
                          />
                        </svg>
                        <strong>Description : </strong>
                        <span>{lecture?.description}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
   
   
  </div>
</div>

    </Layout>
  )
}
