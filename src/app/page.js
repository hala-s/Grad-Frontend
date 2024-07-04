'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Header from "../component/header/Header.jsx";
import Navbar from "../component/navbar/Navbar.jsx";
import AllCourses from "./(pages)/AllCourses/AllCourses";
import Footer from "@/component/footer/Footer";
import Testimonials from "./(pages)/Testimonials/page";
import Layout from "./(pages)/Layout/Layout";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/user/User";
import GeneralFeedback from "./(pages)/GeneralFeedback/GeneralFeedback";
import CoursesSection from "./(pages)/AllCourses/CoursesSection/CoursesSection";

export default function Home() {
  const {userToken, setUserToken,userData, setUserData}=useContext(UserContext);
  const [role,setRole] = useState();
  useEffect(()=>{
    if(localStorage.getItem('userToken')!=null){
      setUserToken(localStorage.getItem('userToken'));
    }
    if(userData){
      setRole(userData.role)
    }
  },[role,userData]);
  //  console.log(role)
  
 
  return (
    
      <Layout>
      <Header role={role} />
      <Testimonials/>
      <CoursesSection/>
      <GeneralFeedback/>
      </Layout>   
  );
}
