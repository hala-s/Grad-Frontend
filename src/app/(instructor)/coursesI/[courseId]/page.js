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
import { FormControl, InputLabel, MenuItem, Pagination, Select, Tooltip } from '@mui/material';
import { UserContext } from '../../../../context/user/User.jsx';
import Chip from '@mui/material/Chip';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

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
    const { courseId } = useParams();
    const [courseName, setCourseName]=useState();
    const [course, setCourse]=useState({});
    const getCourses = async () => {
if(userToken){
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/GetCourseById?id=${courseId}`,
        {},
        {headers :{Authorization:`Bearer ${userToken}`}}

      );
    setCourse(data.data.result)
      setCourseName(data.data.result.name);
    }};
    const accreditCourse = async (courseId , Status) => {
      if (userData) {
        Swal.fire({
          title: `Are you sure?`,
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes!"
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/accreditCourse?courseId=${courseId}`, {Status},
                {
                  headers: {
                    Authorization: `Bearer ${userToken}`,
                  },
                });
    
              if (Status == "finish") {
                Swal.fire({
                  title: `Course Finished Successully`,
                  text: "The status of course set to finish",
                  icon: "success"
                });
              } 
    
            } catch (error) {
              console.log(error);
            }
          }
        });
      }
    };
  
    const getCourseMaterial = async () => {
      if(userToken){
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_EDUCODING_API}MaterialControllar/GetAllMaterial?CourseId=${courseId}`,
          {headers :{Authorization:`Bearer ${userToken}`}}

          
        );
        setMaterials(data.result);
      }
      };
      const [participants, setParticipants]= useState();
      const [pageNumber, setPageNumber] = useState(1);
      const [pageSize, setPageSize] = useState(10);
      const [totalPages, setTotalPages] = useState(0);
      const getParticipants =async (pageNum = pageNumber, pageSizeNum = pageSize) => {
        if(userToken){

        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_EDUCODING_API}StudentsContraller/GetCourseParticipants?Courseid=${courseId}&pageNumber=${pageNum}&pageSize=${pageSize}`,
          {headers :{Authorization:`Bearer ${userToken}`}}

        );
        setParticipants(data.data.result.items);
        setTotalPages(data.data.result.totalPages);
      }};

      useEffect(() => {
        getCourseMaterial();
        getCourses();
        getParticipants();
      }, [participants, pageNumber, pageSize,materials,userToken]);  // Fetch courses on mount and when page or size changes
      
      const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPageNumber(1); // Reset to the first page when page size changes
      };
      
      const handlePageChange = (event, value) => {
        setPageNumber(value);
      };

      
  return (
    <Layout title={courseName}>
      
    <div>
  <ul className="nav nav-tabs" id="myTab" role="tablist">
    <li className="nav-item" role="presentation">
      <button className="nav-link active" id="content-tab" data-bs-toggle="tab" data-bs-target="#content-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Content</button>
    </li>
    <li className="nav-item" role="presentation">
      <button className="nav-link" id="Participants-tab" data-bs-toggle="tab" data-bs-target="#Participants-tab-pane" type="button" role="tab" aria-controls="Participants-tab-pane" aria-selected="false">Participants</button>
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
               
<Button sx={{px:2}} variant="contained" className='buttondd' startIcon={<AddCircleOutlineIcon />} onClick={handleClickOpen}>
  Add New
</Button>
  <div className="dropdown pt-1 px-2">
                   <Tooltip title="Finish this Course?" placement="top">
                  <button
                    className="dropdown-toggle border-0 bg-white edit-pen"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                   <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
                  </Tooltip>
                  <ul className="dropdown-menu">
                  <li>
                      <button
                        className="dropdown-item"
                        href="#"
                        onClick={()=>accreditCourse(courseId,"finish")}
                        disabled = {course.status === 'finish' }
                      >
                        Finish
                      </button>
                    </li>
                   
                  </ul>
                </div>
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
        <DialogTitle id="responsive-dialog-title" className='addTitle'>
          {"ADD NEW"}
        </DialogTitle>
        
        <AddTask open={openTaskDialog} onClose={handleCloseTaskDialog} handleCloseAdd={handleClose} type='courseId' Id={courseId} />
        <AddFile open={openFileDialog} onClose={handleCloseFileDialog} handleCloseAdd={handleClose} type='courseId' Id={courseId} />
        <AddLink open={openLinkDialog} onClose={handleCloseLinkDialog} handleCloseAdd={handleClose} type='courseId' Id={courseId}/>
        <AddAnnouncement open={openAnnouncementDialog} onClose={handleCloseAnnouncementDialog} type='courseId' handleCloseAdd={handleClose} Id={courseId} />

        <DialogContent>
        <Stack
   direction="row"
   spacing={1}
   sx={{ justifyContent: 'space-between',  alignContent: 'center'}}
    >
  
{contents.map(({ icon: Icon, type})=>( 
  <Button onClick={()=>handleAddContent(type)} className=''>
   <Stack
   direction="column"
   justifyContent="center"
   alignItems="center"
   spacing={1}
   className=''
    >
    <div className='item text-danger'>
      <Icon sx={{fontSize:50, }}  className='itemmm text-black'/>
     <Typography variant='h6' className='itemmm text-black'> {type}</Typography>
    </div>
     
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
      {material.type=='Task'&&<AssignmentIcon sx={{fontSize:50, }} className='itemColor'/>}
      {material.type=='File'&&<InsertDriveFileIcon sx={{fontSize:50, }} className='itemColor'/>}
      {material.type=='Link'&&<LinkIcon  sx={{fontSize:50, }} className='itemColor'/>}
      {material.type=='Announcement'&&<MessageIcon sx={{fontSize:50, }} className='itemColor'/>}
      <Link href={`${courseId}/${material.id}`} underline="none">
     <Typography variant='h6 ' className='itemColor'> {material.name}</Typography>
     </Link>
     </div>
     {material.isHidden?(<Chip label="Hidden" color="error" />):(<Chip label="Active" color="success" />)}
      


    </Box>


        ))}



    </div>
    <div className="tab-pane fade" id="Participants-tab-pane" role="tabpanel" aria-labelledby="Participants-tab" tabIndex={1}>

              <div className='mt-5 ms-5'>

                <div className='row justify-content-end'>
        <FormControl fullWidth sx={{ width: '15%' }} className="pb-3 pe-4">
                <InputLabel id="page-size-select-label">Page Size</InputLabel>
                <Select
                className="justify-content-center"
                  labelId="page-size-select-label"
                  id="page-size-select"
                  value={pageSize}
                  label="Page Size"
                  onChange={handlePageSizeChange}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                </Select>
              </FormControl></div>
    {participants?.map((participant, index)=>( 
    <Box
      height={50}
      width={1000}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '1px solid grey' ,borderRadius: 3, justifyContent: 'space-between', mt:1 , mb:2 }}
      className={index%2==0?"bg-purple1":'bg-purple2'}
    >
     <Typography variant='h6' className='contactIcon'> {participant.userName}</Typography>
     <div className='m-2'>
     <Link href={`https://wa.me/${participant.phoneNumber}`} className='m-2' ><WhatsAppIcon className='contactIcon'/></Link>
     <Link href={`mailto:${participant.email}`} ><EmailIcon className='contactIcon'/></Link>
     </div>
    

    </Box>))}
   
    </div>
   
    
    </div>
  
   
   
  </div>
</div>

    </Layout>
  )
}
