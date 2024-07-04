'use client';
import Footer from '@/component/footer/Footer'
import Navbar from '@/component/navbar/Navbar'
import { UserContext } from '@/context/user/User';
import React, { useContext, useEffect, useState } from 'react'

export default function Layout({children}) {
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
  return (
    <div>
      <Navbar role = {role}/>
      <main className='pt-5 mt-5'>{children}</main>
      <Footer/>
    </div>
  )
}
