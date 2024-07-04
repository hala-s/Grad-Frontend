'use client';
import React, { useContext, useEffect, useState } from 'react'
import ViewTask from '../../../components/View/ViewTask.jsx'
import ViewAnnouncement from '../../../components/View/ViewAnnouncement.jsx'
import ViewFile from '../../../components/View/ViewFile.jsx'
import ViewLink from '../../../components/View/ViewLink.jsx'
import { useParams } from 'next/navigation.js';
import Layout from '../../../instructorLayout/Layout.jsx';
import axios from 'axios';
import { UserContext } from '../../../../../context/user/User.jsx';
import '../style.css'
import dynamic from 'next/dynamic';
import AuthError from '../../../../../component/Error/AuthError.jsx';
import { useRouter } from 'next/navigation'

export default function page() {
  const {userToken, setUserToken, userData}=useContext(UserContext);
  const[error,setError]=useState();
  if(!userToken){
    return router.push('/login')
  }

    const[type,setType]=useState();
    const[name,setName]=useState();
const{materialId, courseId}=useParams();
    const getMaterial=async()=>{
      if(userToken){
        try{
        const {data}= await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}MaterialControllar/GetMaterialById?id=${materialId}`,
        {headers :{Authorization:`Bearer ${userToken}`}}

        )
      
        setType(data.result.type);
        setName(data.result.name);

        }catch(error){
          console.log(error);
          setError(error.response.status);
        }
    }
    }
    if (error) {
      if (error=='403'||error=='404') {
        return(<AuthError/>)
    }else if(error=='401'){
      return router.push('/login')
    }
    }
    useEffect(() => {
        getMaterial();
      }, [userData,type]);
    
  return (
   
    <Layout title={name}>
       {type=='Task'&& <ViewTask  materialID={materialId} type='courseId' Id={courseId}/>} 
       {type=='Announcement'&& <ViewAnnouncement  materialID={materialId} type='courseId' Id={courseId}/>}
       {type=='File'&& <ViewFile  materialID={materialId}  type='courseId' Id={courseId}/>}
       {type=='Link'&& <ViewLink materialID={materialId}  type='courseId' Id={courseId}/>}

    </Layout>
  )
}