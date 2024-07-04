'use client';

import React, { useContext, useEffect, useState } from 'react';
import ViewTask from '../../../components/View/ViewTask';
import ViewAnnouncement from '../../../components/View/ViewAnnouncement';
import ViewFile from '../../../components/View/ViewFile';
import ViewLink from '../../../components/View/ViewLink';
import { useParams } from 'next/navigation';
import Layout from '../../../studentLayout/Layout';
import axios from 'axios';
import './style.css'
import AuthError from '../../../../../component/Error/AuthError.jsx';
import { useRouter } from 'next/navigation'

import { UserContext } from '../../../../../context/user/User';

export default function page() {
  const {userToken, setUserToken, userData}=useContext(UserContext);
    const[error,setError]=useState();
    const router = useRouter();
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

        console.log(data)
        }catch(error){
          console.log(error);
          setError(error.response.status);
         
        }
    }
  };

  useEffect(() => {
    getMaterial();
  }, [userToken]);

  const resetError = () => {
    setError(null);
    getMaterial();
  };

  if (error) {
    if (error=='403'||error=='404') {
      return(<AuthError/>)
  }else if(error=='401'){
    return router.push('/login')
  }
  }

  return (
    <Layout title={name}>
      {type === 'Task' && <ViewTask materialID={materialId} type="courseId" Id={courseId} />}
      {type === 'Announcement' && <ViewAnnouncement materialID={materialId} type="courseId" Id={courseId} />}
      {type === 'File' && <ViewFile materialID={materialId} type="courseId" Id={courseId} />}
      {type === 'Link' && <ViewLink materialID={materialId} type="courseId" Id={courseId} />}
    </Layout>
  );
}
