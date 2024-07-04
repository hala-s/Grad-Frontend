import React, { useContext, useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import'./GeneralFeedback.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { UserContext } from '@/context/user/User';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import AddGeneralFeedback from './AddGeneralFeedback';
import axios from 'axios';
export default function GeneralFeedback() {
    const {userToken, setUserToken, userData,userId}=useContext(UserContext);
    const [role,setRole] = useState();
    useEffect(() => {
        if (userData){
          setRole(userData.role);
        }
      }, [userData]);

      const [open, setOpen] = React.useState(false);

      const theme = useTheme();
          const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
            setOpen(true);
          };
          const handleClose = () => {
            setOpen(false);
          };

         
      const [feedbacks, setFeedbacks] = useState([]);
 const fetchFeedbacks = async ()  => {
        try{
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Feedback/GetAllGeneralFeedback?pageNumber=1&pageSize=12`);
        
        setFeedbacks(data.result.items);

      }
        catch(error){
         console.log(error);
        }
      };
useEffect(() => {
  fetchFeedbacks();
      }, [feedbacks,userData]);



  return (
    <div className="generalFeedback py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 justify-content-center">
            {/* <div className="feedbackImg py-4">
              <img src="/layer.png" alt="img" className="img-fluid pt-5" />
            </div> */}
<iframe className='animation' src="https://lottie.host/embed/20ddc489-8898-4456-ab3b-c9d58e746cfc/sFr46ok18G.json" />

          </div>
          <div className="col-lg-6 col-md-12">
            <div className="feedback-content py-4">
              <div className="title d-flex justify-content-between align-items-center">
                <h3 className="feedbackTitle text-center">
                  Our Students Are Our Strength.
                  <br /> See What They Say About Us!
                </h3>
                {userData && role == "student" && (
                  <div className="addFeedback">
                    <Tooltip title="Add Feedback" placement="top">
                    <Button  onClick={handleClickOpen}>
                      <AddCommentIcon className="addFeedIcon" />
                    </Button>
                    </Tooltip>
                  </div>
                )}
                <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                  sx={{
                    "& .MuiDialog-container": {
                      "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "700px!important",
                        height: "400px!important",
                      },
                    },
                  }}
                >
                  <DialogTitle
                    id="responsive-dialog-title"
                    className="primaryColor fw-bold"
                  >
                    {"Add Feedback"}
                  </DialogTitle>

                  <DialogContent>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ justifyContent: "center", alignContent: "center" }}
                    >
                      <AddGeneralFeedback setOpen={setOpen} />
                    </Stack>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                      Cancle
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>

              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1.03}
                autoplay={2000}
                breakpoints={
                  {
                    // when window width is >= 640px
                    //   1100: {
                    //     width: 1100,
                    //     slidesPerView: 3.5,
                    //     spaceBetween: 50,
                    //   },
                    //   // when window width is >= 768px
                    //   1000: {
                    //     width: 1100,
                    //     slidesPerView: 3.5,
                    //     spaceBetween: 40,
                    //   },
                    //   900: {
                    //     width: 900,
                    //     slidesPerView: 3,
                    //     spaceBetween: 40,
                    //   },
                    //   800: {
                    //     width: 800,
                    //     slidesPerView: 2.7,
                    //     spaceBetween: 40,
                    //   },
                    //   700: {
                    //     width: 700,
                    //     slidesPerView: 2,
                    //     spaceBetween: 40,
                    //   },
                    //   600: {
                    //     width: 600,
                    //     slidesPerView: 2,
                    //     spaceBetween: 40,
                    //   },
                    //   500: {
                    //     width: 500,
                    //     slidesPerView: 1.5,
                    //     spaceBetween: 40,
                    //   },
                    //   400: {
                    //     width: 400,
                    //     slidesPerView: 1.3,
                    //     spaceBetween: 40,
                    //   },
                    //   300: {
                    //     width: 300,
                    //     slidesPerView: 1.1,
                    //     spaceBetween: 40,
                    //   },
                    //   200: {
                    //     width: 200,
                    //     slidesPerView: 1,
                    //     spaceBetween: 40,
                    //   },
                    //   100: {
                    //     width: 100,
                    //     slidesPerView: 1,
                    //     spaceBetween: 40,
                    //   },
                  }
                }
                //  navigation
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
                loop={true}
                className="row justify-content-center align-items-center"
              >
                {feedbacks.length?feedbacks.map((feedback,index)=>
<SwiperSlide key={++index} className="py-3">
                  <div className="singleFeedbackContent">
                    <div className="feedbackPara">
                      <p className="contentfeed">
                        {feedback.content}
                      </p>
                    </div>
                    <div className="userInfo d-flex align-items-center">
                    <img src={feedback.imageUrl ? feedback.imageUrl : "./user1.png"} 
           className=" img-fluid" 
           alt="Profile" 
           onError={(e) => { 
             console.error("Error loading image:", feedback.imageUrl); 
             e.target.onerror = null; // prevents looping
             e.target.src = "./user1.png"; // default image if error
           }} />      
                      <p className="pt-3 ps-2 writerName">{feedback.name}</p>
                      <ul className="d-flex gap-1 align-items-center pt-3">
                        <li className="list-unstyled">
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "#FFD43B" }}
                          />
                        </li>
                        <li className="list-unstyled">({feedback.range})</li>
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>
                ):<>No Feedbacks</>}
                
               
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
