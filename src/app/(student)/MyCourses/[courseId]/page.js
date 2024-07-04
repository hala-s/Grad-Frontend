'use client'
import React, { useEffect, useState, useContext } from 'react'
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
import './style.css'
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
import Layout from '../../studentLayout/Layout.jsx';
import { UserContext } from '../../../../context/user/User.jsx';
import AuthError from '../../../../component/Error/AuthError.jsx';
import { useRouter } from 'next/navigation'

export default function page() {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);
  const {userToken, setUserToken, userData}=useContext(UserContext);
  const [error, setError] = useState(null);
  const router = useRouter();
  if(!userToken){
    return router.push('/login')
  }
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

const [materialId, setMaterialId]=useState();
  
  const handleClose = () => {
    setOpen(false);
  };
    const [materials, setMaterials] = useState([]);
    const { courseId } = useParams();

    const getCourseMaterial = async () => {
      if(userToken){
        try{
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_EDUCODING_API}MaterialControllar/GetAllMaterial?CourseId=${courseId}`,
          {headers :{Authorization:`Bearer ${userToken}`}}

          
        );
        setMaterials(data.result);
      }catch(error){
        console.log(error);
      }
      }
      };
      const [courseName, setCourseName]=useState();
      const getCourses = async () => {
        if(userToken){
          const data = await axios.get(
            `${process.env.NEXT_PUBLIC_EDUCODING_API}CourseContraller/GetCourseById?id=${courseId}`,
            {},
            {headers :{Authorization:`Bearer ${userToken}`}}
    
          );
        
          setCourseName(data.data.result.name);
        }
      };
     
      const [participants, setParticipants]= useState();
      const getParticipants = async () => {
        if(userToken){

          const data = await axios.get(
            `${process.env.NEXT_PUBLIC_EDUCODING_API}StudentsContraller/GetCourseParticipants?Courseid=${courseId}`,
            {headers :{Authorization:`Bearer ${userToken}`}}
  
          );
        console.log(data);
          setParticipants(data.data.result.items);
        }
      };
      useEffect(() => {
        getCourseMaterial();
        getCourses();
        getParticipants();
      }, [userToken]);
  return (
    <Layout title={courseName}>
    <div>
  <ul className="nav nav-tabs pt-3" id="myTab" role="tablist">
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
   {materials.map((material)=>( 

   <Box
      height={70}
      width={1000}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '1px solid grey' ,borderRadius: 3, mt:2}}
      className={`${material.type} singleMaterial` }
    >
      {material.type=='Task'&&<AssignmentIcon sx={{fontSize:50, }} className='itemMaterial'/>}
      {material.type=='File'&&<InsertDriveFileIcon sx={{fontSize:50, }} className='itemMaterial'/>}
      {material.type=='Link'&&<LinkIcon  sx={{fontSize:50, }} className='itemMaterial'/>}
      {material.type=='Announcement'&&<MessageIcon sx={{fontSize:50, }} className='itemMaterial'/>}
      <Link href={`${courseId}/${material.id}`} underline="none">
     <Typography variant='h6' className='itemMaterial'> {material.name}</Typography>
     </Link>

    </Box>


        ))}



    </div>
    <div className="tab-pane fade" id="Participants-tab-pane" role="tabpanel" aria-labelledby="Participants-tab" tabIndex={0}>
    <div className='mt-5 ms-5'>
    {participants?.map((participant, index)=>( 
    <Box
      height={50}
      width={1000}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '1px solid grey' ,borderRadius: 3, justifyContent: 'space-between' }}
      className={`${index%2==0?"bg-purple1":'bg-purple2'}my-2 py-1 singeParticipant `}
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
