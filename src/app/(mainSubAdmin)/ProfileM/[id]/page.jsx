'use client'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope, faPen, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Profile.css'
import '../../../(admin)/dashboard/dashboard.css'
import EditProfile from './EditProfile';
import '../../../../../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { UserContext } from '@/context/user/User';
import Layout from '../../MainSumAdminLayout/Layout';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import ChangePassword from '@/app/(auth)/ChangePassword/ChangePassword';


export default function page({params}) {
  const {userToken, setUserToken, userData,userId}=useContext(UserContext);

  let [user,setUser] = useState({})
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openChange, setOpenChange] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  let [errmsg,setErrmsg] = useState()

  const [userIdP, setUserIdP] = useState(null);

const handleClickOpenUpdate = (id) => {
    setUserIdP(id);
    setOpenUpdate(true);
};
const handleCloseUpdate = () => {
  setOpenUpdate(false);
};


const handleClickOpenChange = (id) => {
  setUserIdP(id);
  setOpenChange(true);
};
const handleCloseChange = () => {
setOpenChange(false);
};

  const getUser =async ()=>{
    if(userData){
    try {
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}UserAuth/GetProfileInfo?id=${params.id}`,
      {headers :{Authorization:`Bearer ${userToken}`}}
      );
      setUser(data.result);
      }
      catch (error) {
      console.log(error)
      }
    }
      
  }
  useEffect(()=>{
      getUser();
  },[user,userData])
  
  return (
    <Layout>


        <>
      <div className="container">
        <div className="row">
          <div className="col-xl-4 text-xl-center text-sm-start text-md-center text-start pt-4">
            <h1 className="pr">PROFILE</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 text-center justify-content-center">
            {userData && user.imageUrl ? (
              <img src={`${user.imageUrl}`} className="profile img-fluid" />
            ) : (
              <img src="/user.jpg" className="profile img-fluid" />
            )}
          </div>
          <div className="col-xl-8">
            <div className="row">
              <div className="col-xl-8 col-lg-12 pt-lg-3 pt-md-3 pt-sm-3 pt-3 d-flex gap-2 justify-content-sm-center justify-content-xl-start">
                <p className="text-uppercase fw-bold pt-2 ">
                  <span className="name">
                    {user.userName} {user.lName}
                  </span>
                </p>
                {userData && params.id == userId && (
                  <Tooltip title="Update profile" placement="top">
                    <button
                      className="border-0 bg-white"
                      type="button"
                      onClick={() => handleClickOpenUpdate(params.id)}
                    >
                      <FontAwesomeIcon icon={faPen} className="edit-pen" />
                    </button>
                  </Tooltip>
                )}

                <Dialog
                  fullScreen={fullScreen}
                  open={openUpdate}
                  onClose={handleCloseUpdate}
                  aria-labelledby="responsive-dialog-title"
                  sx={{
                    "& .MuiDialog-container": {
                      "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "600px!important",
                        height: "400px!important",
                      },
                    },
                  }}
                >
                  <DialogTitle
                    id="responsive-dialog-title"
                    className="primaryColor fw-bold"
                  >
                    {"Update Profile"}
                  </DialogTitle>

                  <DialogContent>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ justifyContent: "center", alignContent: "center" }}
                    >
                      {userData && (
                        <EditProfile
                          id={params.id}
                          FName={userData.userName}
                          LName={userData.lName}
                          gender={userData.gender}
                          phoneNumber={userData.phoneNumber}
                          DateOfBirth={userData.dateOfBirth}
                          address={userData.address}
                          image={userData.imageUrl}
                          openUpdate={openUpdate}
                          setOpenUpdate={setOpenUpdate}
                        />
                      )}
                    </Stack>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseUpdate} autoFocus>
                      Cancle
                    </Button>
                  </DialogActions>
                </Dialog>
                {userData && params.id == userId && (
                  <Tooltip title="Change password?" placement="top">
                    <button
                      className="border-0 bg-white"
                      type="button"
                      onClick={() => handleClickOpenChange(params.id)}
                    >
                      <FontAwesomeIcon icon={faUnlockKeyhole} className='edit-pen' />
                    </button>
                  </Tooltip>
                )}
                 <Dialog
                  fullScreen={fullScreen}
                  open={openChange}
                  onClose={handleCloseChange}
                  aria-labelledby="responsive-dialog-title"
                  className='z-3'
                  sx={{
                    "& .MuiDialog-container": {
                      "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "500px!important",
                        height: "400px!important",
                      },
                    },
                  }}
                >
                  <DialogTitle
                    id="responsive-dialog-title"
                    className="primaryColor fw-bold"
                  >
                    {"Cahnge Password"}
                  </DialogTitle>

                  <DialogContent>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ justifyContent: "center", alignContent: "center" }}
                    >
                      <ChangePassword userId={params.id} setOpenChange={setOpenChange}/>
                    </Stack>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseChange} autoFocus>
                      Cancle
                    </Button>
                  </DialogActions>
                </Dialog >

                
              </div>


              <div className="d-flex ps-xl-4 pt-3 gap-2 role justify-content-xl-start fs-5 fw-bold justify-content-lg-center justify-content-md-center justify-content-sm-start ">
                <FontAwesomeIcon icon={faUser} className="pt-1 " />
                <p className="text-uppercase">{user.role}</p>
              </div>
            </div>
            <div className="row ps-1 pt-3">
              <div className="col-xl-6 ">
                <div className="row info1 border-">
                  <div className="col-xl-10 ">
                    <div className="d-flex justify-content-xl-start justify-content-lg-center justify-content-md-center justify-content-sm-start ">
                      <p className="fw-bold labels ps-1">Gender:</p>
                      <p className=" info ps-3 ">{user.gender}</p>
                    </div>
                    <div className="d-flex justify-content-xl-start justify-content-lg-center justify-content-md-center justify-content-sm-start ">
                      <p className="fw-bold labels ps-1">Phone:</p>
                      <p className=" info  ps-3">{user.phoneNumber}</p>
                    </div>
                    <div className="d-flex justify-content-xl-start justify-content-lg-center justify-content-md-center justify-content-sm-start ">
                      <p className="fw-bold labels ps-1">Date of birth:</p>
                      <p className=" info ps-3 ">{user.dateOfBirth}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="row info2">
                  <div className="col-xl-10">
                    <div className="d-flex justify-content-xl-start justify-content-lg-center justify-content-md-center justify-content-sm-start ">
                      <p className="fw-bold labels">Email:</p>
                      <p className=" info ps-2">{user.email}</p>
                    </div>
                    <div className="d-flex justify-content-xl-start justify-content-lg-center justify-content-md-center justify-content-sm-start ">
                      <p className="fw-bold labels ">Address:</p>
                      <p className=" info  ps-2">{user.address}</p>
                    </div>
                  </div>

               
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
      
    </Layout>
  );
}
