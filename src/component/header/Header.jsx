'use client'
import React, { useContext } from "react";
import { Link } from "@mui/material";
import './style.css'
import { UserContext } from "@/context/user/User";
export default function Header({role}) {
  const {userToken, setUserToken,userData, setUserData,setUserId,userId}=useContext(UserContext);

  return (
    <div className="container">
      <div className="header row justify-content-center">
      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 justify-content-center">
        {/* <img src="./header.png" className="img-fluid" alt="header photo" /> */}
        <iframe className="animation" src="https://lottie.host/embed/74769c41-e3e0-43f2-8e38-714833ef8eb5/D4noHhWEyO.json"></iframe>

</div>



      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex align-items-center align-items-center">
        <div className="text-center"> 
        <h1>Time to grow your creative level up with us</h1>
        {!userData ? 
        <>
        <Link className="btn btn-purple mt-3 px-3  mb-4" href='/login'  color="inherit"  underline='none'>Start Now!</Link>
        </>
        :
        ((role == "admin" && <Link className="btn btn-purple mt-3 px-3 py-2 mb-4" href='/dashboard'  color="inherit"  underline='none'>Start Now!</Link>)||
        (role == "subadmin" && <Link className="btn btn-purple mt-3 px-3 py-2 mb-4" href='/dashboardS'  color="inherit"  underline='none'>Start Now!</Link>)||
        (role == "main-subadmin" && <Link className="btn btn-purple mt-3 px-3 py-2 mb-4" 
        href='/dashboardM'  color="inherit"  underline='none'>Start Now!</Link>)||
        (role == "instructor" && <Link className="btn btn-purple mt-3 px-3 py-2 mb-4" 
        href='/dashboardI'  color="inherit"  underline='none'>Start Now!</Link>)||
        (role == "student" && <Link className="btn btn-purple mt-3 px-3 py-2 mb-4" 
        href='/MyDashboard'  color="inherit"  underline='none'>Start Now!</Link>)
      )
        }
      
        </div>
      
     
      </div>
      
    </div>
    </div>
    
  );
}
