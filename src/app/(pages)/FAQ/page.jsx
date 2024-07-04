'use client'
import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import './FAQ.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCode, faEnvelope, faHourglassHalf, faLayerGroup, faPersonChalkboard, faStopwatch, faUser, faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import { faCss3, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
export default function Page() {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  // Set the initial state value to "0" to open the first tab by default
  const [value, setValue] = useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <div className='container'>
      <div className="pageTitle text-center py-4">
        <h2 className='FAQTitle'>FAQ's</h2>
        <div className="shape1">
          <FontAwesomeIcon icon={faCode} style={{color: "#4c5372",}} className='shape1a fs-3'/>
          {/* <img src="/tag.png" alt="tag" /> */}
        </div>
        {/* <div className="shape2">
          <DeveloperModeIcon className='shape1a fs-3'/>
        </div>
         */}
      </div>

        <Box sx={{ width: '100%', typography: 'body1', mt: 5 }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                <Tab icon={<PlayCircleFilledWhiteIcon />} label="Getting Started" value="0" />
                <Tab icon={<SchoolIcon />} label="Education" value="1" />
                <Tab icon={<CalendarMonthIcon />} label="Lectures" value="2" />
              </TabList>
            </Box>
            <TabPanel value="0">
              <div className='Accordion-body'>
                <Accordion
                  expanded={expanded}
                  onChange={handleExpansion}
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 400 }}
                  sx={{
                    '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                    '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>What is the Programming Academy?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#606060' }}>
                    The Programming Academy is an online platform offering a variety of programming courses and events designed to help individuals of all skill levels learn and master coding. Our mission is to make high-quality coding education accessible to everyone.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>How can I contact the Code Academy?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#606060' }}>
                    If you have any further questions or need further assistance, please contact us via email at support@programmingacademy.com or through the contact form “Contact Us” on our website. We are here to help!
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>Who are the courses designed for?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#606060' }}>
                    Our courses and events are designed for anyone interested in learning programming, whether you're a beginner with no prior experience, a professional looking to expand your skills, or someone looking to switch careers into tech.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>Am I eligible for admission?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#606060' }}>
                    Every school and program has different admission requirements for accepting students. These requirements can often be found on the program profiles. If you’d like more information or if the information is missing, contac us.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                
              </div>
            </TabPanel>
            <TabPanel value="1">
            <div className='Accordion-body'>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>What programming languages and topics do you offer courses in?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#606060' }}>
                    We offer courses in several popular programming languages, including Python, JavaScript, Java, C++, and more. We also provide specialized courses in web development, data science, machine learning, and other fields. Additionally, we host events such as coding bootcamps, hackathons, and webinars.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>How are the courses organized?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#606060' }}>
                    Each course is designed to include video lectures, reading materials, programming exercises, and quizzes. Some courses also feature projects that allow you to apply what you've learned in real-world scenarios. Teachers can upload all materials, lectures and assignments via our Learning Management System (LMS).
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>Can I access the course materials after I finish the course?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#606060' }}>
                    Yes, once you enroll in the course, you will have lifetime access to the course materials, including any future updates or additions.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>Are the courses self-paced?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#606060' }}>
                    No, our courses are not self-paced. All lectures are synchronized, meaning they occur at scheduled times where students can participate in real-time, ask questions, and engage with the instructor and peers.                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>What is the Learning Management System (LMS)?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#606060' }}>
                    Our LMS is an integrated platform that enables course instructors to upload materials, lectures, and tasks for students. Students can access all course content, submit assignments, and track their progress through the LMS.</Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>Can I request a custom course?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#606060' }}>
                    Yes, we offer a feature that allows students to submit requests for custom courses tailored to their specific needs and interests. You can submit your application through our personalized course request form (find it in the All Courses section) and we will work with you to create a personalized learning plan for you.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </TabPanel>
            <TabPanel value="2">
            <div className='Accordion-body'>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>How does the booking system work?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#606060' }}>
                    Our booking system allows students to schedule private or public sessions with instructors. Simply log into your account, choose the lecture topic, select the time slot you want, and the available instructor list will be determined automatically. You must then write a detailed description for the lecture and book the session.                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>What information do I need to provide when booking a session?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#606060' }}>
                    When booking a session, you need to choose the lecture topic, select your preferred time slot, and provide a detailed description of what you want to cover in the lecture. This helps the instructor prepare and tailor the session to your needs.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>Can I choose any instructor for my session?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#606060' }}>
                    Available instructors for the time period and topic you have chosen will be automatically selected by the system. You can choose from a list of instructors available for your session or you can view a instructor's weekly hours in your instructor profile and then select a time based on it.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>Can I book both private and public sessions?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#606060' }}>
                    Yes, our booking system allows you to book both private one-on-one sessions and public group sessions with instructors, depending on your preference and availability.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>Where can I find the details and materials for my booked lectures?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#606060' }}>
                    After booking a lecture, it will be created and appear in the "My Lectures" section of your account. By clicking on the lecture name, you can view the materials uploaded by the instructor and the lecture details. This ensures you have everything you need to prepare for your session.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
               
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </Layout>
  );
}
