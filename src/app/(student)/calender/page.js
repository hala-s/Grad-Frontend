'use client';
import React, { useRef, useEffect, useState, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dateClick
import timeGridPlugin from '@fullcalendar/timegrid';
import listWeek from '@fullcalendar/list';
import listPlugin from '@fullcalendar/list';
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import timeGridDay from '@fullcalendar/timegrid';
import Layout from '../studentLayout/Layout.jsx';
import './style.css';
import LectureDetails from './LectureDetails.jsx';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Input from '../../../component/input/Input.jsx';
import { UserContext } from '../../../context/user/User.jsx';
import TextArea from '../../../component/input/TextArea.jsx';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CalendarPage() {
  const { userToken, setUserToken, userData, userId } = useContext(UserContext);
  const [date, setDate] = useState(new Date());
  const [skillName, setSkillName] = useState();
  const [lecture, setLecture] = useState();
  const [lectureID, setLectureID] = useState();

  const [skill, setSkill] = useState();
  const [start, setStart] = useState('00:00');
  const [end, setEnd] = useState('01:00');
  const [status, setStatus] = useState('private');
  const [selectedInstructor, setSelectedInstructor] = useState();

  const [selectedSkillId, setSelectedSkillId] = useState();
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
function getCurrentDateFormatted(date) {
  const today = new Date(date);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}
  const initialValues = {
    description:"",
    startTime:"",
    endTime:""
  };
  const[instructors, setInstructors]=React.useState();
  

    const getInstructors = async () => {
        let currntDate=getCurrentDateFormatted(date);
        if(userToken&&skill){
// console.log(`skill ${skill} , start: ${start}, end: ${end}, currntDate ${currntDate}`)
    try {

//       const formData = new FormData();
// formData.append("skillId", skill);
// formData.append("startTime", start);
// formData.append("endTime", end);
// formData.append("date", currntDate);
// console.log( `${process.env.NEXT_PUBLIC_EDUCODING_API}Instructor/GetListOfInstructorForLectures?skillId=${skill}&startTime=${start}&endTime=${end}&date=${currntDate}`);
      const {data} = await axios.get(
        `${process.env.NEXT_PUBLIC_EDUCODING_API}Instructor/GetListOfInstructorForLectures?skillId=${skill}&startTime=${start}&endTime=${end}&date=${currntDate}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          }
        }
      );
      // console.log(data);
      setInstructors(data.result);
        // console.error('Error in response:', response.data);
      
    } catch (error) {
      console.log('Error fetching instructors:', error);
    }}}
  ;
  
  const[skills, setSkills]=React.useState();
  const getSkills = async () => {
    if(userToken){
    try{
      const data = await axios.get(
      
      `${process.env.NEXT_PUBLIC_EDUCODING_API}Skill/GetAllSkillOptions`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          }
        }

    );
    // console.log(data);
   setSkills(data.data.result.items);
    //setSkill(data.data.result.items[1].id);
  }catch(error){
    console.log(error);
  }
   } };
  function convertDateFormat(dateString) {
    // Split the date string into date and time parts
    const [datePart, timePart] = dateString.split(' ');
    // Split the date part into day, month, and year
    const [day, month, year] = datePart.split('/');
    // Split the time part into hours, minutes, and seconds
    const [hours, minutes, seconds] = timePart.split(':');
    // Construct the new date string in the desired format
    const newDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    return newDateString;
}
  const getLectures = async () => {
    try {
      if (userId) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_EDUCODING_API}Lectures/GetAllConsultations?studentId=${userId}`,

          {headers :{Authorization:`Bearer ${userToken}`}}

        );
          const parsedEvents = response.data.result.items.map(event => ({
            title: event.name,
            id:event.consultationId,
            start: convertDateFormat(`${event.date} ${event.startTime}`),
            end: convertDateFormat(`${event.date} ${event.endTime}`),
            // Additional event properties if needed
          }));
          setLecture(parsedEvents);
          //console.log(`yut${response.data.result[0].date} ${response.data.result[0].startTime}`)
        
      }
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };
 // console.log(lecture);

  const onSubmit = async (lectures) => {
    try{
    const [startHour, startMinute] = lectures.startTime.split(':').map(Number);
    const [endHour, endMinute] = lectures.endTime.split(':').map(Number);
   const selectedSkillName = skills.find(skill => skill.id == selectedSkillId);
    console.log(skill);

   console.log(selectedSkillName?.name);

     setSkillName(selectedSkillName?.name);
    
    console.log(selectedSkillName);
    let durationMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);

    if (durationMinutes < 0) {
        durationMinutes += 24 * 60; 
    }

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    const duration=`${formattedHours}:${formattedMinutes}`;
    const formData = new FormData();
    console.log(selectedSkillName?.name);
formData.append("name", selectedSkillName?.name);
formData.append("description", lectures.description);
formData.append("type", status);
formData.append("InstructorId", selectedInstructor);
formData.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});


const { data } = await axios.post(
  `${process.env.NEXT_PUBLIC_EDUCODING_API}Lectures/BookALecture?studentId=${userId}&date=${date}&startTime=${lectures.startTime}&endTime=${lectures.endTime}`,
  formData,
  {headers: {
    'Content-Type': 'application/problem+json; charset=utf-8',
    'Authorization':`Bearer ${userToken}`
  }}

);
  setAlertOpen(true);
  setOpen(false);
 formik.resetForm();
 setAlertOpen(true);


  }catch(error){
    console.log(error);
  }
  };
  const validationSchema = yup.object({

      description: yup.string(),

  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: validationSchema,
  });

  const inputs = [

    {
      id: "startTime",
      type: "time",
      name: "startTime",
      title: "startTime",
      value: formik.values.startTime,
    }
    ,
    {
      id: "endTime",
      type: "time",
      name: "endTime",
      title: "endTime",
      value: formik.values.endTime,
    }
    ,
    {
      id: "description",
      type: "text",
      name: "description",
      title: "Description",
      value: formik.values.description,
    }
  ];
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    formik.handleChange(event); // Formik's default handleChange
    if(name=='startTime'){
      setStart(value);
    }
    if(name=='endTime'){
      setEnd(value);
    }

  };
  const renderInputs = inputs.slice(0, -1).map((input, index) => (
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      value={input.value}
      title={input.title}
      onChange={handleInputChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
      errors={formik.errors}
      key={index}
    />
  ));
  const lastInput = inputs[inputs.length - 1];

const textAraeInput = (
  <TextArea
    type={lastInput.type}
    id={lastInput.id}
    name={lastInput.name}
    value={lastInput.value}
    title={lastInput.title}
    onChange={lastInput.onChange || formik.handleChange}
    onBlur={formik.handleBlur}
    touched={formik.touched}
    errors={formik.errors}
    key={inputs.length - 1}
  />
);

 

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [isChecked, setIsChecked] = React.useState(false);
  const longText = `
  When "Public" is activated, anyone can book the lecture with you.
  `;

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    if(event.target.checked==true){
      setStatus('public');
    
    }else{
      setStatus('private');
    }
  };
  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDateClick = (arg) => {

    let today=new Date();
    let date2 = new Date(arg.dateStr);

    if(today.getTime() < date2.getTime()){
      setOpen(true);
      setDate(arg.dateStr);

    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };
  const [selectedSkillName, setSelectedSkillName] = useState('');
  const handleChangeSkill = (event) => {
   // formik.handleChange(e); // Formik's handleChange to update the form state
   // setSelectedSkillId(e.target.value);
     setSkill(event.target.value);
     const selectedOption = event.target.options[event.target.selectedIndex];
     const selectedId = selectedOption.value;
     const selectedName = selectedOption.getAttribute('data-name');
 
     setSelectedSkillId(selectedId);
     setSelectedSkillName(selectedName);
    // console.log(e.target.value);
    // Find the selected skill object from the skills array
    //const selectedSkillName = skills.find(skill => skill.id == selectedSkillId);
    // console.log(selectedSkill);

   // console.log(selectedSkillName?.name);

     // setSkillName(selectedSkillName?.name);
    
    // console.log(skillName);
  };
  
  //const [calevents, setCalvents] =React.useState([]);

  const calendarRef = useRef(null);
  // const parsedEvents = lecture?.map(event => ({
  //   title: event.name,
  //   start: new Date(event.date + 'T' + event.startTime),
  //   end: new Date(event.date + 'T' + event.endTime),
  //   // Additional event properties if needed
  // }));
  //setCalvents(parsedEvents);

  //console.log("events"+parsedEvents);
  const handleCloseDetailskDialog = () => {
    setOpenDetails(false);
  };
  useEffect(() => {
    getInstructors();
    getLectures();
    getSkills();


    if (calendarRef.current) {
      calendarRef.current.getApi().setOption('dayMaxEventRows', 3);
    }
  }, [{status, date, selectedInstructor, lecture, skill, start, end, instructors, skillName, userToken}]);
  return (
    <Layout title='Book a Lecture'>
      <LectureDetails open={openDetails} onClose={handleCloseDetailskDialog} lectureID={lectureID} />
       <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Lecture Booked succssfully!
        </Alert>
      </Snackbar>
      <div className='calendar-container '>
      <FullCalendar
      height={'100vh'}
      schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
        plugins={[
          resourceTimelinePlugin,
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          listPlugin
        ]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,listWeek',
        }}

        initialView="dayGridMonth" 
        nowIndicator={true}
        //editable= {true}
        //events={{}}
        //eventContent={handleClickOpen}
        selectable={true}
        selectMirror={true}
        eventLimit= {true}
        ref={calendarRef}
        // eventDidMount ={(info)=>{
        // }}

        eventClick={function(info) {

          setLectureID(info.event.id);

          setOpenDetails(true);
       }}

        //views= {views}
        //initialDate={new Date()}
        // events={[{ title: 'nice event', start: new Date(), resourceId: 'a' }, { title: 'nice event', start: new Date(), resourceId: 'a' }, { title: 'nice event', start: new Date(), resourceId: 'a' }, { title: 'nice event', start: new Date(), resourceId: 'a' },  { title: 'event 1', start: '2024-04-30T12:30:00Z', resourceId: 'a' },
        // { title: 'event 2', start: '2024-04-02T12:30:00Z', resourceId: 'a' }]}
      events={lecture}
      initialEvents={lecture}
      // eventContent={renderEventContent} // custom render function

      // eventContent={renderEventContent}

      // eventRender={lecture}

        dateClick={handleDateClick} 
        timeZone="Asia/Hebron"
      />
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
              minHeight: "300px!important",            },
          },
          
        }}
        >
        <DialogTitle id="responsive-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
  <span className='mt-4 mb-2'>Lecture Information</span>
  <Tooltip title={longText} arrow placement="bottom-start">
      <div style={{ marginLeft: 'auto' }}>
        <FormControlLabel
          control={<Switch checked={isChecked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />}
          label="Public"
          labelPlacement="top"
        />
      </div>
    </Tooltip>
</DialogTitle>


        <DialogContent>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">  
        <div className="col-md-12 mb-3">
        <select
        label='Select topic'
        className="form-select p-3"
        aria-label="Default select example"
        name="selectedSkill"
        value={selectedSkillId}
        onChange={handleChangeSkill}
      >
        <option value="" disabled>
          Select topic
        </option>
        {skills?.length ? (
          skills.map((skill) => (
            <option key={skill.id} value={skill.id} data-name={skill.name}>
              {skill.name}
            </option>
          ))
        ) : (
          <option disabled>No data</option>
        )}
      </select>

    
      </div>      
        {renderInputs}
        <div className="col-md-12 mb-3">
       <select
        className="form-select p-3"
        aria-label="Default select example"
        value={selectedInstructor}
        onChange={(e) => {
          formik.handleChange(e);
          setSelectedInstructor(e.target.value);
          
        }}
      >
        <option value="" >
          Select instructor
        </option>
        {instructors&&instructors?.length ? (
          instructors?.map((instructor, index) => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.name}
            </option>
          ))
        ) : (
          <option disabled>No data</option>
        )}
      </select>
      </div>
      
        {textAraeInput}
        <div className="text-center mt-3">
        <Button sx={{px:2}} variant="contained"
              className="m-2 btn "
              type="submit"
              disabled={!formik.isValid}
            >
              Book
            </Button>
        </div>
      </form>
      
        </DialogContent>
        <DialogActions>
         
          <Button onClick={handleClose} autoFocus>
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
      </div>
     
    </Layout>
  )
}