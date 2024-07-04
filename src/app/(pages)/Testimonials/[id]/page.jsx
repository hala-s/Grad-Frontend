'use client'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope, faPen, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Profile.css'
import '../../../(admin)/dashboard/dashboard.css'
import { UserContext } from '@/context/user/User';
import '../../../../../node_modules/bootstrap/dist/js/bootstrap.bundle'
import Layout from '../../Layout/Layout'
import ViewWeeklyHours from './ViewWeeklyHours';
import Education from './Education.jsx';
import Feedback from './Feedback.jsx';
import About from './About.jsx';
import { Button, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import ReviewsIcon from '@mui/icons-material/Reviews';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function page({params}) {
  const {userToken, setUserToken, userData,userId}=useContext(UserContext);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let [user,setUser] = useState({})
  const [loading, setLoading] = useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [userIdP, setUserIdP] = useState(null);
  const [openChange, setOpenChange] = React.useState(false);

  const handleClickOpenChange = (id) => {
    setUserIdP(id);
    console.log(id)
    setOpenChange(true);
  };
  const handleCloseChange = () => {
  setOpenChange(false);
  };

const handleClickOpenUpdate = (id) => {
    setUserIdP(id);
    console.log(id)
    setOpenUpdate(true);
};
const handleCloseUpdate = () => {
  setOpenUpdate(false);
};
  // const {id} = useParams();
  // console.log(useParams());
// console.log(params)
  const getUser =async ()=>{
    try {
      //setLoading(false)
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Employee/GetEmployeeById?id=${params.id}`);
      console.log(data);
        setUser(data.result);
      //setLoading(false)
      }
      catch (error) {
      console.log(error)
      }
      
  }
  useEffect(()=>{
      getUser();
  },[user,userData])
  
  return (
    <Layout>
        <div className="container">
      <div className="row">
        <div className="col-xl-4 text-center">
          <h1 className='pr'>PROFILE</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4 text-center justify-content-center">
          {user.imageUrl ? <img src={`${user.imageUrl}`} className='profile img-fluid'/> :<img src='/user.jpg' className='profile img-fluid'/>}
          
        </div>
        <div className="col-xl-8">
          <div className="row">
            <div className="col-xl-8 col-lg-12 pt-lg-3 pt-md-3 pt-sm-3 pt-3 d-flex gap-2">
              <p className='text-uppercase fw-bold pt-2 '><span className='name'>{user.fName} {user.lName}</span></p>
           
         </div>


             <div className="d-flex ps-xl-4 pt-3 gap-2 role justify-content-xl-start fs-5 fw-bold justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center">
                <FontAwesomeIcon icon={faUser} className='pt-1'/>
                <p className='text-uppercase'>{user.type}</p>
              </div>
          </div>
          <div className="row ps-1 pt-3">
            <div className="col-xl-6 ps-4">
              <div className="row info1 border-">
                <div className="col-xl-10 ">
                  <div className="d-flex justify-content-xl-start justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center">
                    <p className='fw-bold labels'>Gender:</p>
                    <p className=' info ps-4'>{user.gender}</p>
                  </div>
                  <div className="d-flex justify-content-xl-start justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center"><p className='fw-bold labels'>Phone:</p><p className=' info ps-4'>{user.phoneNumber}</p></div>
                  <div className="d-flex justify-content-xl-start justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center">{userToken?(<Link href='/calender'>Book Now</Link>):(<Link href='/login'>Book Now</Link>)}</div>
                 
                </div>
                
              </div>

            </div>
            <div className="col-xl-6">
            <div className="row info2">
              <div className="col-xl-10">
              <div className="d-flex justify-content-xl-start justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center">
                    <p className='fw-bold labels'>Email:</p>
                    <p className=' info ps-2'>{user.email}</p>
                  </div>
                  <div className="d-flex justify-content-xl-start justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center">
                    <p className='fw-bold labels'>Address:</p>
                    <p className=' info ps-2'>{user.address}</p>
                  </div>
              </div>
                
                {/* <ul className='d-flex gap-4 '>
                  <li className=' social'><FontAwesomeIcon icon={faLinkedinIn} /></li>
                  <li className=' social'><FontAwesomeIcon icon={faGithub} /></li>
                  <li className=' social'><FontAwesomeIcon icon={faFacebookF} /></li>
                  <li className=' social'><FontAwesomeIcon icon={faEnvelope} /></li>
                </ul> */}
                <div className="d-flex justify-content-center gap-3 pt-3 border-top">
                        <Tooltip title="phone" placement="top">
                          <Link className='social' href={`tel:${user.phoneNumber}`}><FontAwesomeIcon icon={faPhone} /></Link></Tooltip>
                        <Tooltip title="Email" placement="top">
                          <Link className='social' href={`mailto:${user.email}`}><FontAwesomeIcon icon={faEnvelope} /></Link></Tooltip>
                        </div>
                
              </div>
            </div>
          </div>
          
        </div>
      </div>
    <Box sx={{ width: '100%', typography: 'body1', mt:5 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>

            <Tab icon={< PersonIcon/>} label="About" value="0"/>
      <Tab icon={<SchoolIcon />} label="Education" value="1" />
      <Tab icon={<AccessTimeIcon />} label="Availability" value="2"/>
      {/* <Tab icon={<ReviewsIcon />} label="ReviewS" value="3"/> */}

          </TabList>
        </Box>
        <TabPanel value="0" active><About id={params.id}/></TabPanel>
        <TabPanel value="1"><Education id={params.id}/></TabPanel>
        <TabPanel value="2"><ViewWeeklyHours id={params.id}/></TabPanel>
        {/* <TabPanel value="3"><Feedback id={params.id}/></TabPanel> */}

      </TabContext>
    </Box>
      
    </div>
    </Layout>
  )
}
