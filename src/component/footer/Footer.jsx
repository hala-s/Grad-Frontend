'use client'
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGithub, faGooglePlusG, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faHeadphones, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import AdbIcon from '@mui/icons-material/Adb';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { deepPurple ,purple} from '@mui/material/colors';
import './footer.css'
export default function Footer() {
  return (
    
<div className="footer">
  <div className="container">
    <div className="footer-top">
      <div className="row">
        <div className="col-xl-4 col-lg-12 col-md-12 ">
          <div className="footer-widget text-center">
            <div className="footer-logo">
            <AdbIcon className='academyIcon'/>
            </div>
            <p>
            Unlock your tech potential with personalized courses and one-on-one sessions at our academy. Whether you're just starting or an expert, our passionate instructors tailor learning to your needs. Join our community of lifelong learners and elevate your tech journey!</p>
            <div className="footer-social">
              <span>Follow Us</span>
              <div className="footer-social-icon">
                <ul className="d-flex justify-content-center text-md-center text-sm-center">
                  <li className="list-unstyled"><FontAwesomeIcon icon={faFacebookF} className='iconFoter'/></li>
                  <li className="list-unstyled"><FontAwesomeIcon icon={faXTwitter} className='iconFoter'/></li>
                  <li className="list-unstyled"><FontAwesomeIcon icon={faGooglePlusG} className='iconFoter'/></li>
                  <li className="list-unstyled"><FontAwesomeIcon icon={faGithub} className='iconFoter'/></li>
                  <li className="list-unstyled"><FontAwesomeIcon icon={faInstagram} className='iconFoter'/></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-12 col-md-12">
          <div className="footer-widget">
            <div className="footer-heading">
              <h4 className='text-center'>Quick Links</h4>
            </div>
            <div className="footer-menu ">
              <ul className='text-center' >
                <li className="list-unstyled"><a href="#" className="text-decoration-none">Home</a></li>
                <li className="list-unstyled"><a href="/About" className="text-decoration-none">About Us</a></li>
                <li className="list-unstyled"><a href="/AllCourses" className="text-decoration-none">Courses</a></li>
                <li className="list-unstyled"><a href="/AllEvents" className="text-decoration-none">Events</a></li>
                <li className="list-unstyled"><a href="#" className="text-decoration-none">Feedback</a></li>
                <li className="list-unstyled"><a href="/ContactUs" className="text-decoration-none">Contact Us</a></li>


              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-xl-4 col-lg-12 col-md-12">
          <div className="footer-widget text-center">
            <div className="footer-heading">
              <h4>Contact Us</h4>
            </div>
            <div className="footer-contact-list text-center">
              <div className="single-footer-contact-info d-flex justify-content-center">
              <FontAwesomeIcon icon={faHeadphones} className='contactIconn'/>
                <span className="footer-contact-list-text">+970593925818</span>
              </div>
              <div className="single-footer-contact-info d-flex justify-content-center">
              <FontAwesomeIcon icon={faEnvelope} className='contactIconn'/>
                <span className="footer-contact-list-text">tala.ismail.kafa@gmail.com</span>
              </div>
              <div className="single-footer-contact-info d-flex justify-content-center">
              <FontAwesomeIcon icon={faLocationDot} className='contactIconn'/>
                <span className="footer-contact-list-text">Tulkarm, Palestine</span>
              </div>
            </div>
            <div className="opening-time mt-3">
              <span>Opening Hour</span>
              <span className="opening-date">
                Sun - Sat : 10:00 am - 05:00 pm
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="footer-copyright text-center">
              <span>Copyright © 2024. All rights reserved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
