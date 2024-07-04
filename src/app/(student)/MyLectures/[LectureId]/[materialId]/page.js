'use client';
import React, { useContext, useEffect, useState } from 'react'
import ViewTask from '../../../components/View/ViewTask.jsx'
import ViewAnnouncement from '../../../components/View/ViewAnnouncement.jsx'
import ViewFile from '../../../components/View/ViewFile.jsx'
import ViewLink from '../../../components/View/ViewLink.jsx'
import { useParams } from 'next/navigation.js';
import Layout from '../../../studentLayout/Layout.jsx';
import axios from 'axios';
import { UserContext } from '../../../../../context/user/User.jsx';

export default function page() {
  const {userToken, setUserToken, userData}=useContext(UserContext);

    const[type,setType]=useState();
    const[name,setName]=useState();
const{materialId, LectureId}=useParams();
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
        }
    }
    }
    useEffect(() => {
        getMaterial();
      }, [userToken,type]);
    
  return (
   
    <Layout title={name}>
        {type=='Task'&& <ViewTask  materialID={materialId} type='consultationId' Id={LectureId}/>} 
       {type=='Announcement'&& <ViewAnnouncement  materialID={materialId} type='consultationId' Id={LectureId}/>}
       {type=='File'&& <ViewFile  materialID={materialId}  type='consultationId' Id={LectureId}/>}
       {type=='Link'&& <ViewLink materialID={materialId}  type='consultationId' Id={LectureId}/>}


    </Layout>
  )
}
